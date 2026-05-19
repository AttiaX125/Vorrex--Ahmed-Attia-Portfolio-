import AboutStrip from "@/Components/home/AboutStrip";
import GoldTicker from "@/Components/home/GoldTricker";
import Hero from "@/Components/home/Hero";
import ProjectSlider from "@/Components/home/projectSlider";

export default function Home() {
  return (
    <div>
      <Hero/>
      <GoldTicker/>
      <ProjectSlider/>
      <AboutStrip/>
    </div>
  );
}
