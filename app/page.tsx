import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import Testimonials from "./components/test";
import FAQ from "./components/FAQ";
import HeroCTA from "./components/HeroCTA";
import Countdown from "./components/Countdown";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <FeatureSection/>
      <Testimonials/>
      <FAQ/>
      <HeroCTA/>
      <Countdown/>

      {/* Ab tumhe jo bhi content dalna hai, u can add here, when deployed it will be visible on homepage */}
      {/* agar koi specific route create karna hua, u can create */}


      <Footer/>
    </div>
  );
}
