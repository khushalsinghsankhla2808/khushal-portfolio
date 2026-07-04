import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const faqs = [
  { 
    q: "What technologies do you specialize in?", 
    a: "I specialize in Business Intelligence, Data Analytics, and Full Stack Web Development. My core expertise includes Power BI, SQL, PostgreSQL, Microsoft Excel, Python, React.js, Node.js, Express.js, MongoDB, Firebase, and modern JavaScript frameworks. I enjoy transforming raw data into actionable business insights while also building scalable and user-friendly web applications." 
  },
  { 
    q: "Do you work with SQL and Power BI?", 
    a: "Yes. SQL and Power BI are among my strongest technical skills. I have built multiple end-to-end Business Intelligence dashboards using Power BI, Power Query, DAX, and Star Schema modeling. I also have hands-on experience writing complex SQL queries involving joins, CTEs, window functions, aggregations, ranking functions, and performance optimization using PostgreSQL and MySQL." 
  },
  { 
    q: "Can you build end-to-end analytics solutions?", 
    a: "Absolutely. I can build complete analytics solutions starting from data collection and cleaning using Excel, SQL, or Python, followed by data transformation using Power Query or ETL processes, designing optimized data models, writing DAX measures, creating interactive Power BI dashboards, and presenting meaningful business insights that support strategic decision-making." 
  },
  { 
    q: "Do you have experience with MERN Stack?", 
    a: "Yes. Alongside Data Analytics, I have experience developing full-stack web applications using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). My flagship project, Velora AI, demonstrates advanced frontend development, backend APIs, authentication, database integration, AI-powered features, payment integration, and modern deployment practices." 
  },
  { 
    q: "What industries have you worked on?", 
    a: "My projects span multiple industries, including Supply Chain & Logistics, Retail & Ecommerce, Food Delivery, Smartphone Market Analysis, Healthcare, Entertainment, Weather Analytics, Artificial Intelligence, and Business Intelligence. This diverse experience allows me to understand different business challenges and deliver data-driven solutions tailored to various domains." 
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white heading-glow"
        >
          Frequently Asked <span className="text-primary">Questions</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary text-lg md:text-xl font-light max-w-2xl mx-auto"
        >
          Common questions about my expertise, workflow, and capabilities.
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={clsx(
                "glass-card rounded-[24px] overflow-hidden transition-all duration-300 border",
                isOpen ? "border-primary/50 shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-cards/95" : "border-borders hover:border-primary/30 hover:bg-cards/40 bg-cards/20"
              )}
            >
              <button 
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left px-8 py-6 flex items-center justify-between group"
              >
                <span className="flex items-center gap-4 text-lg font-bold text-white">
                  <div className={clsx(
                    "p-2 rounded-xl transition-colors duration-300",
                    isOpen ? "bg-primary/20 text-primary" : "bg-white/5 text-text-secondary group-hover:bg-white/10 group-hover:text-white"
                  )}>
                    <HelpCircle size={20} />
                  </div>
                  {faq.q}
                </span>
                <ChevronDown 
                  size={20} 
                  className={clsx(
                    "transition-transform duration-300 shrink-0", 
                    isOpen ? "rotate-180 text-primary" : "text-text-secondary group-hover:text-white"
                  )} 
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-2 pl-[72px]">
                      <p className="text-text-secondary text-base leading-relaxed font-light">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
