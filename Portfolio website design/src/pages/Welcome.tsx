import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import archImg from '../imports/image-2.png'
import { C } from '../components/shared'

// ── Butterfly cursor ──────────────────────────────────────────────────────────
function WelcomeCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const mv = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVis(true) }
    const lv = () => setVis(false)
    window.addEventListener('mousemove', mv)
    window.addEventListener('mouseleave', lv)
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseleave', lv) }
  }, [])
  if (!vis) return null
  return (
    <div style={{ position: 'fixed', left: pos.x - 16, top: pos.y - 12, pointerEvents: 'none', zIndex: 9999, transition: 'left 0.07s linear, top 0.07s linear' }}>
      <svg width="32" height="24" viewBox="0 0 80 60">
        <g style={{ transformOrigin: '40px 30px', animation: 'wing-flap 0.42s ease-in-out infinite' }}>
          <path d="M40 30 Q16 6 5 16 Q10 36 40 30" fill={C.amber} opacity="0.9"/>
          <path d="M40 30 Q10 46 8 56 Q24 55 40 30" fill={C.amber} opacity="0.72"/>
          <ellipse cx="18" cy="20" rx="6" ry="4" fill="white" opacity="0.22"/>
        </g>
        <g style={{ transformOrigin: '40px 30px', animation: 'wing-flap 0.42s ease-in-out infinite', transform: 'scaleX(-1) translateX(-80px)' }}>
          <path d="M40 30 Q16 6 5 16 Q10 36 40 30" fill={C.amber} opacity="0.9"/>
          <path d="M40 30 Q10 46 8 56 Q24 55 40 30" fill={C.amber} opacity="0.72"/>
        </g>
        <ellipse cx="40" cy="30" rx="2.2" ry="11" fill="rgba(18,8,2,0.75)"/>
        <line x1="40" y1="20" x2="32" y2="10" stroke="rgba(18,8,2,0.55)" strokeWidth="1"/>
        <circle cx="32" cy="10" r="1.5" fill="rgba(18,8,2,0.55)"/>
        <line x1="40" y1="20" x2="48" y2="10" stroke="rgba(18,8,2,0.55)" strokeWidth="1"/>
        <circle cx="48" cy="10" r="1.5" fill="rgba(18,8,2,0.55)"/>
      </svg>
    </div>
  )
}

const POLLEN = Array.from({ length: 12 }, (_, i) => ({
  id: i, x: 10 + Math.random() * 80, y: 5 + Math.random() * 80,
  size: 1.5 + Math.random() * 2, dur: 16 + Math.random() * 22,
  delay: Math.random() * 18, op: 0.08 + Math.random() * 0.22,
}))
const FLIES = Array.from({ length: 8 }, (_, i) => ({
  id: i, x: 15 + Math.random() * 70, y: 8 + Math.random() * 70,
  dur: 3 + Math.random() * 5, delay: Math.random() * 14, size: 1.4 + Math.random() * 1.5,
}))
const WORDS = ['Bollapalli', 'Vishnavi', 'Abhishikta']

export default function Welcome() {
  const navigate  = useNavigate()
  const [mouse, setMouse]     = useState({ x: 0.5, y: 0.5 })
  const [wordIdx, setWordIdx] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [btnHov, setBtnHov]   = useState(false)

  useEffect(() => {
    const ts = WORDS.map((_, i) => setTimeout(() => setWordIdx(i + 1), 420 + i * 350))
    return () => ts.forEach(clearTimeout)
  }, [])

  const onMove = useCallback((e: MouseEvent) => {
    setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }, [])
  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [onMove])

  function handleEnter() {
    if (leaving) return
    setLeaving(true)
    setTimeout(() => { localStorage.setItem('garden_entered', '1'); navigate('/home') }, 900)
  }

  const dx = mouse.x - 0.5, dy = mouse.y - 0.5

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', cursor: 'none', background: '#2a3428' }}>
      <WelcomeCursor />

      {/* Arch garden photo — full screen, no transforms to keep it crisp */}
      <img
        src={archImg}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />

      {/* Top-to-mid gradient — darkens the sky so name text reads cleanly */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(18,24,16,0.72) 0%, rgba(18,24,16,0.3) 35%, transparent 58%)',
        pointerEvents: 'none',
      }}/>

      {/* Soft edge vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 85% at 50% 46%, transparent 32%, rgba(8,14,8,0.52) 100%)',
        pointerEvents: 'none',
      }}/>

      {/* Pollen motes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {POLLEN.map(p => (
          <div key={`pollen-${p.id}`} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: '50%',
            background: 'rgba(255,215,60,0.92)',
            boxShadow: `0 0 ${p.size * 3}px rgba(255,200,30,0.5)`,
            opacity: p.op,
            animation: `pollen-rise ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}/>
        ))}
      </div>

      {/* Fireflies */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {FLIES.map(f => (
          <div key={`fly-${f.id}`} style={{
            position: 'absolute', left: `${f.x}%`, top: `${f.y}%`,
            width: f.size, height: f.size, borderRadius: '50%',
            background: '#d4f055',
            boxShadow: `0 0 ${f.size * 5}px ${f.size * 3}px rgba(185,232,40,0.2)`,
            animation: `fly-glow ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}/>
        ))}
      </div>

      {/* Falling petals */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={`petal-${i}`} style={{
          position: 'absolute',
          left: `${10 + i * 11}%`, top: '-5%',
          width: 7 + (i % 3) * 3,
          height: (7 + (i % 3) * 3) * 1.35,
          borderRadius: '50% 0 50% 0',
          background: ['#f8d4e8','#e8d4f4','#f4dfc4','#d4e8d8','#f4e4f0','#fce8d0','#e0f0e4','#f8dce8'][i],
          opacity: 0.5,
          transform: `rotate(${i * 44}deg)`,
          animation: `petal-fall ${11 + i * 1.8}s ease-in ${i * 1.6}s infinite`,
          pointerEvents: 'none',
        }}/>
      ))}

      {/* ── Name — upper center, above the arch crown ── */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '40%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 20,
        transform: `translate(${dx * -4}px, ${dy * -2.5}px)`,
        transition: 'transform 0.28s ease',
        pointerEvents: 'none',
        opacity: leaving ? 0 : 1,
      }}>
        <p style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(13px,1.3vw,18px)',
          color: 'rgba(220,242,220,0.65)',
          margin: '0 0 clamp(6px,1.2vh,14px)',
          letterSpacing: '0.14em',
          textShadow: '0 1px 14px rgba(0,0,0,0.85)',
          animation: 'fade-up 1s ease 0.15s both',
        }}>
          ~ a portfolio garden ~
        </p>

        {WORDS.map((word, i) => (
          <div key={word} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: i === 1
              ? 'clamp(38px,6vw,82px)'
              : 'clamp(16px,2.5vw,36px)',
            fontWeight: i === 1 ? 700 : 300,
            fontStyle: i === 2 ? 'italic' : 'normal',
            color: i === 1 ? '#ffffff' : 'rgba(225,245,228,0.86)',
            lineHeight: i === 1 ? 1.0 : 1.2,
            letterSpacing: i === 1 ? '-0.03em' : '0.02em',
            textShadow: i === 1
              ? '0 2px 32px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.4)'
              : '0 1px 18px rgba(0,0,0,0.9)',
            opacity: wordIdx > i ? 1 : 0,
            transform: wordIdx > i ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}>{word}</div>
        ))}
      </div>

      {/* ── Enter button — centered over the arch opening ── */}
      <div style={{
        position: 'fixed',
        left: '50%',
        top: '63%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        opacity: wordIdx >= 3 && !leaving ? 1 : 0,
        transition: 'opacity 1s ease 0.9s',
        pointerEvents: wordIdx >= 3 && !leaving ? 'auto' : 'none',
      }}>
        <button
          onClick={handleEnter}
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(14px,1.3vw,18px)',
            letterSpacing: '0.09em',
            color: '#ffffff',
            background: btnHov
              ? 'rgba(255,255,255,0.2)'
              : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.48)',
            borderRadius: 40,
            padding: 'clamp(10px,1.4vh,16px) clamp(30px,4vw,56px)',
            cursor: 'pointer',
            backdropFilter: 'blur(14px)',
            boxShadow: btnHov
              ? '0 0 48px rgba(255,255,255,0.12), 0 6px 28px rgba(0,0,0,0.5)'
              : '0 2px 18px rgba(0,0,0,0.4)',
            transform: btnHov ? 'translateY(-3px) scale(1.04)' : 'scale(1)',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}
        >
          Enter the garden →
        </button>
      </div>

      {/* Leave transition */}
      <div style={{
        position: 'fixed', inset: 0,
        background: C.sageDark,
        opacity: leaving ? 1 : 0,
        transition: leaving ? 'opacity 0.85s ease' : 'none',
        zIndex: 100, pointerEvents: 'none',
      }}/>

      <style>{`
        @keyframes pollen-rise {
          0%   { opacity: 0; transform: translateY(0) }
          10%  { opacity: 1 }
          70%  { opacity: 0.35; transform: translateY(-72px) translateX(14px) }
          100% { opacity: 0;   transform: translateY(-140px) translateX(22px) }
        }
        @keyframes fly-glow {
          0%,100% { opacity: 0 }
          25%     { opacity: 0.82 }
          55%     { opacity: 0.08; transform: translate(20px,-14px) }
          80%     { opacity: 0.72; transform: translate(-8px,8px) }
        }
        @keyframes petal-fall {
          0%   { opacity: 0; transform: translateY(0) rotate(0deg) }
          8%   { opacity: 0.5 }
          100% { opacity: 0; transform: translateY(110vh) translateX(50px) rotate(360deg) }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(12px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes wing-flap {
          0%,100% { transform: scaleY(1) }
          50%     { transform: scaleY(0.28) }
        }
      `}</style>
    </div>
  )
}
