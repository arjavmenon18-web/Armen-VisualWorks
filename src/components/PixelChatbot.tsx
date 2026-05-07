import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, User, Bot, ExternalLink } from 'lucide-react';
import { getPixelResponseStream } from '../services/geminiService';
import { useNavigate, useLocation } from 'react-router-dom';
import { projects } from './Projects';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface PixelChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PixelChatbot({ isOpen, onClose }: PixelChatbotProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Welcome to the digital atelier of **Armen VisualWorks**. I'm **Pixel Blazer**, studio host and member of the legendary Blazer AI family. How can I guide your exploration today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    // Collect live view context
    const hitElements = document.querySelectorAll('[data-is-hit="true"]');
    const visibleLabels = Array.from(hitElements)
      .map(el => el.getAttribute('data-view-label'))
      .filter(Boolean);
    
    const viewContext = visibleLabels.length > 0 
      ? `\nLIVE VIEW DATA: The user is currently LOOKING AT: ${visibleLabels.join(', ')}.` 
      : "";

    try {
      let fullResponse = "";
      // Add a placeholder message for the streaming response
      setMessages(prev => [...prev, { role: 'model', content: "" }]);
      
      // Determine project context if on a project page
      let context = location.pathname;
      const projectMatch = location.pathname.match(/\/project\/(\d+)/);
      if (projectMatch) {
        const projectId = parseInt(projectMatch[1]);
        const project = projects.find(p => p.id === projectId);
        if (project) {
          context = `User is viewing PROJECT DETAILS: ${project.title}. 
          Category/Segment: ${project.category}. 
          Description: ${project.description}. 
          Year: ${project.year}.
          Technical Insight: This work is a RAW capture. No heavy post-grading. The aesthetic is achieved through in-camera intentionality.`;
        }
      }
      
      const stream = getPixelResponseStream(newMessages, context + viewContext);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', content: fullResponse };
          return updated;
        });
      }

      // Check for direct action auto-navigation after stream completes
      const directActionMatch = fullResponse.match(/\[DIRECT_ACTION:([^\]]+)\]/);
      if (directActionMatch) {
        const path = directActionMatch[1];
        setTimeout(() => handleAction(path), 1500);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (path: string) => {
    if (path.startsWith('#')) {
      const id = path.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If on a different page, go to home first
        navigate('/' + path);
      }
    } else {
      const [basePath, hash] = path.split('#');
      
      if (hash) {
        // If there's a hash, we navigate and then try to scroll
        navigate(path);
        // Small timeout to allow the path to change and elements to render
        // Increased timeout to account for route change and component mounting
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const navHeight = 80; // Approximate navbar height
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elementPosition - navHeight,
              behavior: 'smooth'
            });
          }
        }, 300);
      } else {
        navigate(path);
        window.scrollTo(0, 0);
      }
    }
    onClose();
  };

  const renderMessageContent = (content: string) => {
    // Separate actions from text
    const actionRegex = /\[ACTION:([^|]+)\|([^\]]+)\]/g;
    const directActionRegex = /\[DIRECT_ACTION:([^\]]+)\]/g;
    
    const actions: { label: string, path: string }[] = [];
    let match;
    while ((match = actionRegex.exec(content)) !== null) {
      actions.push({ label: match[1], path: match[2] });
    }

    const textContent = content
      .replace(actionRegex, '')
      .replace(directActionRegex, '')
      .trim();

    return (
      <div className="space-y-3">
        <div className="prose prose-invert max-w-none">
          {textContent.split('\n').map((line, i) => (
            <p key={i} className={i > 0 ? 'mt-1' : ''}>
              {line.split('**').map((part, j) => (
                j % 2 === 1 ? <strong key={j} className="font-black underline decoration-accent/50">{part}</strong> : part
              ))}
            </p>
          ))}
        </div>
        
        {actions.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            {actions.map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction(action.path)}
                className="flex items-center justify-between w-full px-4 py-3 bg-accent text-ink rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-accent/10 border border-white/20 transition-colors"
              >
                <span>{action.label}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9, x: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: 100, scale: 0.9, x: 0 }}
          className="fixed bottom-32 right-6 md:right-12 w-[calc(100vw-3rem)] md:w-[400px] h-[600px] max-h-[calc(100vh-200px)] bg-bg border border-ink/10 rounded-[32px] shadow-2xl z-[200] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-ink/5 flex items-center justify-between bg-ink/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-ink" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-ink">Pixel</h3>
                <p className="text-[10px] text-ink/40 font-bold uppercase tracking-tight">Studio Assistant</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-ink/5 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-ink" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-ink/10' : 'bg-accent/20'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-ink" /> : <Bot className="w-4 h-4 text-ink" />}
                </div>
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-ink text-white rounded-tr-none shadow-xl' 
                    : 'bg-ink/5 text-ink rounded-tl-none border border-ink/5'
                }`}>
                  {renderMessageContent(msg.content)}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-ink" />
                </div>
                <div className="bg-ink/5 rounded-2xl rounded-tl-none p-4">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-ink/20 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-ink/20 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-ink/20 rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-ink/5 flex gap-2 bg-ink/5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AVW projects..."
              autoComplete="off"
              className="flex-1 bg-bg border border-ink/10 rounded-full px-5 py-3 text-base md:text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 bg-ink text-white rounded-full flex items-center justify-center hover:bg-accent hover:text-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
          
          {/* Footer branding */}
          <div className="px-6 py-2 text-center border-t border-ink/5">
            <p className="text-[8px] text-ink/30 uppercase font-black tracking-widest leading-none">
              Built by Arjav Menon & Team AVW
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
