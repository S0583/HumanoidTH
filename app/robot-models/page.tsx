'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Box, ArrowUpRight, Cpu, Globe, Layers, ShieldCheck } from 'lucide-react';

type ModelLink = {
  tag: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  hue: string; // สีประจำการ์ด (hex)
  wide?: boolean; // ให้การ์ดกว้าง 2 คอลัมน์บนจอใหญ่
};

const modelLinks: ModelLink[] = [
  {
    tag: 'CAD / URDF',
    title: 'Humanoid Model Alpha',
    description: 'ดาวน์โหลดไฟล์โมเดล 3 มิติ, แบบแปลนเครื่องกล และค่าพารามิเตอร์ข้อต่อหุ่นยนต์',
    href: 'https://claude.ai/artifact/WPptymdxzocBsUjUKqgXgT',
    icon: Box,
    hue: '#38bdf8',
    wide: true,
  },
  {
    tag: 'ROS2',
    title: 'ROS2 & Simulation Workspace',
    description: 'แพ็กเกจจำลองการเคลื่อนไหว สภาพแวดล้อมจำลองสำหรับทดสอบระบบนำทาง',
    href: 'https://claude.ai/artifact/9CTU7T4SSDjD2vaN8mE6Em',
    icon: Cpu,
    hue: '#a78bfa',
  },
  {
    tag: 'Specs',
    title: 'Kinematics & Dynamics Specs',
    description: 'เอกสารทางเทคนิค ขีดจำกัดองศาการเคลื่อนไหว (DOF) และกราฟแรงบิด',
    href: 'https://claude.ai/artifact/6o8UJCJ1rTjqaACGShdaYe',
    icon: Layers,
    hue: '#34d399',
  },
  {
    tag: 'Dataset',
    title: 'Thailand Humanoid Atlas Hub',
    description: 'คลังข้อมูลหลักและชุดข้อมูลงานวิจัยหุ่นยนต์บริการและสังคมแห่งประเทศไทย',
    href: 'https://claude.ai/artifact/MCbHBymzg2qwiButEF6wEw',
    icon: Globe,
    hue: '#f472b6',
    wide: true,
  },
  {
    tag: 'Safety',
    title: 'Safety & Emergency Protocols',
    description: 'หุ่นยนต์ฐานล้ออเนกประสงค์ เสถียรสูง ยืดหดหยิบสินค้าได้ทุกระดับเพื่อโลจิสติกส์',
    href: 'https://claude.ai/artifact/1F726gv57V589z1FAnHcN4',
    icon: ShieldCheck,
    hue: '#fbbf24',
  },
];

/** การ์ดที่มีแสงสปอตไลต์ตามเมาส์ */
function ModelCard({ item, delay }: { item: ModelLink; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = item.icon;

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      style={
        {
          '--hue': item.hue,
          '--mx': '50%',
          '--my': '0%',
          animationDelay: `${delay}ms`,
        } as React.CSSProperties
      }
      className={`rm-card rm-enter group relative isolate flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 outline-none backdrop-blur-sm transition-colors duration-300 hover:border-white/25 focus-visible:ring-2 focus-visible:ring-[var(--hue)] ${
        item.wide ? 'lg:col-span-2' : ''
      }`}
    >
      {/* สปอตไลต์ตามเมาส์ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx) var(--my), color-mix(in srgb, var(--hue) 22%, transparent), transparent 65%)',
        }}
      />
      {/* ลายตารางจางๆ ในการ์ด */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(var(--hue) 1px, transparent 1px), linear-gradient(90deg, var(--hue) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at top right, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top right, black, transparent 70%)',
        }}
      />

      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
          style={{
            color: item.hue,
            borderColor: `color-mix(in srgb, ${item.hue} 35%, transparent)`,
            background: `color-mix(in srgb, ${item.hue} 12%, transparent)`,
            boxShadow: `0 0 24px color-mix(in srgb, ${item.hue} 25%, transparent)`,
          }}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>

        <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.hue }} />
          {item.tag}
        </span>
      </div>

      <div className="mt-10 space-y-2">
        <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">{item.title}</h3>
        <p className="max-w-[46ch] text-sm leading-relaxed text-slate-400">{item.description}</p>
      </div>

      <div
        className="mt-6 flex items-center gap-1.5 text-sm font-medium"
        style={{ color: item.hue }}
      >
        เปิดดูข้อมูล
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export default function RobotModelsPage() {
  return (
    <div className="rm-root relative min-h-screen overflow-hidden bg-[#070b16] text-slate-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');

        .rm-root { font-family: 'IBM Plex Sans Thai', ui-sans-serif, system-ui, sans-serif; }
        .rm-display { font-family: 'Space Grotesk', 'IBM Plex Sans Thai', sans-serif; }

        /* ลายตาราง blueprint เลื่อนช้าๆ */
        .rm-grid {
          background-image:
            linear-gradient(rgba(56,189,248,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,.07) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%);
          animation: rm-pan 24s linear infinite;
        }
        @keyframes rm-pan { to { background-position: 56px 56px; } }

        /* เอฟเฟกต์เข้าฉากครั้งเดียวตอนโหลดหน้า */
        .rm-enter { opacity: 0; transform: translateY(18px); animation: rm-in .7s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes rm-in { to { opacity: 1; transform: none; } }

        /* เส้นสแกนวิ่งผ่านหัวข้อ */
        .rm-title {
          background: linear-gradient(100deg, #fff 30%, #7dd3fc 48%, #c4b5fd 52%, #fff 70%);
          background-size: 250% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: rm-sheen 5s ease-in-out 1.2s infinite;
        }
        @keyframes rm-sheen { 0%,100% { background-position: 100% 0; } 50% { background-position: 0% 0; } }

        @keyframes rm-pulse { 0% { box-shadow: 0 0 0 0 rgba(52,211,153,.6); } 100% { box-shadow: 0 0 0 10px rgba(52,211,153,0); } }

        @media (prefers-reduced-motion: reduce) {
          .rm-grid, .rm-title { animation: none; }
          .rm-enter { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* พื้นหลัง */}
      <div aria-hidden className="rm-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,.45), transparent)' }}
      />

      <main className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {/* Hero */}
        <header className="rm-enter mb-14 max-w-3xl space-y-6" style={{ animationDelay: '0ms' }}>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-sm text-emerald-300">
            <span
              className="h-2 w-2 rounded-full bg-emerald-400"
              style={{ animation: 'rm-pulse 1.8s ease-out infinite' }}
            />
            พร้อมใช้งาน {modelLinks.length} ชุดข้อมูล
          </div>

          <h1 className="rm-display rm-title text-5xl font-bold tracking-tight sm:text-7xl">
            Robot Models
          </h1>

          <p className="max-w-[56ch] text-base leading-relaxed text-slate-400 sm:text-lg">
            ศูนย์รวมโมเดล 3 มิติแบบโต้ตอบได้ ไฟล์ CAD และเอกสารสเปกทางเทคนิค
            สำหรับหุ่นยนต์ฮิวมานอยด์ ในที่เดียว
          </p>
        </header>

        {/* Bento grid */}
        <section
          aria-label="ลิงก์ข้อมูลหุ่นยนต์"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {modelLinks.map((item, i) => (
            <ModelCard key={item.href} item={item} delay={150 + i * 90} />
          ))}
        </section>
      </main>
    </div>
  );
}