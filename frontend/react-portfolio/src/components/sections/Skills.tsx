import { motion } from 'framer-motion';
import { coreSkills, learningSkills } from '../../data/skills';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="py-32 relative z-10 border-t border-white/5 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="font-caveat text-2xl text-accent transform -rotate-2 inline-block">Skills & Technologies</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-white">
            Expertise & <span className="text-primary">Growth</span>
          </h2>
          <p className="text-text-secondary text-lg font-light max-w-2xl mx-auto">
            The technologies I use with confidence and the modern tools I'm currently exploring.
          </p>
        </div>

        {/* SECTION 1: Core Skills */}
        <div className="mb-24">
          <div className="text-center md:text-left mb-10">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-3">
              <span className="w-3 h-3 rounded-full bg-primary" />
              Core Skills
            </h3>
            <p className="text-text-secondary font-light text-lg">
              Technologies I use to build data-driven solutions and business intelligence applications.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4"
          >
            {coreSkills.map((skill, idx) => (
              <motion.div
                key={`${skill}-${idx}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-cards border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all duration-250 cursor-default font-medium text-text-primary md:text-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-80" />
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* SECTION 2: Currently Learning & Exploring */}
        <div>
          <div className="text-center md:text-left mb-10">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-3">
              <span className="w-3 h-3 rounded-full bg-secondary" />
              Currently Learning & Exploring
            </h3>
            <p className="text-text-secondary font-light text-lg">
              I'm continuously expanding my skills in modern web development and AI by building projects and exploring new technologies.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4"
          >
            {learningSkills.map((skill, idx) => (
              <motion.div
                key={`${skill}-${idx}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 px-5 py-3 rounded-full bg-cards border border-white/10 hover:border-secondary/50 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-250 cursor-default font-medium text-text-primary md:text-lg"
              >
                {skill}
                <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-[10px] uppercase tracking-wider font-bold">
                  Learning
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
