import {
  Phone, Mail, MapPin, Clock, Heart, ArrowUp, Facebook, Instagram,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "The story", href: "#story" }, { label: "Care", href: "#care" },
  { label: "The clinic", href: "#clinic" }, { label: "Visit us", href: "#visit" },
  { label: "Book a visit", href: "#contact" },
];
const SERVICE_LINKS = [
  { label: "Maternal & child health", href: "#care" }, { label: "Childhood immunisation", href: "#care" },
  { label: "In-house pharmacy", href: "#care" }, { label: "Laboratory services", href: "#care" },
  { label: "Outpatient consultation", href: "#care" }, { label: "HIV testing & counselling", href: "#care" },
];

export default function Footer() {
  return (
    <footer className="relative bg-brand-950 text-brand-100 overflow-hidden border-t border-brand-900">
      <div className="border-b border-white/10"><div className="container-page py-8 flex flex-col sm:flex-row items-center justify-between gap-4"><div className="text-center sm:text-left"><p className="font-display text-xl sm:text-2xl font-semibold text-white">Need care today? We&rsquo;re open 24/7.</p><p className="text-sm text-brand-300 mt-1">Walk in anytime — our clinical team is ready to assist day or night.</p></div><div className="flex flex-wrap items-center justify-center gap-3"><a href="tel:+254712265746" className="btn btn-accent shadow-md"><Phone className="h-4 w-4" />0712 265746</a><a href="#contact" className="btn btn-white shadow-md">Book a Visit</a></div></div></div>
      <div className="container-page py-12"><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        <div className="col-span-2 lg:col-span-2"><a href="#top" className="flex items-center gap-2.5" aria-label="Claycity Medical Centre home"><span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-md"><Heart className="h-5 w-5" /></span><span className="flex flex-col leading-tight"><span className="font-display text-[17px] font-semibold text-white">Claycity Medical</span><span className="text-[10px] uppercase tracking-[0.18em] text-brand-400 font-semibold">Kasarani · Level-2 Clinic</span></span></a><p className="mt-4 text-sm leading-relaxed text-brand-300 max-w-sm">A licensed Level-2 outpatient clinic on First Street, Clay City, Kasarani. Providing attentive healthcare for local families since 2018.</p><div className="mt-6 flex items-center gap-3"><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"><Facebook className="h-4 w-4 text-brand-100" /></a><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"><Instagram className="h-4 w-4 text-brand-100" /></a><a href="tel:+254712265746" aria-label="Call" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"><Phone className="h-4 w-4 text-brand-100" /></a></div></div>
        <div><h3 className="font-display text-sm font-semibold text-white uppercase tracking-wide">Explore</h3><ul className="mt-4 space-y-2.5">{QUICK_LINKS.map((l)=><li key={l.label}><a href={l.href} className="text-sm text-brand-300 hover:text-white transition-colors">{l.label}</a></li>)}</ul></div>
        <div><h3 className="font-display text-sm font-semibold text-white uppercase tracking-wide">Services</h3><ul className="mt-4 space-y-2.5">{SERVICE_LINKS.map((s)=><li key={s.label}><a href={s.href} className="text-sm text-brand-300 hover:text-white transition-colors">{s.label}</a></li>)}</ul></div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1"><h3 className="font-display text-sm font-semibold text-white uppercase tracking-wide">Visit Us</h3><ul className="mt-4 space-y-3.5 text-sm"><li className="flex gap-3"><MapPin className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" /><span className="text-brand-300">First Street, Clay City Estate,<br />Kasarani, Nairobi<br />P.O. Box 784–00618</span></li><li><a href="tel:+254712265746" className="flex gap-3 text-brand-300 hover:text-white transition-colors"><Phone className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />0712 265746</a></li><li><a href="mailto:nabiclaycitymedical@yahoo.com" className="flex gap-3 text-brand-300 hover:text-white transition-colors break-all"><Mail className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />nabiclaycitymedical@yahoo.com</a></li><li className="flex gap-3"><Clock className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" /><span className="text-brand-300">Open 24/7<br />Day &amp; night · every day</span></li></ul></div>
      </div></div>
      <div className="border-t border-white/10"><div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3"><p className="text-xs text-brand-400 text-center sm:text-left">© {new Date().getFullYear()} Claycity Medical Centre, Kasarani. All rights reserved.</p><p className="text-xs text-brand-400 inline-flex items-center gap-1.5">Made with <Heart className="h-3 w-3 text-accent-400 fill-current" /> for the Kasarani community</p><a href="#top" className="link-underline inline-flex items-center gap-1.5 text-xs font-semibold text-brand-200 hover:text-white">Back to top <ArrowUp className="h-3.5 w-3.5" /></a></div></div>
    </footer>
  );
}
