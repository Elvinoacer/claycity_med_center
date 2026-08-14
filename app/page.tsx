import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickInfo from "./components/QuickInfo";
import Accreditations from "./components/Accreditations";
import Services from "./components/Services";
import About from "./components/About";
import PatientJourney from "./components/PatientJourney";
import WhyChooseUs from "./components/WhyChooseUs";
import Location from "./components/Location";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <QuickInfo />
        <Accreditations />
        <Services />
        <About />
        <PatientJourney />
        <WhyChooseUs />
        <Location />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
