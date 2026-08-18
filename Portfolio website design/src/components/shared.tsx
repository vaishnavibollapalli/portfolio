// Shared botanical components used across pages

export const C = {
  parchment: '#f7f2e8',
  parchmentDark: '#ede7d9',
  parchmentDeep: '#e4dccb',
  ink: '#2a2118',
  inkLight: '#6b5a48',
  inkFaint: '#9c8e7e',
  sage: '#4a7c59',
  sageDark: '#2e5438',
  sagePale: '#c8dbd0',
  sageFaint: '#e8f0eb',
  amber: '#c17f4a',
  amberPale: '#f0ddc4',
  lavender: '#7a5a8a',
  lavenderPale: '#ddd0e8',
  rose: '#b85c6e',
  rosePale: '#f0d4da',
  teal: '#4a8a80',
  gold: '#d4a843',
  border: '#d4c9b4',
  night: '#1a1408',
}

export function ButterflyTrail({ x, y }: { x: number; y: number }) {
  return (
    <div style={{ position: 'fixed', left: x - 18, top: y - 14, pointerEvents: 'none', zIndex: 9999, transition: 'left 0.08s ease, top 0.08s ease' }}>
      <svg width="36" height="28" viewBox="0 0 80 60">
        <g style={{ transformOrigin: '40px 30px', animation: 'wing-flap 0.35s ease-in-out infinite' }}>
          <path d="M40 30 Q15 5 5 15 Q10 35 40 30" fill={C.amber} opacity="0.9"/>
          <path d="M40 30 Q10 45 8 55 Q25 55 40 30" fill={C.amber} opacity="0.75"/>
          <circle cx="18" cy="18" r="5" fill="white" opacity="0.3"/>
        </g>
        <g style={{ transformOrigin: '40px 30px', animation: 'wing-flap 0.35s ease-in-out infinite', transform: 'scaleX(-1) translateX(-80px)' }}>
          <path d="M40 30 Q15 5 5 15 Q10 35 40 30" fill={C.amber} opacity="0.9"/>
          <path d="M40 30 Q10 45 8 55 Q25 55 40 30" fill={C.amber} opacity="0.75"/>
          <circle cx="18" cy="18" r="5" fill="white" opacity="0.3"/>
        </g>
        <ellipse cx="40" cy="30" rx="2.5" ry="12" fill={C.ink} opacity="0.6"/>
        <line x1="40" y1="18" x2="32" y2="8" stroke={C.ink} strokeWidth="1" opacity="0.5"/>
        <circle cx="32" cy="8" r="1.5" fill={C.ink} opacity="0.5"/>
        <line x1="40" y1="18" x2="48" y2="8" stroke={C.ink} strokeWidth="1" opacity="0.5"/>
        <circle cx="48" cy="8" r="1.5" fill={C.ink} opacity="0.5"/>
      </svg>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

export function FallingPetals() {
  const petals = useRef(Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 8 + Math.random() * 13,
    color: [C.rosePale, C.lavenderPale, C.amberPale, '#fff8f0', C.sagePale][Math.floor(Math.random() * 5)],
    delay: Math.random() * 14,
    dur: 10 + Math.random() * 12,
    type: i % 4,
  }))).current

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      {petals.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: '-5%',
          width: p.size, height: p.size * 1.3,
          background: p.color, borderRadius: '50% 0 50% 0',
          opacity: 0.65, animation: `petal-fall-${p.type} ${p.dur}s ease-in ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  )
}

const AMBIENT_BUTTERFLIES = [
  { color: C.amber,    size: 32, top: '20%', left: '6%',  path: 'bfly-a', dur: '18s', delay: '0s'   },
  { color: C.lavender, size: 24, top: '42%', left: '87%', path: 'bfly-b', dur: '22s', delay: '-7s'  },
  { color: C.rose,     size: 38, top: '68%', left: '4%',  path: 'bfly-c', dur: '26s', delay: '-11s' },
  { color: C.teal,     size: 20, top: '75%', left: '80%', path: 'bfly-a', dur: '20s', delay: '-4s'  },
  { color: C.gold,     size: 16, top: '12%', left: '60%', path: 'bfly-b', dur: '24s', delay: '-14s' },
]

export function AmbientButterflies() {
  return (
    <>
      {AMBIENT_BUTTERFLIES.map((b, i) => {
        const f = 0.28 + (i * 0.07)
        return (
          <div key={i} style={{ position: 'fixed', top: b.top, left: b.left, pointerEvents: 'none', zIndex: 8, animation: `${b.path} ${b.dur} ease-in-out ${b.delay} infinite` }}>
            <svg width={b.size} height={b.size * 0.75} viewBox="0 0 80 60">
              <g style={{ transformOrigin: '40px 30px', animation: `wing-flap ${f}s ease-in-out infinite` }}>
                <path d="M40 30 Q15 5 5 15 Q10 35 40 30" fill={b.color} opacity="0.85"/>
                <path d="M40 30 Q10 45 8 55 Q25 55 40 30" fill={b.color} opacity="0.7"/>
              </g>
              <g style={{ transformOrigin: '40px 30px', animation: `wing-flap ${f}s ease-in-out infinite`, transform: 'scaleX(-1) translateX(-80px)' }}>
                <path d="M40 30 Q15 5 5 15 Q10 35 40 30" fill={b.color} opacity="0.85"/>
                <path d="M40 30 Q10 45 8 55 Q25 55 40 30" fill={b.color} opacity="0.7"/>
              </g>
              <ellipse cx="40" cy="30" rx="2" ry="10" fill={C.ink} opacity="0.5"/>
            </svg>
          </div>
        )
      })}
    </>
  )
}

export function Fireflies({ count = 12 }: { count?: number }) {
  const flies = useRef(Array.from({ length: count }, (_, i) => ({
    id: i, x: 5 + Math.random() * 90, y: 10 + Math.random() * 80,
    dur: 3 + Math.random() * 5, delay: Math.random() * 6, size: 3 + Math.random() * 2.5,
  }))).current
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {flies.map(f => (
        <div key={f.id} style={{
          position: 'absolute', left: `${f.x}%`, top: `${f.y}%`,
          width: f.size, height: f.size, borderRadius: '50%',
          background: '#d4e84a',
          boxShadow: `0 0 ${f.size * 3}px ${f.size * 2}px rgba(200,220,60,0.35)`,
          animation: `firefly ${f.dur}s ease-in-out ${f.delay}s infinite`,
        }} />
      ))}
    </div>
  )
}

export function BotanicDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, maxWidth: 360, margin: '0 auto' }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.border})` }} />
      <svg viewBox="0 0 50 30" width="48" height="28">
        {[0,60,120,180,240,300].map((a,i) => (
          <ellipse key={i} cx="25" cy="14" rx="5" ry="9" fill={C.rose} opacity="0.6" transform={`rotate(${a} 25 14)`}/>
        ))}
        <circle cx="25" cy="14" r="5" fill={C.amber} opacity="0.85"/>
      </svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.border})` }} />
    </div>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 20, color: C.sage, margin: '0 0 10px', letterSpacing: '0.03em' }}>
      {children}
    </p>
  )
}

export function Vine({ side = 'left', height = 400 }: { side?: 'left' | 'right'; height?: number }) {
  return (
    <svg width="60" height={height} viewBox={`0 0 60 ${height}`} style={{ display: 'block', opacity: 0.3 }}>
      <path d={`M${side==='left'?10:50} 0 Q${side==='left'?40:20} ${height*0.25} ${side==='left'?15:45} ${height*0.5} Q${side==='left'?45:15} ${height*0.75} ${side==='left'?20:40} ${height}`} fill="none" stroke={C.sage} strokeWidth="2"/>
      {[0.15,0.32,0.49,0.66,0.82].map((t,i)=>{
        const y = height*t, x = side==='left'?(i%2===0?28:10):(i%2===0?32:50)
        return (
          <g key={i} style={{ animation: `sway ${2.5+i*0.3}s ease-in-out ${i*0.4}s infinite`, transformOrigin: `${x}px ${y}px` }}>
            <ellipse cx={x+(side==='left'?8:-8)} cy={y} rx="10" ry="6" fill={C.sage} opacity="0.65" transform={`rotate(${side==='left'?-30+i*10:30-i*10} ${x} ${y})`}/>
          </g>
        )
      })}
    </svg>
  )
}

export function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, vis } = useReveal()
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}
