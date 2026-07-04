import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Star, GitMerge, LayoutDashboard, Target } from 'lucide-react';
import CountUp from 'react-countup';

const stats = [
  { value: 13, suffix: "+", label: "Analytics Projects" },
  { value: 7, suffix: "", label: "Industries Covered" },
  { value: 20, suffix: "+", label: "GitHub Repositories" },
  { value: 100, suffix: "%", label: "Dedication" },
];

const achievements = [
  { icon: LayoutDashboard, text: "Built 13+ real-world analytics projects" },
  { icon: Target, text: "Designed interactive Power BI dashboards across 7 industries" },
  { icon: GitMerge, text: "Developed end-to-end SQL analytics pipelines" },
  { icon: Star, text: "Worked with Retail, Healthcare, Entertainment, Weather, Supply Chain, Food Delivery, and E-Commerce datasets" },
  { icon: Trophy, text: "Completed Microsoft Fabric learning paths & Cisco Data Analytics certification" },
];

export default function FeaturedAchievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-20" ref={ref}>
          <div className="inline-block mb-4">
            <span className="font-caveat text-2xl text-primary transform -rotate-2 inline-block">Milestones</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-white">
            Featured <span className="text-primary">Achievements</span>
          </h2>
          <p className="text-text-secondary text-lg font-light max-w-2xl mx-auto">
            Key metrics and domain expertise acquired through rigorous end-to-end development.
          </p>
        </div>

        {/* Stats Row with CountUp */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
                {isInView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  "0"
                )}
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <div className="text-sm uppercase tracking-widest text-text-secondary font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="glass-card rounded-[24px] p-8 flex flex-col gap-6 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300">
                  <Icon size={24} />
                </div>
                <p className="text-white leading-relaxed text-base font-medium">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
