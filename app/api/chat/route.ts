import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are the friendly digital assistant for Claycity Medical Centre, a licensed KMPDC Level-2 outpatient clinic on First Street, Clay City Estate, Kasarani, Nairobi, Kenya.

Clinic facts you must use accurately:
- Phone: 0712 265746 (+254712265746)
- Email: nabiclaycitymedical@yahoo.com
- Address: First Street, Clay City Estate, Kasarani, Nairobi. P.O. Box 784–00618
- Hours: Open 24/7, Monday–Sunday, day and night
- Walk-ins are welcome 24/7
- Licensed Level-2 clinic (KMPDC)
- Class-B laboratory (KMLTTB) with same-visit results where possible
- In-house pharmacy
- KEPI-aligned childhood immunisation
- Services include: maternal & child health, general outpatient consultation, laboratory diagnostics, pharmacy, immunisation, family planning, HIV testing, screening (BP, sugar, BMI), minor procedures
- Serving the community since 2018
- M-Pesa is welcome
- Website: https://claycitymed.co.ke

Guidelines:
- Be warm, clear, and concise — like a helpful receptionist who knows the clinic well.
- Prefer short paragraphs and bullet lists when listing services or hours.
- You may use light markdown: **bold**, *italic*, bullet lists with "- ", and numbered lists. Avoid headings, tables, and code blocks.
- If asked to book an appointment, guide them to call 0712 265746 or use the Book a Visit form on the site (#contact).
- For medical emergencies, advise calling emergency services or going to the nearest hospital emergency department — this is an outpatient clinic, not an ER.
- Do not invent prices, doctor names, or services not listed above. If unsure, say so and offer the phone number 0712 265746.
- Answer in the same language the user writes in (English or Swahili are both fine).
- Never claim to diagnose or prescribe. You provide clinic information only.`;

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const FRIENDLY_UNAVAILABLE =
  "I'm having a quiet moment. Please try again shortly, or call us on 0712 265746.";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: FRIENDLY_UNAVAILABLE },
        { status: 503 },
      );
    }

    const body = await req.json();
    const messages = (body?.messages ?? []) as ChatMessage[];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: FRIENDLY_UNAVAILABLE },
        { status: 400 },
      );
    }

    const trimmed = messages.slice(-12).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content ?? "").slice(0, 4000),
    }));

    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const upstream = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature: 0.55,
          max_tokens: 700,
          stream: true,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
        }),
      },
    );

    if (!upstream.ok || !upstream.body) {
      const errText = await upstream.text().catch(() => "");
      console.error("Groq error", upstream.status, errText);
      return NextResponse.json(
        { error: FRIENDLY_UNAVAILABLE },
        { status: 502 },
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine || !trimmedLine.startsWith("data:")) continue;
              const data = trimmedLine.slice(5).trim();
              if (data === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ content: delta })}\n\n`,
                    ),
                  );
                }
              } catch {
                // ignore malformed chunks
              }
            }
          }
        } catch (err) {
          console.error("Stream error", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat route error", err);
    return NextResponse.json({ error: FRIENDLY_UNAVAILABLE }, { status: 500 });
  }
}
