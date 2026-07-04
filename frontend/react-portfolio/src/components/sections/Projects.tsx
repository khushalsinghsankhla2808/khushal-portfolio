import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { ExternalLink, Search, Star, Clock } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import clsx from 'clsx';

const CATEGORIES = ["All", "Power BI", "SQL", "Excel", "Python", "MERN", "AI", "Data Analytics"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techTags.some(tag => tag.toLowerCase().includes(query)) ||
        project.domainTags.some(tag => tag.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-32 px-4 max-w-7xl mx-auto relative z-10">
      
      <div className="flex flex-col mb-16 text-center md:text-left">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter"
        >
          Selected <span className="text-primary">Works</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary text-lg md:text-xl font-light max-w-3xl mb-12"
        >
          A curated showcase of end-to-end data analytics and full-stack development projects, demonstrating problem-solving, technical depth, and business impact.
        </motion.p>

        {/* Filters and Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center glass-card p-4 rounded-3xl"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 xl:pb-0 w-full xl:w-auto hide-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="hover"
                className={clsx(
                  "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300",
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-black/40 border border-white/5 text-text-secondary hover:text-white hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full xl:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm text-white focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
              data-cursor="hover"
              className="group glass-card rounded-[32px] overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] hover:shadow-primary/10 flex flex-col relative"
            >

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-6 right-6 z-20 px-4 py-1.5 bg-secondary-background border border-primary/30 rounded-full text-xs font-bold text-primary flex items-center gap-1.5 shadow-md">
                  <Star size={14} className="fill-primary" /> Featured
                </div>
              )}


              <div className="p-8 flex-1 flex flex-col relative z-20">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
                      {project.cardLabel || `Solo Project · ${project.category}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-text-secondary border border-white/10">
                         {project.category}
                      </span>
                      {project.duration && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-text-secondary border border-white/10">
                          <Clock size={12} className="text-primary" />
                          {project.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-text-secondary hover:text-white hover:bg-white/20 transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-text-secondary hover:text-white hover:bg-white/20 transition-all"
                      title="GitHub Repository"
                    >
                      <FaGithub size={18} />
                    </a>
                  </div>
                </div>

                <h3 className="font-bold text-2xl md:text-3xl mb-4 text-white group-hover:text-primary transition-all">{project.title}</h3>
                <p className="text-text-secondary text-sm md:text-base mb-8 flex-1 leading-relaxed font-light">
                  {project.description}
                </p>
                
                {/* Tech & Skills */}
                <div className="space-y-5 mb-8">
                  <div className="flex flex-wrap gap-2">
                    {project.techTags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-mono rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Footer Action */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-sm transition-all rounded-full flex items-center justify-center gap-2 group/btn"
                  >
                    View Project Details
                    <ExternalLink size={16} className="text-primary group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-20">
            <p className="text-text-secondary text-lg">No projects found matching your search.</p>
          </div>
        )}
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
