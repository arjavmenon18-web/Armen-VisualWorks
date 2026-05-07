import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 lg:px-12 bg-bg border-t border-ink/5" style={{ paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col sm:flex-row gap-12 md:gap-16">
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">Status</div>
            <div className="text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></span>
              Available for Projects
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">Location</div>
            <div className="text-xs font-bold uppercase">Dubai, UAE &mdash; GMT+4</div>
          </div>
        </div>
        
        <div className="md:text-right">
          <div className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">Follow</div>
          <div className="flex flex-wrap gap-6 text-xs font-bold uppercase">
            <a href="#" className="hover:text-accent transition-colors">Behance</a>
            <a href="#" className="hover:text-accent transition-colors">Dribbble</a>
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-40">
          © 2026 ARMEN VISUALWORKS [AVW]. ALL RIGHTS RESERVED.
        </div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-ink/30 italic">
          Crafting high-end digital poetry.
        </p>
      </div>
    </footer>
  );
}
