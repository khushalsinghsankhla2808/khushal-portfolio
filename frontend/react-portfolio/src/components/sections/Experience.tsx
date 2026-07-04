import { motion } from 'framer-motion';
import { Trophy, CheckCircle, Code, Award, LayoutDashboard, Database, Activity } from 'lucide-react';

const hallOfFame = [
  { icon: LayoutDashboard, text: "Built 13+ real-world analytics projects across 7 industries" },
  { icon: Database, text: "Wrote 20+ advanced SQL business queries (Walmart Sales Analysis alone)" },
  { icon: Activity, text: "Designed a 7-page Power BI supply chain dashboard with forecasting (Samsung)" },
  { icon: Code, text: "Shipped a live, production MERN + AI product with real users (Velora AI)" },
  { icon: CheckCircle, text: "Completed Microsoft Fabric learning paths" },
  { icon: Award, text: "Earned Cisco Data Analytics certification" },
  { icon: Trophy, text: "Published 13+ open-source projects on GitHub" }
];

const timeline = [
  {
    date: "2025 - 2027",
    title: "Master of Computer Applications (MCA)",
    org: "JECRC University",
    bullets: [
      "Specializing in advanced software engineering and cloud technologies while maintaining an 8.65 CGPA.",
      "Built and deployed Velora AI, a full-stack MERN + AI website builder, alongside Power BI dashboards for Samsung and a Swiggy vs Zomato analysis.",
      "Earned the Cisco Data Analytics Essentials certification, bridging data analytics with full-stack development."
    ]
  },
  {
    date: "2022 - 2025",
    title: "Bachelor of Computer Applications (BCA)",
    org: "Jai Narain Vyas University",
    bullets: [
      "Developed foundational knowledge in programming and database management.",
      "Graduated with 72.53%.",
      "Started journey into SQL and Python for data analysis."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-4 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="font-caveat text-2xl text-primary transform -rotate-2 inline-block">My Path</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-white">
          Journey & <span className="text-primary">Achievements</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Timeline */}
        <div className="lg:col-span-8">
          <div className="relative border-l border-white/10 ml-4 md:ml-0">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="mb-12 relative pl-8 md:pl-12 last:mb-0"
              >
                {/* Timeline Node */}
                <div className="absolute w-4 h-4 rounded-full left-[-8.5px] top-1.5 ring-4 ring-background bg-primary shadow-sm" />
                
                <div className="glass-card rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors group">
                  <span className="text-sm font-bold text-primary mb-2 block">{item.date}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-primary transition-all">
                    {item.title}
                  </h3>
                  <h4 className="text-base text-primary font-medium mb-4">{item.org}</h4>
                  
                  <ul className="space-y-3">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-text-secondary text-sm md:text-base leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0 group-hover:bg-primary/50 transition-colors" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Hall of Fame */}
        <div className="lg:col-span-4 sticky top-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-6 border border-white/5"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Trophy className="text-primary" size={20} />
              Hall of Fame
            </h3>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {hallOfFame.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + (idx * 0.1) }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-primary/30 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 text-text-secondary group-hover:text-primary transition-colors shrink-0">
                      <Icon size={16} />
                    </div>
                    <p className="text-sm font-medium text-text-secondary leading-relaxed group-hover:text-white transition-colors">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
}
