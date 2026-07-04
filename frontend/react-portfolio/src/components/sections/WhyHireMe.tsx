import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const reasons = [
  { title: "Business Understanding", desc: "Always start with the 'why' before writing queries or code." },
  { title: "Data Cleaning", desc: "Expertise in transforming messy real-world datasets into analytics-ready models." },
  { title: "Dashboard Development", desc: "Building intuitive, high-performance Power BI and Excel executive dashboards." },
  { title: "SQL Optimization", desc: "Writing 20+ advanced business queries across retail and food-delivery datasets." },
  { title: "Data Storytelling", desc: "Translating complex metrics into actionable insights for stakeholders." },
  { title: "Business Intelligence", desc: "End-to-end pipeline development using modern BI technologies." },
  { title: "Problem Solving", desc: "Analytical mindset to tackle complex technical and business challenges." },
  { title: "Scalable Web Development", desc: "Building responsive, modern full-stack web applications with the MERN stack." },
  { title: "API Integration", desc: "Connecting disparate systems and real-time data sources seamlessly." },
  { title: "Responsive UI", desc: "Crafting premium user experiences using React and Tailwind CSS." },
  { title: "Continuous Learning", desc: "Actively pursuing new certifications in Microsoft Fabric and Azure." }
];

export default function WhyHireMe() {
  return (
    <section id="why-hire-me" className="py-24 px-4 max-w-7xl mx-auto border-t border-borders">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Hire Me</h2>
        <p className="text-text-secondary text-lg">Value proposition and specialized expertise.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex items-start gap-4 p-6 bg-cards border border-borders rounded-xl hover:border-primary/50 transition-colors"
          >
            <CheckCircle className="text-primary shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-text-primary mb-1">{reason.title}</h3>
              <p className="text-sm text-text-secondary">{reason.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
