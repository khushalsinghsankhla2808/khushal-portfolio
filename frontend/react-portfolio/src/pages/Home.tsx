import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import WhyHireMe from '../components/sections/WhyHireMe';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import LearningJourney from '../components/sections/LearningJourney';
import FutureRoadmap from '../components/sections/FutureRoadmap';
import Certifications from '../components/sections/Certifications';
import Resume from '../components/sections/Resume';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <WhyHireMe />
      <Skills />
      <Projects />
      <LearningJourney />
      <FutureRoadmap />
      <Certifications />
      <Resume />
      <FAQ />
      <Contact />
    </main>
  );
}
