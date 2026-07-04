import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import gsap from 'gsap';
import MagneticButton from '../ui/MagneticButton';
import { personalInfo } from '../../data/personalInfo';

const ROLES = [
  "Data Analyst",
  "Business Intelligence Developer",
  "SQL Developer",
  "Power BI Developer",
  "Python Developer",
  "MERN Stack Developer"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-text', 
        { y: 100, opacity: 0, rotateX: -80 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 1.0 }
      );
      
      gsap.fromTo('.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.5 }
      );

      gsap.fromTo('.hero-buttons',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.8 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden px-4 md:px-8" ref={containerRef}>
      
      <div className="max-w-7xl mx-auto w-full z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left: Typography & CTAs */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left pt-10 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 glass-card text-xs font-medium uppercase tracking-widest text-text-secondary"
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Available for new opportunities
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[5rem] leading-[1.1] font-bold mb-6 tracking-tighter perspective-[1000px]">
            <div className="overflow-hidden pb-2"><div className="reveal-text transform-gpu">Hi, I'm</div></div>
            <div className="overflow-hidden pb-2">
              <div className="reveal-text transform-gpu text-primary pb-2">
                Khushal Singh
              </div>
            </div>
            <div className="overflow-hidden pb-4"><div className="reveal-text transform-gpu">Sankhla.</div></div>
          </h1>

          <div className="hero-subtitle mb-4 h-12 flex flex-col justify-start">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl font-medium text-white"
            >
              {ROLES[roleIndex]}
            </motion.div>
          </div>
          
          <div className="hero-subtitle text-sm md:text-base text-text-secondary mb-10 max-w-xl font-light leading-relaxed italic">
            "{personalInfo.motto}"
          </div>
          
          <div className="hero-buttons flex flex-col sm:flex-row items-center gap-6 mb-12">
            <MagneticButton>
              <a 
                href="/khushal-singh-sankhla-resume.pdf" 
                download="khushal-singh-sankhla-resume.pdf"
                className="group relative px-8 py-4 rounded-full font-bold text-base text-white overflow-hidden flex items-center gap-3 transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-primary" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Download Resume</span>
                <Download size={18} className="relative z-10 group-hover:translate-y-1 transition-transform" />
              </a>
            </MagneticButton>

            <div className="flex items-center gap-4">
              <MagneticButton>
                <a href="#about" className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 transition-colors border border-white/10 group">
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform text-secondary" />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-text-secondary hover:text-white transition-colors border border-white/10">
                  <FaGithub size={22} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-text-secondary hover:text-primary transition-colors border border-white/10">
                  <FaLinkedin size={22} />
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Right: Circular Image & Floating Rings */}
        <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto mt-12 lg:mt-0">
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
          >
            {/* Image Container */}
            <div className="absolute inset-4 rounded-full p-1 border border-white/10 overflow-hidden shadow-2xl group">
              <div className="w-full h-full rounded-full overflow-hidden bg-black relative flex items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                <img 
                  src="/Profile.png" 
                  alt="Khushal Singh Sankhla" 
                  className="w-full h-full object-cover object-top relative z-0 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Pinned Stats */}
            <motion.div 
              initial={{ opacity: 0, y: -20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ delay: 2.0, duration: 0.6, ease: "easeOut" }}
              className="absolute top-4 right-0 z-20 glass-card rounded-2xl p-4 shadow-xl"
            >
              <div className="text-2xl font-bold text-white leading-none mb-1">13+</div>
              <div className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">Projects Completed</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 5 }}
              transition={{ delay: 2.2, duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-4 left-0 z-20 glass-card rounded-2xl p-4 shadow-xl"
            >
              <div className="text-2xl font-bold text-white leading-none mb-1">20+</div>
              <div className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">GitHub Repos</div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
