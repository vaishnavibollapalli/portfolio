import { Outlet, useLocation } from 'react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import { C, FallingPetals, AmbientButterflies } from './shared'
import { useTransition } from './Transition'

// ── Cursor petal trail ────────────────────────────────────────────────────────
type TrailPetal = { id: number; x: number; y: number; color: string; rot: number; size: number }
let trailId = 0

function CursorTrail() {
  const [petals, setPetals] = useState<TrailPetal[]>([])
  const COLORS = [C.rosePale, C.lavenderPale, C.amberPale, C.sagePale, '#fff0f4', C.amberPale]

  useEffect(() => {
    let last = 0
    const handler = (e: MouseEvent) => {
      const now = Date.now()
      if (now - last < 60) return  // throttle
      last = now
      const petal: TrailPetal = {
        id: trailId++,
        x: e.clientX, y: e.clientY,
        color: COLORS[trailId % COLORS.length],
        rot: Math.random() * 360,
        size: 7 + Math.random() * 8,
      }
      setPetals(prev => [...prev.slice(-14), petal])
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}>
      {petals.map((p, i) => (
        <div key={p.id} style={{
          position: 'absolute',
          left: p.x - p.size / 2, top: p.y - p.size / 2,
          width: p.size, height: p.size * 1.3,
          borderRadius: '50% 0 50% 0',
          background: p.color,
          transform: `rotate(${p.rot}deg)`,
          opacity: 0.7,
          animation: `trail-fade 0.7s ease forwards`,
          animationDelay: `${(petals.length - i) * 0.02}s`,
        }} />
      ))}
    </div>
  )
}

// ── Custom cursor ─────────────────────────────────────────────────────────────
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseleave', leave) }
  }, [])
  if (!visible) return null
  return (
    <div style={{
      position: 'fixed', left: pos.x - 16, top: pos.y - 12,
      pointerEvents: 'none', zIndex: 9999,
      transition: 'left 0.06s ease, top 0.06s ease',
    }}>
      <svg width="32" height="24" viewBox="0 0 80 60">
        <g style={{ transformOrigin: '40px 30px', animation: 'wing-flap 0.38s ease-in-out infinite' }}>
          <path d="M40 30 Q16 6 5 16 Q10 36 40 30" fill={C.amber} opacity="0.88"/>
          <path d="M40 30 Q10 46 8 56 Q24 55 40 30" fill={C.amber} opacity="0.72"/>
          <ellipse cx="19" cy="20" rx="6" ry="4" fill="white" opacity="0.28"/>
        </g>
        <g style={{ transformOrigin: '40px 30px', animation: 'wing-flap 0.38s ease-in-out infinite', transform: 'scaleX(-1) translateX(-80px)' }}>
          <path d="M40 30 Q16 6 5 16 Q10 36 40 30" fill={C.amber} opacity="0.88"/>
          <path d="M40 30 Q10 46 8 56 Q24 55 40 30" fill={C.amber} opacity="0.72"/>
        </g>
        <ellipse cx="40" cy="30" rx="2.2" ry="11" fill={C.ink} opacity="0.55"/>
        <line x1="40" y1="19" x2="32" y2="9" stroke={C.ink} strokeWidth="1" opacity="0.45"/>
        <circle cx="32" cy="9" r="1.5" fill={C.ink} opacity="0.45"/>
        <line x1="40" y1="19" x2="48" y2="9" stroke={C.ink} strokeWidth="1" opacity="0.45"/>
        <circle cx="48" cy="9" r="1.5" fill={C.ink} opacity="0.45"/>
      </svg>
    </div>
  )
}

const NAV_ITEMS = [
  { path: '/home',     label: 'Garden',   icon: '🌿', desc: 'Welcome'    },
  { path: '/about',    label: 'About',    icon: '🦋', desc: 'My story'   },
  { path: '/research', label: 'Research', icon: '🔬', desc: 'My studies' },
  { path: '/projects', label: 'Projects', icon: '🌸', desc: 'My work'    },
  { path: '/skills',   label: 'Skills',   icon: '🌱', desc: 'My craft'   },
  { path: '/contact',  label: 'Contact',  icon: '✉️',  desc: 'Say hello'  },
]

export default function Layout() {
  const go = useTransition()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.parchment, cursor: 'none' }}>
      <Cursor />
      <CursorTrail />
      <FallingPetals />
      <AmbientButterflies />

      {/* ── Sidebar ── */}
      <aside style={{
        width: collapsed ? 68 : 218,
        flexShrink: 0, position: 'fixed',
        top: 0, bottom: 0, left: 0, zIndex: 50,
        background: `linear-gradient(175deg, ${C.sageDark} 0%, #1e3d28 60%, #152a1c 100%)`,
        transition: 'width 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        overflow: 'hidden',
        boxShadow: '4px 0 40px rgba(20,40,20,0.25)',
      }}>
        {/* Botanical texture overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 15% 85%, rgba(74,124,89,0.25) 0%, transparent 55%), radial-gradient(circle at 85% 15%, rgba(46,84,56,0.3) 0%, transparent 45%)`, pointerEvents: 'none' }} />
        {/* Side vine accents */}
        <div style={{ position: 'absolute', right: 0, top: 80, bottom: 80, width: 2, background: 'linear-gradient(to bottom, transparent, rgba(200,219,208,0.12), transparent)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ padding: collapsed ? '26px 0' : '26px 22px', display: 'flex', alignItems: 'center', gap: 10, justifyContent: collapsed ? 'center' : 'flex-start', position: 'relative' }}>
          <svg width="26" height="20" viewBox="0 0 80 60" style={{ flexShrink: 0 }}>
            <g style={{ transformOrigin: '40px 30px', animation: 'wing-flap 0.5s ease-in-out infinite' }}>
              <path d="M40 30 Q15 5 5 15 Q10 35 40 30" fill="rgba(255,255,255,0.82)"/>
              <path d="M40 30 Q10 45 8 55 Q25 55 40 30" fill="rgba(255,255,255,0.62)"/>
            </g>
            <g style={{ transformOrigin: '40px 30px', animation: 'wing-flap 0.5s ease-in-out infinite', transform: 'scaleX(-1) translateX(-80px)' }}>
              <path d="M40 30 Q15 5 5 15 Q10 35 40 30" fill="rgba(255,255,255,0.82)"/>
              <path d="M40 30 Q10 45 8 55 Q25 55 40 30" fill="rgba(255,255,255,0.62)"/>
            </g>
            <ellipse cx="40" cy="30" rx="2" ry="10" fill="rgba(255,255,255,0.45)"/>
          </svg>
          {!collapsed && <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: 21, color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap' }}>Vishnavi</span>}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 14px 12px' }} />

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, padding: '0 8px', position: 'relative' }}>
          {NAV_ITEMS.map(({ path, label, icon, desc }) => {
            const isActive = location.pathname === path
            return (
              <button
                key={path}
                onClick={e => go(path, e.clientX, e.clientY)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: collapsed ? '13px 0' : '11px 14px',
                  borderRadius: 10, border: 'none',
                  background: isActive ? 'rgba(255,255,255,0.13)' : 'transparent',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  transition: 'background 0.2s, padding-left 0.2s',
                  cursor: 'pointer', position: 'relative', width: '100%',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.paddingLeft = collapsed ? '0' : '20px'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isActive ? 'rgba(255,255,255,0.13)' : 'transparent'
                  e.currentTarget.style.paddingLeft = collapsed ? '0' : '11px'
                }}
              >
                {isActive && <div style={{ position: 'absolute', left: 0, top: '18%', bottom: '18%', width: 3, background: C.amberPale, borderRadius: '0 2px 2px 0' }} />}
                <span style={{ fontSize: 17, flexShrink: 0 }}>{icon}</span>
                {!collapsed && (
                  <div>
                    <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: isActive ? 'white' : 'rgba(255,255,255,0.68)', fontWeight: isActive ? 500 : 400, lineHeight: 1.2 }}>{label}</div>
                    <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{desc}</div>
                  </div>
                )}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '14px 8px', position: 'relative' }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 10 }} />
          <button onClick={() => setCollapsed(c => !c)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '10px 0' : '10px 14px', borderRadius: 10, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.42)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Lora', serif", fontSize: 12, justifyContent: collapsed ? 'center' : 'flex-start', width: '100%' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.42)' }}
          >
            <span style={{ display: 'inline-block', transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', fontSize: 14 }}>◂</span>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, marginLeft: collapsed ? 68 : 218, transition: 'margin-left 0.35s cubic-bezier(0.25,0.46,0.45,0.94)', minHeight: '100vh', position: 'relative' }}>
        <div key={location.pathname} style={{ animation: 'page-enter 0.55s cubic-bezier(0.25,0.46,0.45,0.94) both' }}>
          <Outlet />
        </div>
      </main>

      <style>{`
        @keyframes wing-flap  { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.35)} }
        @keyframes sway       { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes trail-fade { 0%{opacity:0.7;transform:rotate(var(--r,0deg)) scale(1)} 100%{opacity:0;transform:rotate(calc(var(--r,0deg) + 40deg)) translateY(18px) scale(0.5)} }
        @keyframes page-enter { from{opacity:0;transform:translateY(18px) scale(0.99)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes bfly-a { 0%{transform:translate(0,0) scaleX(1)} 25%{transform:translate(90px,-50px) scaleX(1)} 50%{transform:translate(160px,10px) scaleX(-1)} 75%{transform:translate(80px,40px) scaleX(-1)} 100%{transform:translate(0,0) scaleX(1)} }
        @keyframes bfly-b { 0%{transform:translate(0,0) scaleX(1)} 30%{transform:translate(-70px,-60px) scaleX(1)} 60%{transform:translate(-130px,15px) scaleX(-1)} 100%{transform:translate(0,0) scaleX(1)} }
        @keyframes bfly-c { 0%{transform:translate(0,0) scaleX(1)} 20%{transform:translate(50px,-35px) scaleX(1)} 50%{transform:translate(110px,-60px) scaleX(-1)} 80%{transform:translate(50px,25px) scaleX(-1)} 100%{transform:translate(0,0) scaleX(1)} }
        @keyframes firefly { 0%,100%{opacity:0;transform:translate(0,0)} 20%{opacity:0.9} 50%{opacity:0.3;transform:translate(28px,-18px)} 80%{opacity:0.8;transform:translate(-12px,8px)} }
        @keyframes petal-fall-0 { 0%{opacity:0;transform:translateY(0) translateX(0) rotate(0deg)} 8%{opacity:0.65} 100%{opacity:0;transform:translateY(110vh) translateX(60px) rotate(360deg)} }
        @keyframes petal-fall-1 { 0%{opacity:0;transform:translateY(0)} 8%{opacity:0.6} 40%{transform:translateY(44vh) translateX(-40px) rotate(180deg)} 100%{opacity:0;transform:translateY(110vh) translateX(30px) rotate(400deg)} }
        @keyframes petal-fall-2 { 0%{opacity:0;transform:translateY(0)} 8%{opacity:0.65} 30%{transform:translateY(33vh) translateX(50px) rotate(120deg)} 60%{transform:translateY(66vh) translateX(-20px) rotate(280deg)} 100%{opacity:0;transform:translateY(110vh) translateX(40px) rotate(450deg)} }
        @keyframes petal-fall-3 { 0%{opacity:0;transform:translateY(0)} 8%{opacity:0.6} 50%{transform:translateY(55vh) translateX(-60px) rotate(200deg)} 100%{opacity:0;transform:translateY(110vh) translateX(20px) rotate(380deg)} }
      `}</style>
    </div>
  )
}
