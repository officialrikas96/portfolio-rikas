import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

interface JourneyItem {
  id: string;
  period: string;
  category: string;
  title: string;
  organization: string;
  badge: string;
  description: string;
  tags: string[];
  icon: string;
}

const journeyData: JourneyItem[] = [
  {
    id: '01',
    period: '2024 – PRESENT',
    category: 'PRACTICAL EXPERIENCE',
    title: 'FULL STACK WEB & SOFTWARE DEVELOPER',
    organization: 'INDEPENDENT & ACADEMIC ENGINEERING',
    badge: 'CORE EXPERTISE',
    icon: '⚡',
    description:
      'Designing and developing end-to-end full-stack web applications and desktop solutions. Implementing modern responsive UI architectures with JavaScript, HTML5, CSS3, dynamic PHP backends, MySQL relational database management, and robust REST APIs.',
    tags: ['React', 'JavaScript', 'PHP', 'MySQL', 'Full Stack', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: '02',
    period: 'MAY 2024 – JAN 2026',
    category: 'HIGHER EDUCATION',
    title: 'HND IN SOFTWARE ENGINEERING',
    organization: 'BCAS CAMPUS JAFFNA',
    badge: 'HND DIPLOMA',
    icon: '🎓',
    description:
      'Rigorous software engineering curriculum emphasizing Object Oriented Programming (OOP) principles in Java, Python scripting, full stack system architectures, relational database management (SQL), and enterprise software lifecycles.',
    tags: ['Java (OOP)', 'Python', 'Full Stack Web', 'MySQL Database', 'System Design', 'Software Engineering'],
  },
  {
    id: '03',
    period: 'JAN 2026 (ONGOING)',
    category: 'SPECIALIZATION',
    title: 'DIPLOMA IN IT, PYTHON & GRAPHIC DESIGN',
    organization: 'DMI COMPUTER EDUCATION',
    badge: 'CERTIFICATION',
    icon: '🎨',
    description:
      'Advanced specialized practical training in Python programming, modern JavaScript frameworks, and professional Graphic & Interface Design ergonomics.',
    tags: ['Python', 'JavaScript', 'UI/UX Design', 'Visual Graphics', 'Scripting'],
  },
  {
    id: '04',
    period: '2024 – 2025',
    category: 'EMBEDDED & HARDWARE',
    title: 'IoT & SMART LAB AUTOMATION PROJECT',
    organization: 'BCAS CAMPUS INNOVATION LAB',
    badge: 'GROUP PROJECT',
    icon: '🛰️',
    description:
      'Engineered an intelligent facility ecosystem featuring smart parking slot monitoring, smoke detection alert broadcasting, soil moisture-controlled automated gardening, and automated emergency exit routing.',
    tags: ['IoT Systems', 'Embedded Logic', 'Sensors', 'Automation', 'Hardware Integration'],
  },
  {
    id: '05',
    period: '2023',
    category: 'SECONDARY EDUCATION',
    title: 'G.C.E. ADVANCED LEVEL (ENGINEERING TECH)',
    organization: 'JAFFNA CENTRAL COLLEGE',
    badge: 'E-TECH STREAM',
    icon: '🏛️',
    description:
      'Successfully completed Advanced Level in Engineering Technology: Science for Technology (S), Engineering Technology (S), and Information & Communication Technology - ICT (C).',
    tags: ['Engineering Tech', 'Science for Tech', 'ICT', 'Analytical Skills'],
  },
  {
    id: '06',
    period: 'ACADEMIC REFERENCE',
    category: 'RECOMMENDATION',
    title: 'ACADEMIC & PROFESSIONAL ENDORSEMENT',
    organization: 'BCAS CAMPUS - JAFFNA',
    badge: 'VERIFIED',
    icon: '⭐',
    description:
      'Endorsed by Ms. Arathy Arasaratnam, Coordinator & Lecturer of Computing Department at BCAS Campus Jaffna. Contact: +94 76 540 4023 | Email: arathy@bcas.lk.',
    tags: ['Ms. Arathy Arasaratnam', 'Computing Coordinator', 'BCAS Campus Jaffna'],
  },
];

// 3D Tilt Card Component for Each Milestone
const Journey3DCard: React.FC<{ item: JourneyItem; index: number }> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareX = useMotionValue(200);
  const glareY = useMotionValue(200);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 280 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 280 });

  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle 300px at ${x}px ${y}px, rgba(212,175,55,0.18), transparent 75%)`
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.08 }}
      className="relative flex flex-col md:flex-row items-start group perspective-[1200px]"
    >
      {/* Desktop Year on Left */}
      <div className="hidden md:flex flex-col items-end w-[160px] shrink-0 pr-8 pt-2">
        <span className="text-[10.5px] font-mono tracking-[0.22em] text-[#D4AF37] group-hover:text-[#FFF5EB] transition-colors font-medium">
          {item.period}
        </span>
        <span className="text-[8.5px] font-mono tracking-widest text-[#8C6D4F] uppercase mt-0.5">
          {item.category}
        </span>
      </div>

      {/* 3D Glowing Timeline Node */}
      <div className="absolute left-[19px] md:left-[160px] top-3 -translate-x-1/2 flex items-center justify-center z-20">
        {/* Pulsing Aura */}
        <div className="absolute w-8 h-8 rounded-full bg-[#D4AF37]/15 blur-sm group-hover:scale-150 group-hover:bg-[#D4AF37]/30 transition-all duration-500" />
        <div className="w-5 h-5 rounded-full bg-[#0E0C0A] border-2 border-[#8C6D4F] group-hover:border-[#D4AF37] flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(212,175,55,0.4)]">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
        </div>
      </div>

      {/* 3D Interactive Card Container */}
      <div className="ml-12 md:ml-12 w-full">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative p-6 sm:p-8 rounded-xl border border-[#8C6D4F]/35 bg-[#0E0C0A]/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] group-hover:border-[#D4AF37] transition-all duration-500 overflow-hidden"
        >
          {/* Dynamic 3D Glare */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
            style={{
              background: glareBg,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Laser Border Shimmer */}
          <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: isHovered ? ['-100%', '200%'] : '-100%' }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent skew-x-12"
            />
          </div>

          {/* Top Gold Horizon Edge */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

          {/* Corner L-Brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />

          {/* Mobile Year Badge */}
          <div className="md:hidden flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">
              {item.period}
            </span>
            <span className="text-[8.5px] font-mono tracking-widest text-[#8C6D4F] uppercase">
              {item.category}
            </span>
          </div>

          {/* Card Header with 3D Depth */}
          <div className="flex items-start justify-between gap-4 mb-2" style={{ transform: 'translateZ(25px)' }}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl p-2 rounded-lg bg-[#17130F] border border-[#8C6D4F]/30 shadow-inner group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <div>
                <h3
                  className="text-2xl sm:text-3xl tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {item.title}
                </h3>
                <span
                  className="block text-[11px] font-medium tracking-[0.2em] uppercase text-[#D4AF37] mt-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.organization}
                </span>
              </div>
            </div>

            {/* Badge */}
            <span className="hidden sm:inline-block text-[9px] font-mono px-2.5 py-1 rounded bg-[#17130E] border border-[#8C6D4F]/40 text-[#E0D3C5] shrink-0">
              {item.badge}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-xs sm:text-[13.5px] font-light text-[#BDB0A4] leading-[1.8] tracking-wide my-4 max-w-2xl group-hover:text-[#E8DFD8] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif", transform: 'translateZ(20px)' }}
          >
            {item.description}
          </p>

          {/* Interactive Tag Chips with 3D Pop */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-[#8C6D4F]/20" style={{ transform: 'translateZ(30px)' }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[9.5px] font-mono uppercase rounded-sm border border-[#8C6D4F]/30 bg-[#14100C] text-[#C4B5A5] group-hover:border-[#D4AF37]/50 group-hover:text-white transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.5)] hover:scale-105"
              >
                {tag}
              </span>
            ))}
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-16 pb-32 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[38rem] h-[38rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
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
            04 / EDUCATION & JOURNEY
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
              EDUCATION &amp;
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              DEV MILESTONES.
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-sm mt-4 md:mt-0 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            A progressive chronicle of software engineering education, full-stack development, and IoT hardware projects.
          </p>
        </motion.div>

        {/* 3D Timeline Route Map */}
        <div className="relative w-full">
          
          {/* Static Background Conduit */}
          <div className="absolute left-[19px] md:left-[160px] top-4 bottom-8 w-[2px] bg-[#8C6D4F]/20 rounded-full" />
          
          {/* Animated Gold Laser Conduit */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] md:left-[160px] top-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#F7E7C4] to-[#8C6D4F] shadow-[0_0_12px_#D4AF37] origin-top rounded-full"
          />

          {/* Timeline Cards Stack */}
          <div className="space-y-10">
            {journeyData.map((item, idx) => (
              <Journey3DCard key={item.id} item={item} index={idx} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;