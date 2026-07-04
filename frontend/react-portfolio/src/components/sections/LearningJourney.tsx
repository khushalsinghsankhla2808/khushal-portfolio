import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const technologies = [
  "BCA", "SQL", "Python", "Power BI", "PostgreSQL", 
  "Business Intelligence", "Microsoft Fabric", "MERN Stack", 
  "Artificial Intelligence", "Cloud Technologies"
];

export default function LearningJourney() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Learning Journey</h2>
        <p className="text-text-secondary text-lg">My tech stack progression and continuous evolution.</p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-4xl mx-auto">
        {technologies.map((tech, idx) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="flex items-center gap-3 md:gap-4"
          >
            <span className="px-4 py-2 bg-cards border border-borders rounded-lg text-text-primary text-sm font-medium hover:border-primary/50 transition-colors cursor-default">
              {tech}
            </span>
            {idx < technologies.length - 1 && (
              <ArrowRight className="text-borders" size={16} />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
