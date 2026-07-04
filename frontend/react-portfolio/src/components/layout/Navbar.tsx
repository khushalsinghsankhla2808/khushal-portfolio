import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) setScrolled(isScrolled);

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }
      if (window.scrollY < 100) current = 'home';
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Skills', href: '/#skills', id: 'skills' },
    { name: 'Experience', href: '/#experience', id: 'experience' },
    { name: 'Projects', href: '/#projects', id: 'projects' },
    { name: 'Certificates', href: '/#certifications', id: 'certifications' },
    { name: 'Contact', href: '/#contact', id: 'contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b",
        scrolled 
          ? "bg-surface/80 backdrop-blur-xl border-borders py-4 shadow-xl shadow-black/40" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left Side: Branding */}
        <div className="flex items-center gap-3">
          <Link to="/" className="relative group flex items-center shrink-0">
            <img 
              src="/logo.png" 
              alt="Khushal Singh Sankhla Logo" 
              className={clsx(
                "relative w-auto object-contain transition-all duration-500",
                scrolled ? "h-8" : "h-12"
              )}
            />
          </Link>
          <div className={clsx("flex flex-col justify-center transition-all duration-500 overflow-hidden", scrolled ? "w-0 opacity-0 md:w-auto md:opacity-100 md:ml-2" : "w-auto opacity-100 ml-2")}>
            <Link to="/" className="font-bold text-[15px] md:text-lg leading-tight text-foreground hover:text-primary transition-all">
              Khushal Singh Sankhla
            </Link>
          </div>
        </div>
        
        {/* Middle: Navigation Links */}
        <ul className="hidden xl:flex items-center gap-2">
          {navLinks.map(link => (
            <li key={link.id} className="relative">
              <a 
                href={link.href} 
                data-cursor="hover"
                className={clsx(
                  "text-sm font-medium transition-colors relative px-4 py-2 group",
                  activeSection === link.id 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </a>
              {/* Animated Active Indicator */}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Right Side: Socials & Resume */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3 pr-4 border-r border-border">
            <a href="https://github.com/khushalsinghsankhla2808" target="_blank" rel="noreferrer" data-cursor="hover" className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/khushal-singh-sankhla" target="_blank" rel="noreferrer" data-cursor="hover" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
              <FaLinkedin size={18} />
            </a>
          </div>
          <a 
            href="/resume/khushal-singh-sankhla-resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="px-5 py-2 rounded-full font-bold flex items-center gap-2 text-sm text-white bg-linear-to-r from-[#8B5CF6] to-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300 shrink-0 hover:scale-[1.03]"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden flex items-center shrink-0">
          <button onClick={() => setIsOpen(!isOpen)} data-cursor="hover" className="text-white p-2 bg-white/5 rounded-full border border-borders hover:bg-white/10 transition-colors">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden absolute top-[110%] left-4 right-4 bg-cards/95 backdrop-blur-2xl border border-borders p-6 flex flex-col gap-4 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
          >
            {navLinks.map(link => (
              <a 
                key={link.id}
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                data-cursor="hover"
                className={clsx(
                  "text-lg font-bold tracking-wide py-2 border-b border-borders",
                  activeSection === link.id ? "text-secondary" : "text-text-secondary hover:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-6">
                <a href="https://github.com/khushalsinghsankhla2808" target="_blank" rel="noreferrer" data-cursor="hover" className="text-text-secondary hover:text-white">
                  <FaGithub size={24} />
                </a>
                <a href="https://linkedin.com/in/khushal-singh-sankhla" target="_blank" rel="noreferrer" data-cursor="hover" className="text-text-secondary hover:text-primary">
                  <FaLinkedin size={24} />
                </a>
              </div>
              <a 
                href="/resume/khushal-singh-sankhla-resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="px-6 py-3 rounded-full font-bold flex items-center gap-2 text-sm text-white bg-linear-to-r from-[#8B5CF6] to-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                <Download size={16} /> Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
