import { useState } from 'react';
import { certifications, type Certification } from '../../data/certs';
import { Award, ShieldCheck, Rocket, ExternalLink, X, Database, Activity, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function Certifications() {
  // We duplicate the list twice so it can loop seamlessly in a CSS marquee.
  const marqueeItems = [...certifications, ...certifications, ...certifications];

  const [hoveredCert, setHoveredCert] = useState<Certification | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('sql') || t.includes('data')) return Database;
    if (t.includes('power bi') || t.includes('analytics') || t.includes('fabric')) return Activity;
    if (t.includes('ai') || t.includes('machine learning') || t.includes('copilot') || t.includes('project') || t.includes('hackathon')) return Rocket;
    if (t.includes('secure') || t.includes('security')) return ShieldCheck;
    return Award;
  };

  return (
    <section id="certifications" className="py-32 relative z-10 border-t border-borders overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4">
        
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="font-caveat text-2xl text-primary transform -rotate-2 inline-block">Learning Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-white heading-glow">
            Certifications & <span className="text-primary">Continuous Learning</span>
          </h2>
          <p className="text-text-secondary text-lg font-light max-w-2xl mx-auto">
            Every certification represents another milestone in my journey of continuous learning. I believe the best way to grow is by combining structured learning with hands-on projects and solving real-world problems.
          </p>
        </div>

        {/* Statistics Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 my-16 border-y border-borders py-8 bg-white/0.02">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 heading-glow">5+</div>
            <div className="text-sm uppercase tracking-widest text-primary font-bold">Professional Certifications</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-borders" />
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 heading-glow">13+</div>
            <div className="text-sm uppercase tracking-widest text-primary font-bold">Hands-on Projects</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-borders" />
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 heading-glow">Always</div>
            <div className="text-sm uppercase tracking-widest text-primary font-bold">Learning New Technologies</div>
          </div>
        </div>

      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex py-10">
        
        {/* Subtle Purple Radial Light Behind Marquee */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused] gap-6 px-4 z-20">
          {marqueeItems.map((cert, idx) => {
            const Icon = getIcon(cert.title);
            const isEarned = cert.status === 'Earned';
            
            return (
              <div 
                key={`${cert.title}-${idx}`} 
                onMouseEnter={() => setHoveredCert(cert)}
                onMouseLeave={() => setHoveredCert(null)}
                onMouseMove={handleMouseMove}
                onClick={() => setSelectedCert(cert)}
                className="w-350px shrink-0 glass-card rounded-3xl p-6 border border-borders flex flex-col relative group transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:bg-white/0.02 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] cursor-pointer"
              >
                {/* Status chip */}
                <div className="absolute top-6 right-6">
                  <span className={clsx(
                    "px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest border group-hover:scale-105 transition-transform",
                    isEarned ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"
                  )}>
                    {isEarned ? "Completed" : "In Progress"}
                  </span>
                </div>

                {/* Icon */}
                <div className="p-3 bg-white/5 rounded-2xl border border-borders w-fit mb-6 text-primary group-hover:rotate-[8deg] group-hover:scale-110 transition-all duration-300">
                  <Icon size={24} />
                </div>
                
                {/* Date / Issuer Label */}
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-text-secondary">
                  <span className="text-success font-medium flex items-center gap-1"><CheckCircle2 size={12} /> Completed</span>
                  <span className="w-1 h-1 rounded-full bg-borders" />
                  <span className="text-primary">{cert.issuer}</span>
                  {cert.issueDate && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-borders" />
                      <span>{cert.issueDate}</span>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-6 leading-tight group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                
                <div className="mt-auto pt-6 border-t border-borders flex items-center justify-between">
                  {cert.credentialId && cert.credentialId !== "PENDING" ? (
                    <span className="text-xs text-text-secondary font-mono">ID: {cert.credentialId}</span>
                  ) : (
                    <span className="text-xs text-text-secondary/50 font-mono italic">ID verified internally</span>
                  )}

                  {cert.verifyUrl && cert.verifyUrl !== '#' && isEarned && (
                    <a 
                      href={cert.verifyUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 hover:bg-primary border border-borders px-3 py-1.5 rounded-full transition-colors"
                    >
                      View Credential <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Floating Preview */}
      <AnimatePresence>
        {hoveredCert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden md:block fixed z-100 pointer-events-none"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y + 20,
            }}
          >
            <div className="p-5 bg-cards/95 backdrop-blur-xl border border-borders rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] w-[400px]">
              <div className="mb-4 pb-4 border-b border-borders/50 text-center">
                <div className="text-[10px] text-text-secondary uppercase tracking-widest mb-2">{hoveredCert.issuer}</div>
                <div className="text-lg font-bold text-white mb-2 leading-tight">{hoveredCert.title}</div>
                <div className="flex justify-center items-center gap-3 text-xs">
                  <span className="text-success flex items-center gap-1 font-bold"><CheckCircle2 size={12} /> Completed</span>
                  {hoveredCert.issueDate && <span className="text-text-secondary">Issued: {hoveredCert.issueDate}</span>}
                </div>
                {hoveredCert.credentialId && hoveredCert.credentialId !== "PENDING" && (
                  <div className="mt-3 text-xs font-mono text-text-secondary/70 bg-black/30 py-1.5 px-3 rounded-md w-fit mx-auto">ID: {hoveredCert.credentialId}</div>
                )}
              </div>
              
              {hoveredCert.image && (
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-borders/30">
                   <img src={hoveredCert.image} alt="Certificate Preview" className="w-full h-auto object-contain" loading="lazy" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-cards/95 backdrop-blur-xl border border-borders rounded-2xl p-4 w-full max-w-md relative shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-4 pb-4 border-b border-borders/50 text-center">
                <div className="text-[10px] text-text-secondary uppercase tracking-widest mb-2">{selectedCert.issuer}</div>
                <div className="text-lg font-bold text-white mb-2 leading-tight">{selectedCert.title}</div>
                <div className="flex justify-center items-center gap-3 text-xs">
                  <span className="text-success flex items-center gap-1 font-bold"><CheckCircle2 size={12} /> Completed</span>
                  {selectedCert.issueDate && <span className="text-text-secondary">Issued: {selectedCert.issueDate}</span>}
                </div>
              </div>

              {selectedCert.image && (
                <img src={selectedCert.image} alt="Certificate Preview" className="w-full h-auto rounded-xl shadow-lg border border-borders/30" loading="lazy" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Ending Quote */}
      <div className="mt-20 text-center max-w-3xl mx-auto px-4 relative z-20">
        <p className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
          "Learning isn't about collecting certificates.<br/>
          It's about applying knowledge to build better solutions and continuously improving with every project."
        </p>

        <div className="mt-12 text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-sm animate-pulse block mb-2">Still Learning...</span>
          <p className="text-text-secondary">The best projects are yet to come.</p>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
