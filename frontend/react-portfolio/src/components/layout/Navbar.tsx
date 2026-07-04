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
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.2 }}
    >
      <div 
        className={clsx(
          "transition-all duration-500 ease-in-out border border-white/10 glass-card rounded-full flex items-center justify-between",
          scrolled ? "w-full max-w-5xl px-4 py-2 bg-black/60 shadow-2xl shadow-primary/10" : "w-full max-w-7xl px-6 py-4 bg-transparent border-transparent shadow-none"
        )}
      >
        
        {/* Left Side: Branding */}
        <div className="flex items-center gap-3">
          <Link to="/" className="relative group flex items-center shrink-0">
            <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
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
            <Link to="/" className="font-bold text-[15px] md:text-lg leading-tight bg-linear-to-r from-white via-primary to-secondary bg-clip-text text-transparent hover:brightness-125 transition-all">
              Khushal Singh Sankhla
            </Link>
          </div>
        </div>
        
        {/* Middle: Navigation Links */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.map(link => (
            <a 
              key={link.id}
              href={link.href} 
              className={clsx(
                "text-sm font-medium transition-colors relative px-4 py-2 rounded-full group",
                activeSection === link.id 
                  ? "text-white" 
                  : "text-text-secondary hover:text-white"
              )}
            >
              <span className="relative z-10">{link.name}</span>
              {activeSection === link.id && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right Side: Socials & Resume */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3 pr-4 border-r border-white/10">
            <a href="https://github.com/khushalsinghsankhla2808" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-white hover:scale-110 transition-all">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/khushal-singh-sankhla" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary hover:scale-110 transition-all">
              <FaLinkedin size={18} />
            </a>
          </div>
          <a 
            href="/resume/khushal-singh-sankhla-resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full font-bold flex items-center gap-2 text-sm text-white bg-linear-to-r from-primary to-secondary hover:from-accent hover:to-primary shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all shrink-0 hover:scale-105"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden flex items-center shrink-0">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
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
            className="xl:hidden absolute top-[110%] left-4 right-4 bg-black/90 backdrop-blur-3xl border border-white/10 p-6 flex flex-col gap-4 rounded-3xl shadow-2xl"
          >
            {navLinks.map(link => (
              <a 
                key={link.id}
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className={clsx(
                  "text-lg font-bold tracking-wide py-2 border-b border-white/5",
                  activeSection === link.id ? "text-secondary" : "text-text-secondary hover:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-6">
                <a href="https://github.com/khushalsinghsankhla2808" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-white">
                  <FaGithub size={24} />
                </a>
                <a href="https://linkedin.com/in/khushal-singh-sankhla" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-primary">
                  <FaLinkedin size={24} />
                </a>
              </div>
              <a 
                href="/resume/khushal-singh-sankhla-resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-bold flex items-center gap-2 text-sm text-white bg-linear-to-r from-primary to-secondary shadow-[0_0_20px_rgba(168,85,247,0.4)]"
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
