import { motion } from 'framer-motion';
import { Search, Database, Code2, LineChart, PieChart, Lightbulb, Rocket } from 'lucide-react';

const steps = [
  { icon: Search, title: "Research", desc: "Understanding business objectives and defining KPIs." },
  { icon: Database, title: "Data Collection", desc: "Extracting data from diverse sources and APIs." },
  { icon: Code2, title: "Data Cleaning", desc: "Transforming and preparing data for accurate analysis." },
  { icon: LineChart, title: "Analysis", desc: "Applying statistical and exploratory data techniques." },
  { icon: PieChart, title: "Visualization", desc: "Designing interactive dashboards and reports." },
  { icon: Lightbulb, title: "Insights", desc: "Translating visuals into actionable business strategy." },
  { icon: Rocket, title: "Deployment", desc: "Delivering the solution to end-users and stakeholders." }
];

export default function DevelopmentProcess() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto border-t border-borders">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Development Process</h2>
        <p className="text-text-secondary text-lg">My structured approach to solving data problems.</p>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-borders -translate-y-1/2" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative z-10 overflow-x-auto pb-4 snap-x snap-mandatory">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center min-w-[140px] text-center snap-center group"
              >
                <div className="w-16 h-16 rounded-full bg-cards border border-borders flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:border-primary/50 group-hover:shadow-md transition-all mb-4 relative">
                  <Icon size={24} />
                  {/* Decorative dot for the timeline line */}
                  <div className="hidden md:block absolute -right-2 top-1/2 w-4 h-4 bg-background border-2 border-borders rounded-full -translate-y-1/2 translate-x-full z-0" />
                </div>
                <h3 className="font-bold text-text-primary mb-2 text-sm uppercase tracking-wider">{step.title}</h3>
                <p className="text-xs text-text-secondary max-w-[120px]">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
