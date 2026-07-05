import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

interface Reason {
  title: string;
  desc: string;
}

const reasons: Reason[] = [
  {
    title: "Business Understanding",
    desc: "Understand business problems before touching data, ensuring every analysis supports measurable business goals."
  },
  {
    title: "Data Cleaning & Quality",
    desc: "Transform raw, inconsistent datasets into accurate, analysis-ready data through validation and preprocessing."
  },
  {
    title: "Dashboard Development",
    desc: "Build interactive Power BI dashboards that enable executives to monitor KPIs and make data-driven decisions."
  },
  {
    title: "SQL Optimization",
    desc: "Develop optimized SQL queries for faster reporting, scalable analytics, and efficient data retrieval."
  },
  {
    title: "Data Storytelling",
    desc: "Translate complex metrics into clear visual narratives that drive informed business decisions."
  },
  {
    title: "Business Intelligence",
    desc: "Create end-to-end BI solutions from raw data to actionable dashboards and performance insights."
  },
  {
    title: "Problem Solving",
    desc: "Break complex business challenges into structured, data-driven solutions using analytical thinking."
  },
  {
    title: "ETL & Data Preparation",
    desc: "Extract, clean, transform, and model data from multiple sources into reliable analytical datasets."
  },
  {
    title: "Automation",
    desc: "Reduce manual reporting by automating repetitive workflows using SQL, Python, Power Query, and DAX."
  },
  {
    title: "Stakeholder Communication",
    desc: "Present technical findings in simple business language that aligns technical work with business objectives."
  },
  {
    title: "Continuous Learning",
    desc: "Continuously expand expertise in Microsoft Fabric, Azure, Power BI, and modern analytics technologies."
  },
  {
    title: "Attention to Detail",
    desc: "Maintain high standards of accuracy, consistency, and reliability throughout the analytics lifecycle."
  }
];

function CountUp({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const startValue = 0;
      const endValue = value;

      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(startValue + easeOutCubic * (endValue - startValue)));

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

function Card({ title, desc, index }: { title: string; desc: string; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      className="group relative flex items-start gap-4 p-7 md:p-8 bg-cards/30 border border-borders rounded-2xl backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-cards/50 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] overflow-hidden"
    >
      {/* Radial glow that follows the cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              200px circle at ${glowX}px ${glowY}px,
              rgba(168, 85, 247, 0.15),
              transparent 80%
            )
          `
        }}
      />
      
      {/* Premium Check Icon with hover micro-interaction */}
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:rotate-6 transition-all duration-300 shrink-0">
        <Check className="w-5 h-5 stroke-[2.5]" />
      </div>

      <div className="relative z-10">
        <h3 className="text-[18px] md:text-[20px] font-semibold text-text-primary mb-2 transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="text-[15px] leading-[1.7] text-text-secondary">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyHireMe() {
  return (
    <section id="why-hire-me" className="py-24 px-4 max-w-7xl mx-auto border-t border-borders">
      <div className="text-center mb-16 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary heading-glow">
          What I Actually Bring
        </h2>
        <p className="text-text-secondary text-lg max-w-[600px] leading-[1.6]">
          Less buzzwords, more of how I actually work.
        </p>
      </div>

      {/* Horizontal Statistics Strip */}
      <div className="mb-16 p-4 md:p-6 bg-cards/20 border border-borders rounded-2xl backdrop-blur-md max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Check className="w-3.5 h-3.5 stroke-3" />
          </div>
          <span className="text-[15px] md:text-[16px] font-semibold text-text-primary">
            <span className="text-lg md:text-xl font-bold text-primary mr-1">
              <CountUp value={12} />+
            </span> 
            Analytics Projects
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Check className="w-3.5 h-3.5 stroke-3" />
          </div>
          <span className="text-[15px] md:text-[16px] font-semibold text-text-primary">
            Power BI • SQL • Python • Excel
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Check className="w-3.5 h-3.5 stroke-3" />
          </div>
          <span className="text-[15px] md:text-[16px] font-semibold text-text-primary">
            Interactive Dashboards
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Check className="w-3.5 h-3.5 stroke-3" />
          </div>
          <span className="text-[15px] md:text-[16px] font-semibold text-text-primary">
            End-to-End BI Solutions
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => (
          <Card key={idx} title={reason.title} desc={reason.desc} index={idx} />
        ))}
      </div>
    </section>
  );
}
