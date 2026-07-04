import { motion } from 'framer-motion';
import { skillCategories } from '../../data/skills';

// Map categories to specific dot colors for the pill cloud
const categoryColors: Record<string, string> = {
  "Programming": "bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]",
  "Business Intelligence": "bg-secondary shadow-[0_0_8px_rgba(34,211,238,0.8)]",
  "Databases": "bg-accent shadow-[0_0_8px_rgba(168,85,247,0.8)]",
  "Data Analytics": "bg-success shadow-[0_0_8px_rgba(34,197,94,0.8)]",
  "MERN Stack": "bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]",
  "Tools": "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
};

// Flatten skills and assign properties for visual rhythm
const flatSkills = skillCategories.flatMap((category, catIdx) => 
  category.skills.map((skill, skillIdx) => {
    // Generate some pseudo-random visual rhythm (size/weight) based on index
    const isLarge = (catIdx + skillIdx) % 5 === 0;
    const isMedium = (catIdx + skillIdx) % 3 === 0 && !isLarge;
    
    return {
      name: skill,
      category: category.title,
      colorClass: categoryColors[category.title] || "bg-primary",
      textSize: isLarge ? "text-lg md:text-xl" : isMedium ? "text-base md:text-lg" : "text-sm md:text-base",
      fontWeight: isLarge ? "font-bold" : isMedium ? "font-semibold" : "font-medium"
    };
  })
);

// Shuffle array for a more organic "cloud" look
const shuffledSkills = [...flatSkills].sort((a, b) => 
  (a.name.length * a.category.length) % 3 - (b.name.length * b.category.length) % 3
);

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="font-caveat text-2xl text-accent transform -rotate-2 inline-block">My Toolkit</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-white">
            Technologies & <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary to-primary">Skills</span>
          </h2>
          <p className="text-text-secondary text-lg font-light max-w-2xl mx-auto">
            A comprehensive overview of the tools, languages, and frameworks I use to transform data into decisions and build scalable applications.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {Object.entries(categoryColors).map(([cat, colorClass]) => (
            <div key={cat} className="flex items-center gap-2 text-xs md:text-sm text-text-secondary font-medium">
              <span className={`w-2 h-2 rounded-full ${colorClass}`} />
              {cat}
            </div>
          ))}
        </div>

        {/* Pill Cloud */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {shuffledSkills.map((skill, idx) => (
            <motion.div
              key={`${skill.name}-${idx}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: (idx % 15) * 0.05, 
                type: "spring", 
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/3 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all cursor-default ${skill.textSize} ${skill.fontWeight} text-text-primary`}
            >
              <span className={`w-2 h-2 rounded-full ${skill.colorClass}`} />
              {skill.name}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
