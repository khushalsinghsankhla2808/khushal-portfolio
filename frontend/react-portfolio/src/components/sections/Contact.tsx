import { useState, useEffect } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../../data/personalInfo';

export default function Contact() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const istTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setTime(`${istTime} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="py-32 px-4 max-w-6xl mx-auto relative z-10 border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-16 md:gap-20">
        
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <p className="text-primary font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Contact
          </p>
          <a 
            href={`mailto:${personalInfo.email}`} 
            className="group flex flex-col md:flex-row md:items-center gap-6 text-5xl md:text-7xl font-bold text-white hover:text-primary transition-colors w-fit"
          >
            Let's talk 
            <span className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:rotate-45 transition-all duration-300 shadow-sm group-hover:shadow-md w-fit">
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" />
            </span>
          </a>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center gap-8 md:pl-12 md:border-l border-white/5">
          {/* Timezone Clock */}
          <div className="glass-card p-6 md:p-8 rounded-[32px] border border-white/5 inline-flex flex-col w-fit relative overflow-hidden group">
            
            <span className="text-text-secondary text-xs mb-2 uppercase tracking-widest font-bold">Local Time</span>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
              <span className="text-2xl md:text-3xl font-mono text-white tracking-tight">{time}</span>
            </div>
            <span className="text-text-secondary/60 text-xs mt-3">Currently in Jodhpur, India</span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3">
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 glass-card rounded-full border border-white/5 hover:border-white/20 hover:bg-white/10 hover:text-white text-text-secondary transition-all">
              <FaLinkedin size={18} />
              <span className="text-sm font-bold">LinkedIn</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 glass-card rounded-full border border-white/5 hover:border-white/20 hover:bg-white/10 hover:text-white text-text-secondary transition-all">
              <FaGithub size={18} />
              <span className="text-sm font-bold">GitHub</span>
            </a>
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-5 py-3 glass-card rounded-full border border-white/5 hover:border-white/20 hover:bg-white/10 hover:text-white text-text-secondary transition-all">
              <Mail size={18} />
              <span className="text-sm font-bold">Email</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
