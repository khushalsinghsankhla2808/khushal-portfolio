import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-4 max-w-7xl mx-auto relative z-10"
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side */}
        <div className="lg:col-span-6 xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block mb-4">
              <span className="font-caveat text-2xl text-accent transform -rotate-2 inline-block">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-text-primary heading-glow">
              Turning <span className="text-primary">Data</span> into{" "}
              <span className="text-primary">Meaningful Solutions</span>
            </h2>

            <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-light">
              <p>
                I'm a passionate{" "}
                <strong className="text-text-primary font-medium">
                  Data Analyst
                </strong>{" "}
                and{" "}
                <strong className="text-text-primary font-medium">
                  Business Intelligence Developer
                </strong>{" "}
                who enjoys transforming raw data into insights that help people
                make better decisions.
              </p>

              <p>
                I enjoy solving real-world problems through data, whether it's
                building interactive dashboards, analyzing business trends, or
                creating solutions that make information easier to understand
                and use. I believe great decisions begin with meaningful
                insights.
              </p>

              <p>
                Alongside my work in Data Analytics and Business Intelligence,
                I'm actively exploring{" "}
                <strong className="text-text-primary font-medium">
                  Full-Stack Development with AI
                </strong>
                . I enjoy building projects that help me learn modern web
                technologies while discovering how AI can create smarter,
                more intuitive applications.
              </p>

              <p>
                My goal is to keep growing as a developer by combining data,
                software development, and AI to build intelligent solutions
                that solve meaningful real-world problems. Every project I build
                is another opportunity to learn, improve, and create something
                valuable.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-6 xl:col-span-5 grid grid-cols-2 gap-4">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2 glass-card rounded-3xl p-6 border border-borders relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_20px_var(--color-glow)] transition-all duration-300"
          >
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">
              Beyond the Screen
            </span>

            <h3 className="text-xl font-bold text-text-primary mb-2">
              Cricket & Continuous Learning
            </h3>

            <p className="text-sm text-text-secondary font-light">
              Outside of coding, I enjoy playing cricket, exploring emerging
              technologies, and building personal projects that challenge me to
              learn something new every day.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 glass-card rounded-3xl p-6 border border-borders hover:border-secondary/50 hover:shadow-[0_0_20px_var(--color-glow)] transition-all duration-300"
          >
            <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 block">
              Currently Learning
            </span>

            <ul className="text-sm text-text-primary space-y-2 font-medium">
              <li>React & Next.js</li>
              <li>Node.js & Express</li>
              <li>AI Integration</li>
            </ul>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 glass-card rounded-3xl p-6 border border-borders flex items-center justify-center text-center hover:border-primary/50 hover:shadow-[0_0_20px_var(--color-glow)] transition-all duration-300"
          >
            <p className="text-lg font-bold text-text-primary">
              "Always learning.<br />Always building."
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-2 glass-card rounded-3xl p-8 border border-borders relative overflow-hidden hover:border-primary/50 hover:shadow-[0_0_20px_var(--color-glow)] transition-all duration-300"
          >
            <div className="absolute -left-4 -top-4 text-primary/20 font-serif text-8xl leading-none select-none">
              "
            </div>

            <p className="font-serif italic text-xl text-text-primary/90 leading-relaxed relative z-10 pl-4">
              Turning data into insights and ideas into intelligent
              applications.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}