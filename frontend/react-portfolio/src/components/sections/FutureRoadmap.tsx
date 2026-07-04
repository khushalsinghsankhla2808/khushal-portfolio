import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

const learningGoals = [
  "Microsoft Fabric", "Azure", "Machine Learning", "Apache Spark",
  "Data Engineering", "Docker", "Kubernetes", "Advanced React",
  "Next.js", "System Design"
];

export default function FutureRoadmap() {
  return (
    <section className="py-24 bg-secondary-background/50 border-t border-borders">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Currently Learning</h2>
          <p className="text-text-secondary text-lg">Technologies I am actively exploring and mastering.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-cards border border-borders rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Compass className="text-secondary" size={24} />
            <h3 className="text-xl font-bold text-text-primary">Future Roadmap</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {learningGoals.map(goal => (
              <span 
                key={goal} 
                className="px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-medium"
              >
                {goal}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
