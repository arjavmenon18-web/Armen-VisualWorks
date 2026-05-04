import { motion } from "motion/react";
import { Mail, Github, Instagram, Twitter, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-bg relative">
      <div className="max-w-7xl mx-auto editorial-grid">
        <div className="col-span-12 lg:col-span-6 bg-ink text-bg p-12 md:p-24 rounded-[4rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] group-hover:bg-accent/40 transition-all duration-1000" />
          
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-bg/40 mb-8 block font-sans">Have a project in mind?</span>
          <h2 className="text-[clamp(18px,6.5vw,80px)] font-black mb-12 leading-none uppercase">LET'S<br /><span className="text-accent italic">START</span><br />SOMETHING.</h2>
          
          <div className="space-y-8 relative z-10">
            <a href="mailto:armenvisualworks@gmail.com" className="group flex flex-wrap items-center gap-6 text-xl md:text-2xl lg:text-4xl font-display font-bold hover:text-accent transition-colors break-all">
              armenvisualworks@gmail.com
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-bg/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all shrink-0">
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:text-ink" />
              </div>
            </a>
            
            <div className="flex gap-4 pt-12">
               {[
                 { icon: Instagram, label: "Instagram" },
                 { icon: Twitter, label: "Twitter" },
                 { icon: Github, label: "Github" },
               ].map(social => (
                 <motion.a 
                   key={social.label}
                   href="#" 
                   whileHover={{ y: -5 }}
                   className="w-14 h-14 rounded-2xl bg-bg/5 flex items-center justify-center border border-bg/10 hover:border-accent hover:bg-accent/10 transition-all"
                 >
                   <social.icon className="w-6 h-6" />
                 </motion.a>
               ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center lg:pl-12">
          <form className="space-y-8 mt-12 lg:mt-0">
            <div className="editorial-grid md:gap-8">
              <div className="col-span-12 md:col-span-6 space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-widest text-ink/40 ml-4">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white border border-ink/5 rounded-3xl p-6 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="col-span-12 md:col-span-6 space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-widest text-ink/40 ml-4">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-white border border-ink/5 rounded-3xl p-6 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] uppercase font-bold tracking-widest text-ink/40 ml-4">Your Message</label>
              <textarea 
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-white border border-ink/5 rounded-[2.5rem] p-8 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <button className="w-full py-6 bg-accent text-ink rounded-3xl font-bold uppercase tracking-[0.2em] hover:bg-ink hover:text-bg transition-all transform hover:scale-[1.02]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
