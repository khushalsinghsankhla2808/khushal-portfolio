import { motion } from 'framer-motion';
import { Trophy, Star, GitMerge, LayoutDashboard, Target } from 'lucide-react';

const achievements = [
  { icon: LayoutDashboard, text: "Built 13+ real-world analytics projects" },
  { icon: Target, text: "Designed interactive Power BI dashboards across 7 industries" },
  { icon: GitMerge, text: "Developed end-to-end SQL analytics pipelines" },
  { icon: Star, text: "Worked with Retail, Healthcare, Entertainment, Weather, Supply Chain, Food Delivery, and E-Commerce datasets" },
  { icon: Trophy, text: "Completed Microsoft Fabric learning paths & Cisco Data Analytics certification" },
];

export default function FeaturedAchievements() {
  return (
    <section className="py-24 bg-secondary-background/50 border-t border-borders">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Achievements</h2>
          <p className="text-text-secondary text-lg">Key milestones and domain expertise.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-cards border border-borders rounded-xl p-6 flex items-start gap-4 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                  <Icon size={24} />
                </div>
                <p className="text-text-primary leading-relaxed text-sm font-medium">
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
