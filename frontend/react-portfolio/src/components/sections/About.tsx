import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 px-4 max-w-7xl mx-auto relative z-10">
      
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Text Content */}
        <div className="lg:col-span-6 xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block mb-4">
              <span className="font-caveat text-2xl text-accent transform -rotate-2 inline-block">The Evolution</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Bridging <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Insight</span> and <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-secondary">Action</span>
            </h2>
            
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-light">
              <p>
                I am a passionate <strong className="text-white font-medium">Data Analyst</strong> and aspiring <strong className="text-white font-medium">Full Stack Developer</strong> specializing in transforming raw data into meaningful business insights.
              </p>
              <p>
                I'm drawn to the moment raw, messy data turns into a decision someone can actually act on — that's what pulled me from spreadsheets into full BI dashboards, and eventually into building the applications that put those insights in front of people.
              </p>
              <p>
                Currently deepening my Microsoft Fabric and cloud analytics skills alongside the MERN stack — I want to be equally comfortable building the dashboard and the application that surfaces it.
              </p>
              <p>
                Looking to grow into an Analytics Engineer or BI Developer role where I can own a data problem end-to-end — from messy source data to a production-grade interface — rather than handing off between the two.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Grid of Glass Cards */}
        <div className="lg:col-span-6 xl:col-span-5 grid grid-cols-2 gap-4">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2 glass-card rounded-3xl p-6 border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-colors"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">Creative Sanctuary</span>
            <h3 className="text-xl font-bold text-white mb-2">Cricket & Community</h3>
            <p className="text-sm text-text-secondary font-light">Active in open-source communities and finding balance on the cricket pitch.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 glass-card rounded-3xl p-6 border border-white/5 hover:border-secondary/30 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 block">Currently Learning</span>
            <ul className="text-sm text-white space-y-2 font-medium">
              <li>Microsoft Fabric</li>
              <li>Cloud Analytics</li>
              <li>MERN Stack</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 glass-card rounded-3xl p-6 border border-white/5 flex items-center justify-center text-center hover:border-accent/30 transition-colors bg-linear-to-br from-white/5 to-transparent"
          >
            <p className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-text-secondary">
              "Curious by default, structured by habit."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-2 glass-card rounded-3xl p-8 border border-white/5 bg-linear-to-r from-primary/10 via-transparent to-transparent relative overflow-hidden"
          >
            <div className="absolute -left-4 -top-4 text-primary/20 font-serif text-8xl leading-none select-none">"</div>
            <p className="font-serif italic text-xl text-white/90 leading-relaxed relative z-10 pl-4">
              Building technology that creates impact, one insight at a time.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
