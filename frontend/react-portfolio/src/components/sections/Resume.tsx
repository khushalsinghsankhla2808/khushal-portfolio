import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

export default function Resume() {
  return (
    <section id="resume" className="py-24 bg-secondary-background/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Resume</h2>
          <p className="text-text-secondary text-lg">Professional experience and qualifications.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-cards border border-borders rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <FileText className="text-primary" /> Key Highlights
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <p className="text-text-secondary"><strong className="text-text-primary">Data Analysis:</strong> Extensive experience writing complex SQL queries and building data pipelines.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <p className="text-text-secondary"><strong className="text-text-primary">Business Intelligence:</strong> Designed interactive, high-impact dashboards in Power BI and Excel across multiple domains.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <p className="text-text-secondary"><strong className="text-text-primary">Full-Stack Development:</strong> Building modern, responsive web applications using React, Node.js, and MongoDB.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <p className="text-text-secondary"><strong className="text-text-primary">Academic Excellence:</strong> Maintaining an 8.65 CGPA in Master of Computer Applications (MCA).</p>
              </li>
            </ul>
            
            <a 
              href={personalInfo.resume} 
              target="_blank" 
              rel="noreferrer" 
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl hover:bg-primary/20 transition-colors font-bold"
            >
              <Download size={20} /> Download PDF
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[1/1.4] bg-cards border border-borders rounded-2xl flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <p className="text-text-primary mb-4 font-bold">View Full Resume</p>
              <a 
                href={personalInfo.resume} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-2 bg-primary text-background rounded-lg font-bold"
              >
                Open in new tab
              </a>
            </div>
            
            <iframe 
              src={`${personalInfo.resume}#view=FitH`} 
              title="Resume Preview"
              className="w-full h-full border-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
