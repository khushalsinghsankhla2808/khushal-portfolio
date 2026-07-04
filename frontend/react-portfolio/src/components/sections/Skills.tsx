import { motion, type Variants } from "framer-motion";
import { coreSkills, learningSkills } from "../../data/skills";

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 12,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-32 relative z-10 border-t border-borders bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}

        <div className="text-center mb-20">

          <div className="inline-block mb-4">
            <span className="font-caveat text-2xl text-accent -rotate-2 inline-block">
              Skills & Technologies
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white heading-glow">
            Technical <span className="text-primary">Expertise</span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-text-secondary leading-relaxed font-light">
            My toolkit reflects both the technologies I work with confidently
            and the modern technologies I'm actively learning through
            hands-on projects and continuous exploration.
          </p>

        </div>

        {/* Technical Expertise */}

        <div className="mb-24">

          <div className="mb-10">

            <h3 className="text-3xl font-bold text-white flex items-center gap-3 mb-4">

              <span className="w-3 h-3 rounded-full bg-primary" />

              Technical Expertise

            </h3>

            <p className="text-text-secondary text-lg leading-relaxed">
              Technologies I use to build data-driven solutions, interactive
              dashboards, business intelligence reports, and modern
              applications.
            </p>

          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            {coreSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.06,
                  y: -5,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group flex items-center gap-3 px-5 py-3 rounded-full
                bg-cards border border-borders
                hover:border-primary/50
                hover:bg-primary/5
                hover:shadow-[0_0_25px_rgba(168,85,247,0.18)]
                transition-all duration-300"
              >

                <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />

                <span className="text-text-primary font-medium">
                  {skill}
                </span>

              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Learning Journey */}

        <div>

          <div className="mb-10">

            <h3 className="text-3xl font-bold text-white flex items-center gap-3 mb-4">

              <span className="w-3 h-3 rounded-full bg-secondary" />

              Learning Journey

            </h3>

            <p className="text-text-secondary text-lg leading-relaxed">
              I believe continuous learning is essential in technology. These
              are the areas I'm currently exploring by building projects,
              experimenting with new tools, and strengthening my practical
              skills.
            </p>

          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            {learningSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.06,
                  y: -5,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group flex items-center gap-3 px-5 py-3 rounded-full
                bg-cards border border-borders
                hover:border-secondary/50
                hover:bg-secondary/5
                hover:shadow-[0_0_25px_rgba(192,132,252,0.18)]
                transition-all duration-300"
              >

                <span className="text-text-primary font-medium">
                  {skill}
                </span>

                <span className="px-2.5 py-1 rounded-full
                bg-secondary/10
                border border-secondary/20
                text-secondary
                text-[10px]
                font-bold
                uppercase
                tracking-wider">
                  In Progress
                </span>

              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}