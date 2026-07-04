import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowUpRight, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../../data/personalInfo';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [time, setTime] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  useEffect(() => {
    const updateTime = () => {
      const istTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setTime(`${istTime} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-32 px-4 max-w-7xl mx-auto relative z-10 border-t border-borders">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
        
        {/* Left Column - Headers & Socials */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Contact
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter heading-glow">
              Let's build <br />
              something <span className="text-primary">great.</span>
            </h2>
            <p className="text-text-secondary text-lg font-light max-w-md mb-12">
              Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="glass-card p-6 rounded-3xl border border-borders w-fit">
              <span className="text-text-secondary text-xs mb-2 uppercase tracking-widest font-bold">Local Time</span>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                <span className="text-2xl font-mono text-white tracking-tight">{time}</span>
              </div>
              <span className="text-white/40 text-xs mt-2 block">Currently in Jodhpur, India</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 glass-card rounded-full border border-borders hover:border-primary/50 hover:bg-primary/5 hover:text-primary hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] text-text-secondary transition-all duration-300">
                <FaLinkedin size={18} />
                <span className="text-sm font-bold">LinkedIn</span>
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 glass-card rounded-full border border-borders hover:border-primary/50 hover:bg-primary/5 hover:text-primary hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] text-text-secondary transition-all duration-300">
                <FaGithub size={18} />
                <span className="text-sm font-bold">GitHub</span>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-5 py-3 glass-card rounded-full border border-borders hover:border-primary/50 hover:bg-primary/5 hover:text-primary hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] text-text-secondary transition-all duration-300">
                <Mail size={18} />
                <span className="text-sm font-bold">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="glass-card p-8 md:p-12 rounded-[32px] border border-borders relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-cards z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6 text-success"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-text-secondary">Thanks for reaching out. I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)} 
                className="flex flex-col gap-10"
              >
                <div className="relative">
                  <input 
                    {...register('name')}
                    id="name"
                    disabled={isSubmitting}
                    className="peer w-full bg-transparent border-b border-borders px-0 py-3 text-white placeholder-transparent focus:outline-hidden focus:border-primary transition-colors disabled:opacity-50"
                    placeholder="Name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary cursor-text">
                    What's your name?
                  </label>
                  {errors.name && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors.name.message}</span>}
                </div>

                <div className="relative">
                  <input 
                    {...register('email')}
                    id="email"
                    type="email"
                    disabled={isSubmitting}
                    className="peer w-full bg-transparent border-b border-borders px-0 py-3 text-white placeholder-transparent focus:outline-hidden focus:border-primary transition-colors disabled:opacity-50"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary cursor-text">
                    What's your email?
                  </label>
                  {errors.email && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors.email.message}</span>}
                </div>

                <div className="relative">
                  <textarea 
                    {...register('message')}
                    id="message"
                    disabled={isSubmitting}
                    rows={4}
                    className="peer w-full bg-transparent border-b border-borders px-0 py-3 text-white placeholder-transparent focus:outline-hidden focus:border-primary transition-colors resize-none disabled:opacity-50"
                    placeholder="Message"
                  />
                  <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs text-text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary cursor-text">
                    How can I help you?
                  </label>
                  {errors.message && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-4 px-8 py-4 bg-linear-to-r from-[#8B5CF6] to-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
