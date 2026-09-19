import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SkillPillar {
  title: string;
  badge: string;
  categoryCode: string;
  stat: string;
  icon: string;
  description: string;
  colSpan: string;
  accentColor: string;
  metrics: { label: string; value: string }[];
  items: { name: string; level: string; isCore?: boolean }[];
}

const bentoCategories: SkillPillar[] = [
  {
    title: 'FRONTEND & UI ARCHITECTURE',
    badge: 'CLIENT SYSTEMS',
    categoryCode: 'SYS_01 // FRONTEND',
    stat: '100% RESPONSIVE',
    icon: '⚡',
    accentColor: '#D4AF37',
    colSpan: 'lg:col-span-7',
    description:
      'Architecting fluid, high-performance web applications with modern component structures, responsive ergonomics, cross-browser consistency, and intuitive user experiences.',
    metrics: [
      { label: 'RENDER PERFORMANCE', value: '60 FPS UI' },
      { label: 'DESIGN FIDELITY', value: 'Pixel-Perfect' },
      { label: 'ERGONOMICS', value: 'Mobile First' },
    ],
    items: [
      { name: 'JavaScript (ES6+)', level: '95%', isCore: true },
      { name: 'HTML5 & Semantics', level: '98%', isCore: true },
      { name: 'CSS3 & Keyframes', level: '94%', isCore: true },
      { name: 'React.js', level: '88%', isCore: true },
      { name: 'Tailwind CSS', level: '92%', isCore: true },
      { name: 'Bootstrap', level: '90%' },
      { name: 'Figma UI/UX', level: '85%' },
      { name: 'Responsive Layouts', level: '96%', isCore: true },
    ],
  },
  {
    title: 'BACKEND & OOP SYSTEMS',
    badge: 'SOLID ARCHITECTURE',
    categoryCode: 'SYS_02 // BACKEND',
    stat: 'CLEAN CODE',
    icon: '⚙️',
    accentColor: '#60A5FA',
    colSpan: 'lg:col-span-5',
    description:
      'Applying strict Object Oriented Programming (OOP) principles to engineer structured, maintainable backend logic, modular architectures, and secure RESTful services.',
    metrics: [
      { label: 'PARADIGM', value: 'Pure OOP' },
      { label: 'API STANDARD', value: 'RESTful JSON' },
    ],
    items: [
      { name: 'Java (OOP)', level: '90%', isCore: true },
      { name: 'Python', level: '92%', isCore: true },
      { name: 'PHP', level: '86%', isCore: true },
      { name: 'REST APIs', level: '89%', isCore: true },
      { name: 'Modular Architecture', level: '88%' },
      { name: 'Design Patterns', level: '85%' },
    ],
  },
  {
    title: 'DATA MODELING & PERSISTENCE',
    badge: 'RELATIONAL INTEGRITY',
    categoryCode: 'SYS_03 // DATABASE',
    stat: 'STRUCTURED SQL',
    icon: '🗄️',
    accentColor: '#34D399',
    colSpan: 'lg:col-span-5',
    description:
      'Designing optimized relational data schemas, executing complex SQL queries, indexing for fast access, and establishing reliable database connectivity.',
    metrics: [
      { label: 'ISOLATION', value: 'ACID Compliant' },
      { label: 'SCHEMA DESIGN', value: '3NF Normalization' },
    ],
    items: [
      { name: 'MySQL', level: '92%', isCore: true },
      { name: 'SQL Query Tuning', level: '88%', isCore: true },
      { name: 'Schema Design', level: '90%', isCore: true },
      { name: 'CRUD Pipelines', level: '95%' },
      { name: 'Data Security', level: '87%' },
    ],
  },
  {
    title: 'DATA ANALYTICS, IOT & AI',
    badge: 'INTELLIGENT SOLUTIONS',
    categoryCode: 'SYS_04 // INTELLIGENCE',
    stat: 'INNOVATION DRIVEN',
    icon: '🛰️',
    accentColor: '#C084FC',
    colSpan: 'lg:col-span-7',
    description:
      'Harnessing Python for commercial retail analytics and statistical modeling, deploying multi-sensor IoT automation ecosystems, and exploring modern AI integrations.',
    metrics: [
      { label: 'DATA PIPELINE', value: 'Pandas Scripting' },
      { label: 'TELEMETRY', value: 'Real-Time IoT' },
      { label: 'VISUAL BRANDING', value: 'Graphic Design' },
    ],
    items: [
      { name: 'Python Data Analysis', level: '90%', isCore: true },
      { name: 'Pandas & Scripting', level: '88%', isCore: true },
      { name: 'IoT Sensor Networks', level: '86%', isCore: true },
      { name: 'Smart Automation', level: '88%' },
      { name: 'Graphic Design', level: '85%' },
      { name: 'Critical Problem Solving', level: '94%', isCore: true },
    ],
  },
];

// 3D Tilt Card Component for Each Skill Pillar
const SkillPillarCard: React.FC<{ pillar: SkillPillar; index: number }> = ({ pillar, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareX = useMotionValue(250);
  const glareY = useMotionValue(250);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 260 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 260 });

  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle 350px at ${x}px ${y}px, rgba(212,175,55,0.16), transparent 75%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    glareX.set(e.clientX - rect.left);
    glareY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`${pillar.colSpan} relative p-7 sm:p-9 rounded-xl border border-[#8C6D4F]/35 bg-[#0D0B09]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500 hover:border-[#D4AF37] group perspective-[1200px] flex flex-col justify-between`}
    >
      {/* Dynamic 3D Glare */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{
          background: glareBg,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Laser Border Tracer */}
      <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: isHovered ? ['-100%', '200%'] : '-100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent skew-x-12"
        />
      </div>

      {/* Top Gold Horizon Edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      {/* Corner Minimal Pins */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />

      {/* Card Header with 3D Pop */}
      <div style={{ transform: 'translateZ(30px)' }}>
        {/* Meta Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl p-1.5 rounded bg-[#17130F] border border-[#8C6D4F]/30 shadow-inner group-hover:scale-110 transition-transform">
              {pillar.icon}
            </span>
            <div className="flex flex-col">
              <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
                {pillar.badge}
              </span>
              <span className="text-[8px] font-mono tracking-widest text-[#8C6D4F]">
                {pillar.categoryCode}
              </span>
            </div>
          </div>

          <span className="text-[9px] font-mono px-2.5 py-1 rounded bg-[#17130F] border border-[#8C6D4F]/40 text-[#E0D3C5] shadow-[0_0_10px_rgba(212,175,55,0.1)] group-hover:border-[#D4AF37]/60 transition-all">
            {pillar.stat}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-3xl sm:text-4xl font-normal tracking-wide text-white mb-3 group-hover:text-[#F7E7C4] transition-colors leading-[0.92]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {pillar.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs sm:text-[13px] text-[#A8988B] font-light leading-relaxed mb-6 group-hover:text-[#D5CBC0] transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {pillar.description}
        </p>

        {/* Mini Architecture Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 p-3 rounded-lg bg-[#070605] border border-[#8C6D4F]/20">
          {pillar.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="text-[7.5px] font-mono tracking-wider text-[#8C6D4F] uppercase">{metric.label}</span>
              <span className="text-[10px] font-mono text-[#F7E7C4] font-medium">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 3D Skill Tag Chips & Proficiency Badges */}
      <div className="pt-4 border-t border-[#8C6D4F]/25" style={{ transform: 'translateZ(35px)' }}>
        <div className="flex flex-wrap gap-2">
          {pillar.items.map((skill) => (
            <div
              key={skill.name}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-sm border ${
                skill.isCore
                  ? 'border-[#8C6D4F]/50 bg-[#16120E] text-[#FFF5EB] shadow-[0_2px_8px_rgba(212,175,55,0.08)]'
                  : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#B8A798]'
              } group-hover:border-[#D4AF37]/50 group-hover:bg-[#1A140F] transition-all duration-300 hover:scale-105 hover:border-[#D4AF37] cursor-default`}
            >
              <span className="text-[10px] font-mono tracking-wider uppercase font-medium">
                {skill.name}
              </span>
              <span className="text-[8.5px] font-mono text-[#D4AF37] opacity-80">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-16 pb-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[38rem] h-[38rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[32rem] h-[32rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-5"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            03 / TECH MATRIX
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              ARCHITECTURAL MASTERY.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              PRECISION MATRIX.
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-sm mt-4 md:mt-0 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            A multi-dimensional view of full-stack engineering, OOP paradigms, relational database architectures, and IoT integrations.
          </p>
        </motion.div>

        {/* 3D Holographic Bento Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {bentoCategories.map((pillar, idx) => (
            <SkillPillarCard key={pillar.title} pillar={pillar} index={idx} />
          ))}
        </div>

        {/* Bottom Architectural Standard Telemetry Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 p-5 rounded-xl border border-[#8C6D4F]/30 bg-[#0A0806]/80 backdrop-blur-lg flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-[#E0D3C5] uppercase">
              DEV PHILOSOPHY: SCALABLE • MAINTAINABLE • OBJECT-ORIENTED
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] font-mono text-[#A8988B]">
            <span>FRONTEND: 60FPS UI</span>
            <span className="text-[#8C6D4F]">|</span>
            <span>BACKEND: MODULAR OOP</span>
            <span className="text-[#8C6D4F]">|</span>
            <span>DATABASE: ACID SQL</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsSection;