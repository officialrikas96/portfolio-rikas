// src/components/ContactSection.tsx
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Full Stack Project', message: '' });
  const [sent, setSent] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('Full Stack Project');

  // 3D Tilt for Left and Right Panels
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  // Left Motion
  const leftMouseX = useMotionValue(0);
  const leftMouseY = useMotionValue(0);
  const leftRotateX = useSpring(useTransform(leftMouseY, [-0.5, 0.5], [6, -6]), { damping: 20, stiffness: 260 });
  const leftRotateY = useSpring(useTransform(leftMouseX, [-0.5, 0.5], [-6, 6]), { damping: 20, stiffness: 260 });

  // Right Motion
  const rightMouseX = useMotionValue(0);
  const rightMouseY = useMotionValue(0);
  const rightRotateX = useSpring(useTransform(rightMouseY, [-0.5, 0.5], [6, -6]), { damping: 20, stiffness: 260 });
  const rightRotateY = useSpring(useTransform(rightMouseX, [-0.5, 0.5], [-6, 6]), { damping: 20, stiffness: 260 });

  const handleLeftMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!leftCardRef.current) return;
    const rect = leftCardRef.current.getBoundingClientRect();
    leftMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    leftMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleRightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rightCardRef.current) return;
    const rect = rightCardRef.current.getBoundingClientRect();
    rightMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    rightMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const presets = [
    { label: '⚡ Full Stack Project', message: "Hi Rikas, I would like to discuss developing a full-stack web/software project with you." },
    { label: '💼 Hiring & Opportunities', message: "Hello Rikas, We have an engineering opportunity that matches your software development skills." },
    { label: '🎨 UI/UX & Web Design', message: "Hi Rikas, Let's collaborate on building modern UI/UX mockups and web interfaces." },
    { label: '💬 General Inquiry', message: "Hey Rikas, Just wanted to connect and discuss your software projects." },
  ];

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setSelectedPreset(preset.label);
    setFormData((prev) => ({
      ...prev,
      subject: preset.label,
      message: preset.message,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      handle: 'mohammed-rikas',
      url: 'https://www.linkedin.com/in/mohammed-rikas-2424a93ab',
      icon: '💼',
      badge: 'PROFESSIONAL',
      color: '#0A66C2',
    },
    {
      name: 'Instagram',
      handle: '@mohammed_rikas',
      url: 'https://www.instagram.com/',
      icon: '📸',
      badge: 'CREATIVE',
      color: '#E4405F',
    },
    {
      name: 'WhatsApp Direct',
      handle: '+94 76 100 4640',
      url: 'https://wa.me/94761004640',
      icon: '💬',
      badge: 'INSTANT CHAT',
      color: '#25D366',
    },
    {
      name: 'Email Dispatch',
      handle: 'mohammedrikas024@gmail.com',
      url: 'mailto:mohammedrikas024@gmail.com',
      icon: '✉️',
      badge: 'DIRECT MAIL',
      color: '#D4AF37',
    },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-20 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[40rem] h-[40rem] bg-[#D4AF37]/5 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[34rem] h-[34rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-6"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            05 / CONTACT & TRANSMISSION
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              INITIALIZE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              TRANSMISSION.
            </span>
          </h2>

          <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-[#34D399]/40 bg-[#061A12]/80 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#34D399] uppercase font-semibold">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#8C6D4F] mt-1.5">
              LOCATION: JAFFNA, SRI LANKA • UTC+5:30
            </span>
          </div>
        </motion.div>

        {/* Split 3D Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ================= LEFT COLUMN: 3D CONNECT HUB (5 COLS) ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between perspective-[1200px]">
            <motion.div
              ref={leftCardRef}
              onMouseMove={handleLeftMove}
              onMouseEnter={() => setIsLeftHovered(true)}
              onMouseLeave={() => {
                setIsLeftHovered(false);
                leftMouseX.set(0);
                leftMouseY.set(0);
              }}
              style={{ rotateX: leftRotateX, rotateY: leftRotateY, transformStyle: 'preserve-3d' }}
              className="h-full p-8 rounded-xl border border-[#8C6D4F]/35 bg-[#0D0B09]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between relative overflow-hidden group hover:border-[#D4AF37] transition-colors duration-500"
            >
              {/* Laser Shimmer */}
              <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
                <motion.div
                  animate={{ x: isLeftHovered ? ['-100%', '200%'] : '-100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent skew-x-12"
                />
              </div>

              {/* Corner L-Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />

              <div style={{ transform: 'translateZ(25px)' }}>
                <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] block mb-2">
                  // SECURE CHANNELS
                </span>

                <h3
                  className="text-3xl sm:text-4xl tracking-wide text-white mb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  LET'S BUILD TOGETHER
                </h3>

                <p
                  className="text-xs sm:text-[13px] font-light text-[#BDB0A4] leading-relaxed mb-6"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Whether you have an enterprise system to engineer, a web platform to design, or a collaborative venture, reach out across any verified frequency.
                </p>

                {/* 3D Social Channels Grid */}
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/item flex items-center justify-between p-3.5 rounded-lg border border-[#8C6D4F]/30 bg-[#14100C] hover:border-[#D4AF37] hover:bg-[#1C1610] transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl p-1.5 rounded bg-[#0A0806] border border-[#8C6D4F]/30 group-hover/item:border-[#D4AF37]/60 group-hover/item:scale-110 transition-transform">
                          {social.icon}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] font-mono tracking-widest text-[#8C6D4F] group-hover/item:text-[#D4AF37] uppercase">
                            {social.name}
                          </span>
                          <span className="text-xs font-mono text-white group-hover/item:text-[#F7E7C4] transition-colors">
                            {social.handle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-[#0A0806] border border-[#8C6D4F]/30 text-[#C4B5A5] hidden sm:inline-block">
                          {social.badge}
                        </span>
                        <span className="text-xs text-[#D4AF37] group-hover/item:translate-x-1 transition-transform">
                          ↗
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Physical Location Card */}
              <div
                className="mt-6 pt-5 border-t border-[#8C6D4F]/20 flex items-center space-x-3 text-xs text-[#C4B5A5]"
                style={{ transform: 'translateZ(20px)' }}
              >
                <span className="text-lg text-[#D4AF37]">⚲</span>
                <div className="flex flex-col">
                  <span className="text-[8.5px] font-mono tracking-widest text-[#8C6D4F] uppercase">RESIDENCE & BASE</span>
                  <span className="text-xs font-mono text-[#E0D3C5]">63/8, Kamal Lane, Jaffna, Sri Lanka</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: 3D CYBERNETIC DISPATCH TERMINAL (7 COLS) ================= */}
          <div className="lg:col-span-7 perspective-[1200px]">
            <motion.div
              ref={rightCardRef}
              onMouseMove={handleRightMove}
              onMouseEnter={() => setIsRightHovered(true)}
              onMouseLeave={() => {
                setIsRightHovered(false);
                rightMouseX.set(0);
                rightMouseY.set(0);
              }}
              style={{ rotateX: rightRotateX, rotateY: rightRotateY, transformStyle: 'preserve-3d' }}
              className="h-full p-8 sm:p-10 rounded-xl border border-[#8C6D4F]/35 bg-[#090706]/95 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative overflow-hidden group hover:border-[#D4AF37] transition-colors duration-500 flex flex-col justify-between"
            >
              {/* Top Gold Horizon Edge */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

              {/* Corner L-Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />

              <div style={{ transform: 'translateZ(25px)' }}>
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-[#8C6D4F]/25 pb-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">DIRECT DISPATCH PORT</span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#17130E] border border-[#8C6D4F]/30 text-[#C4B5A5]">
                    ENCRYPTION: 256-BIT
                  </span>
                </div>

                {/* Quick Topic Preset Selectors */}
                <div className="mb-6">
                  <span className="block text-[9px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2.5">
                    // SELECT INQUIRY FREQUENCY
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handlePresetSelect(preset)}
                        className={`p-2 rounded-sm border text-[9.5px] font-mono transition-all text-center truncate ${
                          selectedPreset === preset.label
                            ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#FFF5EB] font-semibold shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                            : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#A8988B] hover:border-[#8C6D4F]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {sent ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] text-xl shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      ✓
                    </div>
                    <h3 className="text-4xl text-white font-normal uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      TRANSMISSION RECEIVED
                    </h3>
                    <p className="text-xs text-[#BDB0A4] font-light max-w-sm mx-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Thank you! Your message has been logged. I will respond to your channel as soon as possible.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase underline pt-4 block mx-auto hover:text-white"
                    >
                      SEND ANOTHER PACKET
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-1.5">
                          // SENDER NAME
                        </span>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name / Organization"
                          className="w-full bg-[#120F0C] border border-[#8C6D4F]/35 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-all focus:bg-[#1A140F]"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        />
                      </div>

                      <div>
                        <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-1.5">
                          // REPLY CHANNEL
                        </span>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Your Email Address"
                          className="w-full bg-[#120F0C] border border-[#8C6D4F]/35 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-all focus:bg-[#1A140F]"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        />
                      </div>
                    </div>

                    <div>
                      <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-1.5">
                        // DISPATCH PAYLOAD
                      </span>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your requirements, project scope, or opportunity..."
                        className="w-full bg-[#120F0C] border border-[#8C6D4F]/35 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 p-4 outline-none rounded-sm transition-all focus:bg-[#1A140F] resize-none"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 border border-[#8C6D4F] bg-[#17130F] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-xs font-semibold tracking-[0.28em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.15)] flex items-center justify-center space-x-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <span>EXECUTE DISPATCH</span>
                      <span>↗</span>
                    </motion.button>

                  </form>
                )}
              </div>
            </motion.div>
          </div>

        </div>

        {/* System Footer Bar */}
        <div className="pt-16 mt-16 border-t border-[#8C6D4F]/20 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-6">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <span 
              className="text-2xl text-[#D4AF37] font-normal"
              style={{ fontFamily: "'Herr Von Muellerhoff', cursive" }}
            >
              Riyal Rikas Mohammed
            </span>
            <span className="text-[10px] font-mono text-[#8C6D4F] uppercase tracking-wider">
              SOFTWARE ENGINEER • FULL STACK ARCHITECT
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] font-mono text-[#8C6D4F]">
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
            <span className="text-[#D4AF37]">|</span>
            <a href="#" className="hover:text-[#F7E7C4] transition-colors">
              BACK TO APEX ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default ContactSection;