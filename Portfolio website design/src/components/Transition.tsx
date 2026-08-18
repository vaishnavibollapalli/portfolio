import { createContext, useContext, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { C } from './shared'

// ─── Context ──────────────────────────────────────────────────────────────────
type GoFn = (path: string, x: number, y: number) => void
export const TransitionCtx = createContext<GoFn>(() => {})
export function useTransition() { return useContext(TransitionCtx) }

// ─── Static data (stable across renders) ─────────────────────────────────────
const BFLY_COUNT = 14
const BFLIES = Array.from({ length: BFLY_COUNT }, (_, i) => {
  const angle = (i / BFLY_COUNT) * Math.PI * 2
  const dist = 220 + (i % 3) * 100
  return {
    i,
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist,
    size: 28 + (i % 3) * 20,
    delay: i * 22,
    flapDur: 0.22 + (i % 4) * 0.08,
    color: [C.amber, '#f5e060', C.lavender, C.rose, '#8fd4a0', C.amberPale, C.lavenderPale, C.rosePale][i % 8],
  }
})

const FLOWERS = Array.from({ length: 9 }, (_, i) => ({
  x: [8, 25, 50, 75, 90, 15, 38, 62, 85][i],
  y: [20, 65, 15, 60, 25, 45, 80, 35, 70][i],
  size: 44 + (i % 3) * 36,
  delay: 60 + i * 55,
  petalColor: [C.rosePale, C.amberPale, C.lavenderPale, '#fff8d0', C.sagePale, C.rosePale, C.amberPale, C.lavenderPale, C.sagePale][i],
  centerColor: [C.amber, C.gold, C.rose, C.amber, C.gold][i % 5],
}))

const GOLDS = Array.from({ length: 8 }, (_, i) => ({
  x: 10 + (i * 12), y: 15 + (i % 3) * 25, size: 3 + (i % 2) * 2, delay: i * 80,
}))

// ─── Overlay ──────────────────────────────────────────────────────────────────
function Overlay({ phase, origin }: { phase: 'cover' | 'reveal'; origin: { x: number; y: number } }) {
  const isReveal = phase === 'reveal'

  return (
    <>
      {/* Main overlay panel */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'radial-gradient(ellipse at 40% 50%, #2e5438 0%, #152a1c 60%, #0d1a10 100%)',
        '--ox': `${origin.x}px`,
        '--oy': `${origin.y}px`,
        animation: isReveal
          ? 'trans-reveal 0.62s cubic-bezier(0.77, 0, 0.18, 1) both'
          : 'trans-cover 0.44s cubic-bezier(0.4, 0, 1, 1) both',
        willChange: 'clip-path',
      } as React.CSSProperties}>

        {/* Bokeh golden glows */}
        {GOLDS.map(g => (
          <div key={g.x} style={{
            position: 'absolute', left: `${g.x}%`, top: `${g.y}%`,
            width: g.size * 2, height: g.size * 2, borderRadius: '50%',
            background: 'rgba(255,215,60,0.55)',
            boxShadow: `0 0 ${g.size * 6}px ${g.size * 4}px rgba(255,200,40,0.2)`,
            animation: `glow-pulse ${1.2 + g.delay * 0.002}s ease-in-out ${g.delay * 0.001}s infinite`,
          }} />
        ))}

        {/* Flowers blooming across overlay */}
        {FLOWERS.map(f => (
          <div key={f.x} style={{
            position: 'absolute',
            left: `${f.x}%`, top: `${f.y}%`,
            transform: 'translate(-50%, -50%)',
            animation: `flower-bloom-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${f.delay}ms both`,
          }}>
            <svg viewBox="0 0 60 60" width={f.size} height={f.size}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a, j) => (
                <ellipse key={j} cx="30" cy="30" rx="8" ry="16"
                  fill={f.petalColor} opacity="0.75"
                  transform={`rotate(${a} 30 30)`}/>
              ))}
              <circle cx="30" cy="30" r="9" fill={f.centerColor} opacity="0.95"/>
              <circle cx="30" cy="30" r="5" fill="rgba(255,255,255,0.5)" opacity="0.7"/>
            </svg>
          </div>
        ))}

        {/* Butterflies flying out from origin */}
        {BFLIES.map(b => (
          <div key={b.i} style={{
            position: 'absolute',
            left: origin.x, top: origin.y,
            animation: `bfly-scatter-${b.i % 4} 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${b.delay}ms both`,
            '--tx': `${b.tx}px`,
            '--ty': `${b.ty}px`,
          } as React.CSSProperties}>
            <svg width={b.size} height={b.size * 0.75} viewBox="0 0 80 60" style={{ display: 'block', marginLeft: -b.size / 2, marginTop: -b.size * 0.375 }}>
              <g style={{ transformOrigin: '40px 30px', animation: `wing-flap ${b.flapDur}s ease-in-out infinite` }}>
                <path d="M40 30 Q14 5 4 15 Q9 36 40 30" fill={b.color} opacity="0.92"/>
                <path d="M40 30 Q9 46 7 56 Q23 56 40 30" fill={b.color} opacity="0.75"/>
                <ellipse cx="17" cy="19" rx="7" ry="4" fill="rgba(255,255,255,0.3)"/>
              </g>
              <g style={{ transformOrigin: '40px 30px', animation: `wing-flap ${b.flapDur}s ease-in-out infinite`, transform: 'scaleX(-1) translateX(-80px)' }}>
                <path d="M40 30 Q14 5 4 15 Q9 36 40 30" fill={b.color} opacity="0.92"/>
                <path d="M40 30 Q9 46 7 56 Q23 56 40 30" fill={b.color} opacity="0.75"/>
              </g>
              <ellipse cx="40" cy="30" rx="2.5" ry="11" fill="rgba(30,20,5,0.5)"/>
              <line x1="40" y1="19" x2="32" y2="9" stroke="rgba(30,20,5,0.4)" strokeWidth="1"/>
              <circle cx="32" cy="9" r="1.5" fill="rgba(30,20,5,0.4)"/>
              <line x1="40" y1="19" x2="48" y2="9" stroke="rgba(30,20,5,0.4)" strokeWidth="1"/>
              <circle cx="48" cy="9" r="1.5" fill="rgba(30,20,5,0.4)"/>
            </svg>
          </div>
        ))}

        {/* Falling petals within overlay */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${5 + i * 8}%`, top: '-3%',
            width: 9 + (i % 3) * 5, height: (9 + (i % 3) * 5) * 1.3,
            borderRadius: '50% 0 50% 0',
            background: [C.rosePale, C.lavenderPale, C.amberPale, C.sagePale, 'rgba(255,255,220,0.8)'][i % 5],
            opacity: 0.65,
            transform: `rotate(${i * 30}deg)`,
            animation: `petal-drift ${0.8 + i * 0.12}s ease-in ${i * 60 + 100}ms both`,
          }} />
        ))}

        {/* Center botanical mark */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', animation: 'center-bloom 0.4s cubic-bezier(0.34,1.56,0.64,1) 180ms both' }}>
          <svg viewBox="0 0 100 100" width="100" height="100">
            {[0,40,80,120,160,200,240,280,320].map((a,j)=>(
              <ellipse key={j} cx="50" cy="50" rx="10" ry="22" fill="rgba(255,255,255,0.18)" transform={`rotate(${a} 50 50)`}/>
            ))}
            <circle cx="50" cy="50" r="14" fill="rgba(255,255,255,0.25)"/>
            <circle cx="50" cy="50" r="7" fill="rgba(255,215,60,0.6)"/>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes trans-cover {
          from { clip-path: circle(0px at var(--ox) var(--oy)); }
          to   { clip-path: circle(200vmax at var(--ox) var(--oy)); }
        }
        @keyframes trans-reveal {
          from { clip-path: circle(200vmax at 50% 50%); }
          to   { clip-path: circle(0px at 50% 50%); }
        }
        @keyframes wing-flap { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.3)} }
        @keyframes flower-bloom-in {
          from { opacity:0; transform:translate(-50%,-50%) scale(0) rotate(-60deg); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1) rotate(0deg); }
        }
        @keyframes center-bloom {
          from { opacity:0; transform:translate(-50%,-50%) scale(0); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }
        @keyframes glow-pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes bfly-scatter-0 { from{opacity:0;transform:translate(0,0) scale(0.2)} 30%{opacity:1} to{opacity:0.85;transform:translate(var(--tx) , var(--ty)) scale(1)} }
        @keyframes bfly-scatter-1 { from{opacity:0;transform:translate(0,0) scale(0.2) rotate(-20deg)} 30%{opacity:1} to{opacity:0.85;transform:translate(var(--tx),var(--ty)) scale(1) rotate(10deg)} }
        @keyframes bfly-scatter-2 { from{opacity:0;transform:translate(0,0) scale(0.2) rotate(15deg)} 30%{opacity:1} to{opacity:0.85;transform:translate(var(--tx),var(--ty)) scale(1) rotate(-8deg)} }
        @keyframes bfly-scatter-3 { from{opacity:0;transform:translate(0,0) scale(0.2) scaleX(-1)} 30%{opacity:1} to{opacity:0.85;transform:translate(var(--tx),var(--ty)) scale(1) scaleX(-1)} }
        @keyframes petal-drift { from{opacity:0;transform:translateY(0) rotate(0deg)} 15%{opacity:0.7} to{opacity:0;transform:translateY(110vh) translateX(40px) rotate(360deg)} }
      `}</style>
    </>
  )
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle')
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const pending = useRef('')
  const t1 = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const t2 = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const go = useCallback((path: string, x: number, y: number) => {
    clearTimeout(t1.current); clearTimeout(t2.current)
    pending.current = path
    setOrigin({ x, y })
    setPhase('cover')
    t1.current = setTimeout(() => { navigate(pending.current); setPhase('reveal') }, 460)
    t2.current = setTimeout(() => setPhase('idle'), 1120)
  }, [navigate])

  return (
    <TransitionCtx.Provider value={go}>
      {children}
      {phase !== 'idle' && <Overlay phase={phase} origin={origin} />}
    </TransitionCtx.Provider>
  )
}
