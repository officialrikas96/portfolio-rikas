import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  visualType: 'analytics' | 'iot' | 'bakery' | 'pos' | 'uiux';
}

const projects: Project[] = [
  {
    number: '01',
    title: 'Sampath Food City Data Analysis System',
    category: 'DATA ANALYTICS / PYTHON SCRIPTING',
    description:
      'Python-driven data analytics and statistical reporting system developed for retail intelligence. Designed to process customer purchasing patterns, inventory velocity, and store sales trends to produce automated visual reports and data insights.',
    githubUrl: 'https://www.linkedin.com/in/mohammed-rikas-2424a93ab',
    tech: [
      'Python',
      'Data Analysis',
      'Pandas',
      'Scripting',
      'Data Visualization',
      'Business Intelligence',
    ],
    metrics: [
      { label: 'ENGINE', value: 'Python Data Scripting' },
      { label: 'DOMAIN', value: 'Retail Sales Analytics' },
      { label: 'DELIVERY', value: 'Automated Reporting' },
    ],
    visualType: 'analytics',
  },
  {
    number: '02',
    title: 'IoT Based Smart Lab & Campus System',
    category: 'IOT / EMBEDDED AUTOMATION (GROUP PROJECT)',
    description:
      'Multi-sensor intelligent facility ecosystem featuring smart parking slot monitoring, smoke detection alert broadcasting, soil moisture-controlled automated gardening, and automated emergency exit routing.',
    githubUrl: 'https://www.linkedin.com/in/mohammed-rikas-2424a93ab',
    tech: [
      'IoT Sensors',
      'Embedded Logic',
      'Smart Automation',
      'Safety Triggers',
      'Hardware Integration',
    ],
    metrics: [
      { label: 'MONITORING', value: 'Smart Parking & Garden' },
      { label: 'ALERT SYSTEM', value: 'Smoke & Emergency Exit' },
      { label: 'TEAM ROLE', value: 'Collaborative Group Project' },
    ],
    visualType: 'iot',
  },
  {
    number: '03',
    title: 'Artisan Bakery Web Platform',
    category: 'FULL STACK / DATABASE CONNECTED WEB APP',
    description:
      'Dynamic, responsive web application engineered for bakery ordering with full relational database connectivity. Features interactive catalog navigation, user cart state management, and real-time order record storage in MySQL.',
    githubUrl: 'https://www.linkedin.com/in/mohammed-rikas-2424a93ab',
    tech: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'PHP',
      'MySQL',
      'Responsive Web',
      'Database CRUD',
    ],
    metrics: [
      { label: 'STACK', value: 'PHP & Modern JavaScript' },
      { label: 'PERSISTENCE', value: 'Relational MySQL' },
      { label: 'DESIGN', value: 'Responsive & Interactive' },
    ],
    visualType: 'bakery',
  },
  {
    number: '04',
    title: 'Electronic Store Billing & POS System',
    category: 'ENTERPRISE / DESKTOP APPLICATION (JAVA)',
    description:
      'Enterprise inventory control and point-of-sale (POS) billing application built in Java. Built upon strict Object Oriented Programming (OOP) principles to handle product transactions, automated invoice math, and stock records.',
    githubUrl: 'https://www.linkedin.com/in/mohammed-rikas-2424a93ab',
    tech: [
      'Java (OOP)',
      'Desktop UI',
      'SQL Database',
      'POS Engine',
      'Invoice Generation',
      'Stock Ledger',
    ],
    metrics: [
      { label: 'ARCHITECTURE', value: 'Pure OOP Principles' },
      { label: 'ENGINE', value: 'Java POS & Billing' },
      { label: 'DATA INTEGRITY', value: 'Structured Storage' },
    ],
    visualType: 'pos',
  },
  {
    number: '05',
    title: 'Sampath Food City Digital Store Mockup',
    category: 'UI/UX DESIGN & WEB PROTOTYPING',
    description:
      'High-fidelity digital storefront prototype and modern UI/UX design mockup for Sampath Food City. Created with deep attention to user experience ergonomics, seamless navigation hierarchy, and user-centric checkout journeys.',
    githubUrl: 'https://www.linkedin.com/in/mohammed-rikas-2424a93ab',
    tech: [
      'UI/UX Design',
      'Wireframing',
      'User Flows',
      'Graphic Design',
      'Prototyping',
      'Web Ergonomics',
    ],
    metrics: [
      { label: 'USER EXPERIENCE', value: 'Intuitive Navigation' },
      { label: 'DESIGN ASSETS', value: 'Custom Mockups' },
      { label: 'FIDELITY', value: 'High Fidelity Web Mock' },
    ],
    visualType: 'uiux',
  },
];

// Interactive 3D Visual HUD for Project Types
const ProjectVisualHUD: React.FC<{ type: Project['visualType'] }> = ({ type }) => {
  if (type === 'analytics') {
    return (
      <div className="w-full h-full bg-[#080705] border border-[#8C6D4F]/30 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden group/hud">
        {/* Ambient Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8C6D4F0a_1px,transparent_1px),linear-gradient(to_bottom,#8C6D4F0a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        {/* HUD Top Bar */}
        <div className="flex items-center justify-between z-10 border-b border-[#8C6D4F]/20 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">PYTHON DATA ENGINE</span>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#17130E] border border-[#8C6D4F]/30 text-[#E0D3C5]">
            LIVE METRICS
          </span>
        </div>

        {/* 3D Animated Chart Bars */}
        <div className="grid grid-cols-6 gap-2 items-end h-28 my-3 z-10 px-2">
          {[
            { height: '48%', label: 'MON', val: '$12k' },
            { height: '75%', label: 'TUE', val: '$19k' },
            { height: '92%', label: 'WED', val: '$24k' },
            { height: '64%', label: 'THU', val: '$16k' },
            { height: '88%', label: 'FRI', val: '$22k' },
            { height: '100%', label: 'SAT', val: '$29k' },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center h-full justify-end group/bar">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: bar.height }}
                transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                className="w-full bg-gradient-to-t from-[#8C6D4F]/40 via-[#D4AF37]/70 to-[#F7E7C4] rounded-t-sm relative group-hover/bar:brightness-125 transition-all shadow-[0_0_12px_rgba(212,175,55,0.25)]"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-[8px] font-mono text-[#F7E7C4] whitespace-nowrap bg-black px-1 rounded border border-[#8C6D4F]/40">
                  {bar.val}
                </div>
              </motion.div>
              <span className="text-[8px] font-mono text-[#8C6D4F] mt-1.5">{bar.label}</span>
            </div>
          ))}
        </div>

        {/* HUD Foot Indicators */}
        <div className="grid grid-cols-3 gap-2 z-10 border-t border-[#8C6D4F]/20 pt-2.5">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-[#8C6D4F]">PROCESSED</span>
            <span className="text-[11px] font-mono text-[#F7E7C4] font-semibold">14,850 ROWS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-[#8C6D4F]">ACCURACY</span>
            <span className="text-[11px] font-mono text-[#D4AF37] font-semibold">99.8%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-[#8C6D4F]">LATENCY</span>
            <span className="text-[11px] font-mono text-[#F7E7C4] font-semibold">14ms</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'iot') {
    return (
      <div className="w-full h-full bg-[#070908] border border-[#3E6B4F]/40 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden group/hud">
        {/* Radar Background circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#408C5D]/15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#408C5D]/20 pointer-events-none" />
        
        {/* HUD Top Bar */}
        <div className="flex items-center justify-between z-10 border-b border-[#3E6B4F]/30 pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#4ADE80] uppercase">SMART LAB SENSORS</span>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0A160F] border border-[#3E6B4F]/40 text-[#A7F3D0]">
            ACTIVE TELEMETRY
          </span>
        </div>

        {/* 4 Sensor Interactive Grid */}
        <div className="grid grid-cols-2 gap-2.5 my-3 z-10">
          <div className="p-2.5 rounded bg-[#0D1A12]/80 border border-[#3E6B4F]/30 flex flex-col hover:border-[#4ADE80] transition-colors">
            <span className="text-[8.5px] font-mono text-[#6EE7B7]">🅿️ SMART PARKING</span>
            <span className="text-xs font-mono font-bold text-white mt-1">SLOT 4: FREE</span>
            <span className="text-[8px] font-mono text-[#4ADE80]">Ultrasonic Armed</span>
          </div>
          <div className="p-2.5 rounded bg-[#0D1A12]/80 border border-[#3E6B4F]/30 flex flex-col hover:border-[#F87171] transition-colors">
            <span className="text-[8.5px] font-mono text-[#FCA5A5]">🚨 SMOKE DETECT</span>
            <span className="text-xs font-mono font-bold text-white mt-1">0.01% - NORMAL</span>
            <span className="text-[8px] font-mono text-[#F87171]">MQ-2 Monitored</span>
          </div>
          <div className="p-2.5 rounded bg-[#0D1A12]/80 border border-[#3E6B4F]/30 flex flex-col hover:border-[#60A5FA] transition-colors">
            <span className="text-[8.5px] font-mono text-[#93C5FD]">🌱 SMART GARDEN</span>
            <span className="text-xs font-mono font-bold text-white mt-1">MOISTURE: 72%</span>
            <span className="text-[8px] font-mono text-[#60A5FA]">Auto Irrigation</span>
          </div>
          <div className="p-2.5 rounded bg-[#0D1A12]/80 border border-[#3E6B4F]/30 flex flex-col hover:border-[#FBBF24] transition-colors">
            <span className="text-[8.5px] font-mono text-[#FDE68A]">🚪 EMERGENCY EXIT</span>
            <span className="text-xs font-mono font-bold text-white mt-1">ROUTE CLEAR</span>
            <span className="text-[8px] font-mono text-[#FBBF24]">Fail-Safe Open</span>
          </div>
        </div>

        {/* HUD Foot status */}
        <div className="flex items-center justify-between z-10 border-t border-[#3E6B4F]/30 pt-2">
          <span className="text-[9px] font-mono text-[#6EE7B7]">HARDWARE: ARDUINO / ESP32</span>
          <span className="text-[9px] font-mono text-[#4ADE80]">PULSE: 100% OK</span>
        </div>
      </div>
    );
  }

  if (type === 'bakery') {
    return (
      <div className="w-full h-full bg-[#0B0907] border border-[#8C6D4F]/35 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden group/hud">
        {/* Top Browser Header */}
        <div className="flex items-center justify-between z-10 border-b border-[#8C6D4F]/25 pb-2.5">
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
          </div>
          <span className="text-[9.5px] font-mono text-[#A8988B] bg-[#16120E] px-3 py-0.5 rounded border border-[#8C6D4F]/25">
            https://artisan-bakery.local
          </span>
          <span className="text-[9px] font-mono text-[#D4AF37]">PHP + MySQL</span>
        </div>

        {/* Mock Store Catalog Showcase */}
        <div className="grid grid-cols-3 gap-2 my-3 z-10">
          {[
            { name: 'Sourdough Bread', price: 'Rs. 450', tag: 'Fresh', icon: '🍞' },
            { name: 'Chocolate Tart', price: 'Rs. 620', tag: 'Best Seller', icon: '🥐' },
            { name: 'Artisan Pastry', price: 'Rs. 380', tag: 'Popular', icon: '🍰' },
          ].map((item, i) => (
            <div key={i} className="p-2.5 rounded bg-[#16120E] border border-[#8C6D4F]/30 flex flex-col items-center text-center hover:border-[#D4AF37] transition-all hover:scale-105">
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-[9.5px] font-medium text-white truncate w-full">{item.name}</span>
              <span className="text-[9px] font-mono text-[#D4AF37] font-semibold mt-0.5">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Database Query Pipeline Stream */}
        <div className="z-10 border-t border-[#8C6D4F]/25 pt-2 flex items-center justify-between bg-[#120F0C] p-2 rounded border border-[#8C6D4F]/20">
          <span className="text-[9px] font-mono text-[#C4B5A5] truncate">
            &gt; SQL: INSERT INTO orders (cart_id, total) VALUES (204, 1450)
          </span>
          <span className="text-[8.5px] font-mono text-[#4ADE80] font-bold shrink-0 ml-2">✓ COMMITTED</span>
        </div>
      </div>
    );
  }

  if (type === 'pos') {
    return (
      <div className="w-full h-full bg-[#08080A] border border-[#506385]/40 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden group/hud">
        {/* Terminal Header */}
        <div className="flex items-center justify-between z-10 border-b border-[#506385]/30 pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#93C5FD] uppercase">JAVA OOP POS TERMINAL</span>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0F172A] border border-[#506385]/40 text-[#BFDBFE]">
            JDK 21 RUNTIME
          </span>
        </div>

        {/* POS Bill Receipt Simulator */}
        <div className="my-2.5 p-3 rounded bg-[#030712] border border-[#506385]/30 font-mono text-[9px] space-y-1 z-10">
          <div className="flex justify-between text-[#94A3B8] border-b border-[#334155] pb-1">
            <span>ITEM DESC</span>
            <span>QTY</span>
            <span>AMT (LKR)</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Logitech MX Master 3S</span>
            <span>1</span>
            <span>34,500</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Samsung 27" 4K Monitor</span>
            <span>1</span>
            <span>89,000</span>
          </div>
          <div className="flex justify-between text-[#60A5FA] font-bold border-t border-[#334155] pt-1">
            <span>NET TOTAL:</span>
            <span>--</span>
            <span>123,500.00</span>
          </div>
        </div>

        {/* Java OOP Architecture Tag */}
        <div className="flex items-center justify-between z-10 border-t border-[#506385]/30 pt-2">
          <span className="text-[9px] font-mono text-[#94A3B8]">CLASS: BillingService.generateInvoice()</span>
          <span className="text-[9px] font-mono text-[#60A5FA] font-bold">SQL SYNCED</span>
        </div>
      </div>
    );
  }

  // UI/UX Mockup Visualizer
  return (
    <div className="w-full h-full bg-[#0A070D] border border-[#8B5CF6]/30 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden group/hud">
      {/* Top Design Tokens */}
      <div className="flex items-center justify-between z-10 border-b border-[#8B5CF6]/20 pb-2.5">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#C084FC] animate-ping" />
          <span className="text-[10px] font-mono tracking-widest text-[#D8B4FE] uppercase">FIGMA / UI-UX WIREFRAME</span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1E122C] border border-[#8B5CF6]/30 text-[#E9D5FF]">
          HIGH-FIDELITY PROTOTYPE
        </span>
      </div>

      {/* Isometric Layer Preview */}
      <div className="grid grid-cols-2 gap-3 my-3 z-10">
        <div className="p-3 rounded bg-[#170E24] border border-[#8B5CF6]/40 flex flex-col space-y-1.5 hover:border-[#C084FC] transition-all hover:scale-105">
          <div className="w-full h-2 rounded bg-[#C084FC]/30" />
          <div className="w-3/4 h-2 rounded bg-[#8B5CF6]/20" />
          <div className="grid grid-cols-2 gap-1 pt-1">
            <div className="h-7 rounded bg-[#2D1A45] border border-[#8B5CF6]/30" />
            <div className="h-7 rounded bg-[#2D1A45] border border-[#8B5CF6]/30" />
          </div>
          <span className="text-[8.5px] font-mono text-[#D8B4FE]">📱 Mobile Commerce View</span>
        </div>
        <div className="p-3 rounded bg-[#170E24] border border-[#8B5CF6]/40 flex flex-col space-y-1.5 hover:border-[#C084FC] transition-all hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-2 rounded bg-[#C084FC]/40" />
            <div className="w-1/4 h-2 rounded bg-[#8B5CF6]/30" />
          </div>
          <div className="w-full h-10 rounded bg-[#2D1A45] border border-[#8B5CF6]/30 flex items-center justify-center text-[9px] font-mono text-[#E9D5FF]">
            Hero Banner Layout
          </div>
          <span className="text-[8.5px] font-mono text-[#D8B4FE]">💻 Desktop Storefront</span>
        </div>
      </div>

      {/* Palette Tokens */}
      <div className="flex items-center justify-between z-10 border-t border-[#8B5CF6]/20 pt-2">
        <div className="flex items-center space-x-1.5">
          <span className="text-[8.5px] font-mono text-[#A855F7]">PALETTE:</span>
          <div className="w-3 h-3 rounded-full bg-[#D4AF37]" title="Gold" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]" title="Emerald" />
          <div className="w-3 h-3 rounded-full bg-[#0F172A]" title="Dark Obsidian" />
        </div>
        <span className="text-[8.5px] font-mono text-[#C084FC]">100% USER-CENTRIC</span>
      </div>
    </div>
  );
};

// 3D Card with Tilt Physics and Cursor Glare
const ProjectCard3D: React.FC<{ project: Project }> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareX = useMotionValue(250);
  const glareY = useMotionValue(250);

  // 3D Spring Tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 260 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 260 });

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle 350px at ${x}px ${y}px, rgba(212,175,55,0.18), transparent 70%)`
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
      className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A]/95 p-8 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.98)] group transition-colors duration-500 hover:border-[#D4AF37] perspective-[1200px]"
    >
      {/* Dynamic Cursor 3D Glare */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: glareBackground,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Laser Tracer Perimeter */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: isHovered ? ['-100%', '200%'] : '-100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent skew-x-12"
        />
      </div>

      {/* Top Gold Horizon Edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

      {/* 3D Elevated Corner L-Brackets */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]/70 group-hover:border-[#D4AF37] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]/70 group-hover:border-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37]/70 group-hover:border-[#D4AF37] group-hover:-translate-x-0.5 group-hover:translate-y-0.5 transition-all shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37]/70 group-hover:border-[#D4AF37] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all shadow-[0_0_8px_rgba(212,175,55,0.4)]" />

      {/* Big Background Watermark Number */}
      <span
        className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {project.number}
      </span>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column (6.5 Cols) with 3D Depth */}
        <div className="lg:col-span-6 flex flex-col justify-between" style={{ transform: 'translateZ(30px)' }}>
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-bold text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                {project.number} //
              </span>
              <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#C4B5A5]">
                {project.category}
              </span>
            </div>

            <h3
              className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-4 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.92] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {project.title}
            </h3>

            <p
              className="text-xs sm:text-sm font-light text-[#BDB0A4] leading-[1.85] tracking-wide mb-6 max-w-xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#8C6D4F]/25 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/60 group-hover:text-white transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action CTA */}
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center justify-center space-x-3 px-6 py-3 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] w-fit"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>VIEW PROJECT DETAILS</span>
            <span className="text-xs">↗</span>
          </motion.a>
        </div>

        {/* Right Column: 3D Visual HUD Simulator (5.5 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4 lg:pl-4" style={{ transform: 'translateZ(45px)' }}>
          
          {/* Interactive Visual Simulator Box */}
          <div className="w-full min-h-[260px] rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.85)] transform transition-transform duration-500 group-hover:scale-[1.02]">
            <ProjectVisualHUD type={project.visualType} />
          </div>

          {/* Compact Architecture Metrics Row */}
          <div className="grid grid-cols-3 gap-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-2.5 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex flex-col justify-center text-center group-hover:border-[#D4AF37]/30 transition-colors"
              >
                <span className="text-[8.5px] font-mono text-[#8C6D4F] truncate">
                  {m.label}
                </span>
                <span className="text-[10px] font-mono font-medium text-[#F7E7C4] truncate mt-0.5">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-20 pb-32 px-6 sm:px-12 lg:px-20"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

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
            02 / FEATURED WORK
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
              SELECTED WORKS.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              ENGINEERED IN 3D.
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-sm mt-4 md:mt-0 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Hover and move your cursor across the cards to experience real-time 3D tilt physics and live simulated system telemetry.
          </p>
        </motion.div>

        {/* React Bits Stacking Deck */}
        <ScrollStack
          itemDistance={24}
          itemScale={0.035}
          itemStackDistance={30}
          stackPosition="15%"
          scaleEndPosition="6%"
          baseScale={0.88}
          useWindowScroll={true}
        >
          {projects.map((project) => (
            <ScrollStackItem key={project.title}>
              <ProjectCard3D project={project} />
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
};

export default ProjectsSection;