import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../../data/personalInfo';

const ROLES = [
  "Data Analyst",
  "Business Intelligence Developer",
  "SQL Developer",
  "Power BI Developer",
  "Python Developer",
  "MERN Stack Developer"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 1.4 } // Delay to allow loading screen to fade out
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 md:pt-40 overflow-hidden px-4 md:px-8">
      
      <div className="max-w-7xl mx-auto w-full z-10 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left: Typography & CTAs */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left pt-10 lg:pt-0"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 glass-card text-xs font-medium uppercase tracking-widest text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Available for new opportunities
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[80px] leading-[1.05] font-bold mb-6 tracking-tighter text-white">
            Hi, I'm <br className="hidden md:block" />
            <span className="text-primary">Khushal Singh</span> <br className="hidden md:block" />
            Sankhla.
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-4 h-12 flex flex-col justify-start overflow-hidden">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-medium text-white"
            >
              {ROLES[roleIndex]}
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-[15px] md:text-[18px] text-text-secondary mb-12 max-w-xl font-light leading-relaxed">
            {personalInfo.motto}
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 mb-12">
            <a 
              href="/resume/khushal-singh-sankhla-resume.pdf" 
              download="khushal-singh-sankhla-resume.pdf"
              className="group relative px-8 py-4 rounded-full font-bold text-base text-white bg-primary hover:bg-[#2563EB] shadow-md hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] flex items-center gap-3 transition-all duration-250 hover:scale-[1.03]"
            >
              <span className="relative z-10">Download Resume</span>
              <Download size={18} className="relative z-10 group-hover:translate-y-1 transition-transform" />
            </a>

            <div className="flex items-center gap-4">
              <a href="#about" className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-250 border border-white/10 group hover:scale-[1.03]">
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform text-primary" />
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-text-secondary hover:text-white transition-colors duration-250 border border-white/10 hover:scale-[1.03]">
                <FaGithub size={22} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-250 border border-white/10 hover:scale-[1.03]">
                <FaLinkedin size={22} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Circular Image & Floating Rings */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
          className="relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto mt-12 lg:mt-0"
        >
          {/* Image Container */}
          <div className="absolute inset-4 rounded-full p-1 border border-white/10 overflow-hidden shadow-2xl group">
            <div className="w-full h-full rounded-full overflow-hidden bg-black relative flex items-center justify-center">
              <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent z-10" />
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
            transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
            className="absolute top-4 right-0 z-20 glass-card rounded-2xl p-4 shadow-xl border border-white/10 bg-cards"
          >
            <div className="text-2xl font-bold text-white leading-none mb-1">13+</div>
            <div className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">Projects Completed</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ delay: 2.6, duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-4 left-0 z-20 glass-card rounded-2xl p-4 shadow-xl border border-white/10 bg-cards"
          >
            <div className="text-2xl font-bold text-white leading-none mb-1">20+</div>
            <div className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">GitHub Repos</div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
