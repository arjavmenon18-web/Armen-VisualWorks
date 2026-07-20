import React, { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const accessKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY || "ffa429b4-988a-49b0-97ab-9ce4ef0294ec";
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Collaboration Inquiry from ${formData.name}`
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMsg(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMsg("Failed to connect. Please check your network connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#F5F2EB] text-black border-t border-black/10">
      <div className="max-w-[95vw] mx-auto px-6 md:px-16 lg:px-24">
        {/* Plaque Header */}
        <div className="mb-16 border-b border-black/10 pb-8 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase text-black/40">
            COLLABORATION & INQUIRIES
          </span>
          <span className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase text-[#f9b934]">
            AGW STUDIO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Brief and Socials */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase text-black/40 block">
                LET'S CREATE A VISION
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-light uppercase tracking-tight text-black leading-none font-sans">
                START A<br />
                <span className="font-extrabold text-[#f9b934]">COLLABORATION</span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-black/60 leading-relaxed max-w-md font-light">
                We are currently accepting visual, motion, and music scoring commissions. Share your concept or design specifications, and our team will get in touch within 24 hours.
              </p>
            </div>

            {/* Stark social links block */}
            <div className="space-y-4 pt-8 border-t border-black/10 font-mono">
              <span className="text-[10px] font-mono tracking-[0.25em] font-bold text-black/40 uppercase block">
                DIRECT CONTACT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="mailto:armenvisualworks@gmail.com" 
                  className="flex items-center justify-between py-3 border-b border-black/10 text-xs font-bold uppercase tracking-widest hover:text-[#f9b934] transition-colors group"
                >
                  <span>EMAIL ARJ</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-black/40 group-hover:text-[#f9b934]" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between py-3 border-b border-black/10 text-xs font-bold uppercase tracking-widest hover:text-[#f9b934] transition-colors group"
                >
                  <span>GITHUB REPO</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-black/40 group-hover:text-[#f9b934]" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between py-3 border-b border-black/10 text-xs font-bold uppercase tracking-widest hover:text-[#f9b934] transition-colors group"
                >
                  <span>INSTAGRAM FEED</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-black/40 group-hover:text-[#f9b934]" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between py-3 border-b border-black/10 text-xs font-bold uppercase tracking-widest hover:text-[#f9b934] transition-colors group"
                >
                  <span>TWITTER FEED</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-black/40 group-hover:text-[#f9b934]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Block: Completely Dismantled Brutalist Form */}
          <div className="lg:col-span-7 bg-black text-[#F5F2EB] p-10 md:p-14 border border-white/10 relative">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#f9b934]" />
            
            {submitted ? (
              <div className="py-24 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-12 h-12 rounded-none border border-[#f9b934]/30 flex items-center justify-center text-[#f9b934] bg-white/5">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-black uppercase tracking-widest text-[#f9b934]">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="text-xs font-mono tracking-wider text-white/50 max-w-xs uppercase leading-relaxed">
                  Your details have been registered. Our creative office will follow up shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 border border-[#f9b934]/40 hover:border-[#f9b934] hover:bg-[#f9b934]/10 text-[#f9b934] text-[10px] font-mono tracking-widest uppercase transition-all duration-200"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-1.5 h-1.5 bg-[#f9b934] rounded-none" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/50">
                    CREATIVE INQUIRY FORM
                  </span>
                </div>

                {errorMsg && (
                  <div className="p-4 bg-red-950/30 border border-red-500/30 text-red-400 font-mono text-[10px] tracking-wider uppercase leading-relaxed">
                    ERROR: {errorMsg}
                  </div>
                )}

                {/* Field 1: Name */}
                <div className="space-y-2 relative">
                  <label className="text-[9px] font-mono uppercase font-bold tracking-widest text-white/40 block">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-b border-white/10 text-[#F5F2EB] placeholder-white/10 py-3 text-sm focus:outline-none focus:border-[#f9b934] transition-colors rounded-none font-sans font-light"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="space-y-2 relative">
                  <label className="text-[9px] font-mono uppercase font-bold tracking-widest text-white/40 block">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent border-b border-white/10 text-[#F5F2EB] placeholder-white/10 py-3 text-sm focus:outline-none focus:border-[#f9b934] transition-colors rounded-none font-sans font-light"
                  />
                </div>

                {/* Field 3: Message */}
                <div className="space-y-2 relative">
                  <label className="text-[9px] font-mono uppercase font-bold tracking-widest text-white/40 block">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, budget, or general creative inquiry..."
                    className="w-full bg-transparent border-b border-white/10 text-[#F5F2EB] placeholder-white/10 py-3 text-sm focus:outline-none focus:border-[#f9b934] transition-colors rounded-none font-sans font-light resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#f9b934] hover:bg-white text-black font-mono font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{submitting ? "TRANSMITTING..." : "SEND INQUIRY"}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
