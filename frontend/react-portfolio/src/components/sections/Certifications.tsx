import { certifications } from '../../data/certs';
import { Award, ShieldCheck, Rocket, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

export default function Certifications() {
  // We duplicate the list twice so it can loop seamlessly in a CSS marquee.
  const marqueeItems = [...certifications, ...certifications, ...certifications];

  // Pick an icon based on title keywords just to add variety
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('project') || t.includes('hackathon')) return Rocket;
    if (t.includes('professional') || t.includes('analyst') || t.includes('engineer')) return ShieldCheck;
    return Award;
  };

  return (
    <section id="certifications" className="py-32 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="font-caveat text-2xl text-primary transform -rotate-2 inline-block">Credentials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
            Professional <span className="text-primary">Certifications</span>
          </h2>
          <p className="text-text-secondary text-lg font-light max-w-2xl mx-auto">
            Continuous learning and credentials demonstrating my commitment to mastering modern technologies.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused] gap-6 px-4">
          {marqueeItems.map((cert, idx) => {
            const Icon = getIcon(cert.title);
            const isEarned = cert.status === 'Earned';
            
            return (
              <div 
                key={`${cert.title}-${idx}`} 
                className="w-[350px] shrink-0 glass-card rounded-3xl p-6 border border-white/5 flex flex-col relative group transition-colors hover:border-white/20 hover:bg-white/3"
              >
                {/* Status chip */}
                <div className="absolute top-6 right-6">
                  <span className={clsx(
                    "px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest border",
                    isEarned ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"
                  )}>
                    {cert.status}
                  </span>
                </div>

                {/* Icon */}
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 w-fit mb-6 text-primary">
                  <Icon size={24} />
                </div>
                
                {/* Date / Issuer Label */}
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                  <span className="text-primary">{cert.issuer}</span>
                  {cert.issueDate && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{cert.issueDate}</span>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-6 leading-tight group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 hover:bg-primary border border-white/10 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Verify <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
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
