import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';

const About = lazy(() => import('../components/sections/About'));
const Experience = lazy(() => import('../components/sections/Experience'));
const WhyHireMe = lazy(() => import('../components/sections/WhyHireMe'));
const Skills = lazy(() => import('../components/sections/Skills'));
const Projects = lazy(() => import('../components/sections/Projects'));
const Certifications = lazy(() => import('../components/sections/Certifications'));
const Resume = lazy(() => import('../components/sections/Resume'));
const FAQ = lazy(() => import('../components/sections/FAQ'));
const Contact = lazy(() => import('../components/sections/Contact'));

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <Hero />
      <Suspense fallback={<div className="py-10 text-center text-text-secondary/50 font-mono text-xs">Loading...</div>}>
        <About />
        <Experience />
        <WhyHireMe />
        <Skills />
        <Projects />
        <Certifications />
        <Resume />
        <FAQ />
        <Contact />
      </Suspense>
    </motion.main>
  );
}
