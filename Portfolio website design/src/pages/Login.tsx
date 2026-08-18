import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router'
import gardenImg from '../imports/image.png'
import { C } from '../components/shared'

// ── Pollen dust motes ─────────────────────────────────────────────────────────
const MOTES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: 20 + Math.random() * 70,
  size: 2 + Math.random() * 3.5,
  dur: 12 + Math.random() * 20,
  delay: Math.random() * 15,
  opacity: 0.25 + Math.random() * 0.45,
  drift: -30 + Math.random() * 60,
}))

// ── Firefly ───────────────────────────────────────────────────────────────────
const FLIES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 20 + Math.random() * 60,
  y: 15 + Math.random() * 45,
  dur: 3 + Math.random() * 4,
  delay: Math.random() * 8,
  size: 3 + Math.random() * 2,
}))

// ── Ornate iron gate SVG half ────────────────────────────────────────────────
function GateHalf({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left'
  return (
    <svg
      viewBox="0 0 120 280"
      width="120"
      height="280"
      style={{ display: 'block' }}
    >
      {/* Horizontal rails */}
      <rect x="4" y="30"  width="112" height="9" rx="4" fill="#2a1f0e" opacity="0.92"/>
      <rect x="4" y="120" width="112" height="9" rx="4" fill="#2a1f0e" opacity="0.92"/>
      <rect x="4" y="210" width="112" height="9" rx="4" fill="#2a1f0e" opacity="0.92"/>
      <rect x="4" y="268" width="112" height="6" rx="3" fill="#2a1f0e" opacity="0.85"/>

      {/* Vertical bars */}
      {[14, 30, 46, 62, 78, 94, 110].map((x, i) => (
        <g key={i}>
          {/* Arrowhead top */}
          <polygon
            points={`${x},2 ${x - 6},18 ${x + 6},18`}
            fill="#3a2a10"
            opacity="0.9"
          />
          {/* Bar body */}
          <rect x={x - 4} y="16" width="8" height="254" rx="3" fill="#2a1f0e" opacity="0.88"/>
          {/* Decorative curl at mid */}
          {i % 2 === (isLeft ? 0 : 1) && (
            <circle cx={x} cy="165" r="7" fill="none" stroke="#4a3518" strokeWidth="3" opacity="0.6"/>
          )}
        </g>
      ))}

      {/* Hinge side post */}
      <rect x={isLeft ? 0 : 112} y="0" width="8" height="280" rx="2" fill="#1a1008" opacity="0.95"/>

      {/* Shimmer overlay */}
      <rect x="0" y="0" width="120" height="280" rx="2"
        fill={`url(#gate-shimmer-${side})`} opacity="0.12"/>
      <defs>
        <linearGradient id={`gate-shimmer-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={isLeft ? '#fff' : 'transparent'}/>
          <stop offset="100%" stopColor={isLeft ? 'transparent' : '#fff'}/>
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── Stone arch / pillars ─────────────────────────────────────────────────────
function StoneArch() {
  return (
    <svg viewBox="0 0 360 320" width="360" height="320" style={{ display: 'block', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 2 }}>
      {/* Left pillar */}
      <rect x="0" y="40" width="52" height="280" rx="4" fill="#8b7355" opacity="0.92"/>
      <rect x="2" y="40" width="48" height="280" fill="url(#stone-l)" opacity="0.7"/>
      {/* Right pillar */}
      <rect x="308" y="40" width="52" height="280" rx="4" fill="#8b7355" opacity="0.92"/>
      <rect x="308" y="40" width="50" height="280" fill="url(#stone-r)" opacity="0.7"/>
      {/* Arch */}
      <path d="M 0 80 Q 0 0 52 0 L 308 0 Q 360 0 360 80" fill="#8b7355" opacity="0.95"/>
      <path d="M 6 78 Q 6 6 54 6 L 306 6 Q 354 6 354 78" fill="#9d8565" opacity="0.5"/>
      {/* Pillar caps */}
      <rect x="-4" y="32" width="60" height="14" rx="3" fill="#a09070" opacity="0.9"/>
      <rect x="304" y="32" width="60" height="14" rx="3" fill="#a09070" opacity="0.9"/>
      {/* Stone texture lines on pillars */}
      {[60,90,120,150,180,210,240,270].map((y,i)=>(
        <line key={i} x1="4" y1={y} x2="48" y2={y} stroke="#6b5535" strokeWidth="1" opacity="0.3"/>
      ))}
      {[60,90,120,150,180,210,240,270].map((y,i)=>(
        <line key={i} x1="312" y1={y} x2="356" y2={y} stroke="#6b5535" strokeWidth="1" opacity="0.3"/>
      ))}
      {/* Ivy vines on arch */}
      <path d="M 52 0 Q 80 -10 100 10 Q 120 25 140 5" fill="none" stroke={C.sage} strokeWidth="3" opacity="0.7"/>
      <ellipse cx="85" cy="0" rx="12" ry="8" fill={C.sage} opacity="0.65" transform="rotate(-20 85 0)"/>
      <ellipse cx="115" cy="8" rx="10" ry="6" fill={C.sageDark} opacity="0.55" transform="rotate(10 115 8)"/>
      <path d="M 308 0 Q 280 -10 260 10 Q 240 25 220 5" fill="none" stroke={C.sage} strokeWidth="3" opacity="0.7"/>
      <ellipse cx="275" cy="0" rx="12" ry="8" fill={C.sage} opacity="0.65" transform="rotate(20 275 0)"/>
      <ellipse cx="245" cy="8" rx="10" ry="6" fill={C.sageDark} opacity="0.55" transform="rotate(-10 245 8)"/>
      {/* Roses on pillars */}
      {[100,160,220].map((y,i)=>(
        <g key={i}>
          <circle cx="26" cy={y} r="7" fill={i%2===0?C.rose:C.amber} opacity="0.75"/>
          <circle cx="26" cy={y} r="4" fill="#fff" opacity="0.25"/>
          <circle cx="334" cy={y} r="7" fill={i%2===0?C.amber:C.rose} opacity="0.75"/>
          <circle cx="334" cy={y} r="4" fill="#fff" opacity="0.25"/>
        </g>
      ))}
      <defs>
        <linearGradient id="stone-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id="stone-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#fff"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── Hanging sign ─────────────────────────────────────────────────────────────
function HangingSign({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        top: -28,
        left: '50%',
        transform: `translateX(-50%) rotate(${hovered ? '-1.5deg' : '1deg'})`,
        cursor: 'pointer',
        transition: 'transform 0.4s ease',
        zIndex: 10,
      }}
    >
      {/* Chain */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: -2 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', border: '1.5px solid #6b5535', background: '#8b7355' }}/>
        ))}
      </div>
      {/* Sign board */}
      <div style={{
        background: 'linear-gradient(135deg, #8b6914 0%, #a07820 40%, #8b6914 100%)',
        border: '3px solid #6b5010',
        borderRadius: 4,
        padding: '10px 20px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
        minWidth: 180,
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 13, color: '#f5e8c0', margin: '0 0 2px', opacity: 0.8, letterSpacing: '0.04em' }}>Private garden</p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 15, color: '#fffbe8', margin: 0, letterSpacing: '0.02em' }}>Please sign in</p>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 10, color: 'rgba(245,232,192,0.55)', marginTop: 4, letterSpacing: '0.06em' }}>tap to continue →</p>
      </div>
    </div>
  )
}

// ── Main Login ────────────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate()
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [formOpen, setFormOpen] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const [zooming, setZooming] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (localStorage.getItem('garden_auth')) navigate('/home')
  }, [navigate])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }, [])
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const dx = (mouse.x - 0.5)
  const dy = (mouse.y - 0.5)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password.trim()) { setError('Please fill both fields.'); return }
    setError('')
    setLoading(true)

    // Step 1: open gate
    setTimeout(() => setGateOpen(true), 100)
    // Step 2: zoom in
    setTimeout(() => setZooming(true), 900)
    // Step 3: navigate
    setTimeout(() => {
      localStorage.setItem('garden_auth', JSON.stringify({ username, time: Date.now() }))
      navigate('/home')
    }, 1800)
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0,
        overflow: 'hidden',
        cursor: 'crosshair',
        background: '#1a1408',
      }}
    >
      {/* ── Background photo with deep parallax ── */}
      <div style={{
        position: 'absolute', inset: '-8%',
        backgroundImage: `url(${gardenImg})`,
        backgroundSize: 'cover',
        backgroundPosition: `${50 + dx * -10}% ${50 + dy * -8}%`,
        transition: 'background-position 0.12s ease',
        transform: zooming ? 'scale(1.35)' : 'scale(1)',
        transformOrigin: '50% 60%',
        transition2: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
      } as React.CSSProperties}/>

      {/* Zoom transition */}
      <div style={{ position: 'absolute', inset: '-8%', backgroundImage: `url(${gardenImg})`, backgroundSize: 'cover', backgroundPosition: `${50 + dx * -10}% ${50 + dy * -8}%`, transform: zooming ? 'scale(1.35)' : 'scale(1)', transformOrigin: '50% 60%', transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)' }}/>

      {/* White flash overlay on zoom */}
      <div style={{ position: 'absolute', inset: 0, background: 'white', opacity: zooming ? 1 : 0, transition: 'opacity 0.7s ease 0.9s', pointerEvents: 'none', zIndex: 90 }}/>

      {/* ── Atmosphere overlays ── */}
      {/* Bottom darkening fog */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,2,0.65) 0%, rgba(10,8,2,0.1) 40%, transparent 70%)', pointerEvents: 'none' }}/>
      {/* Top vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, transparent 40%, rgba(10,8,2,0.55) 100%)', pointerEvents: 'none' }}/>
      {/* Sun ray glow */}
      <div style={{
        position: 'absolute', top: '-10%', left: '42%',
        width: 320, height: 420,
        background: 'conic-gradient(from 170deg, transparent 0deg, rgba(255,220,100,0.12) 8deg, transparent 16deg, rgba(255,220,100,0.08) 20deg, transparent 26deg)',
        transform: `translate(${dx * -18}px, ${dy * -12}px)`,
        transition: 'transform 0.2s ease',
        pointerEvents: 'none',
        animation: 'sun-pulse 4s ease-in-out infinite',
      }}/>

      {/* ── Pollen dust motes ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {MOTES.map(m => (
          <div key={m.id} style={{
            position: 'absolute',
            left: `${m.x}%`, top: `${m.y}%`,
            width: m.size, height: m.size,
            borderRadius: '50%',
            background: 'rgba(255,230,120,0.9)',
            opacity: m.opacity,
            boxShadow: `0 0 ${m.size * 2}px rgba(255,220,80,0.6)`,
            animation: `mote-drift ${m.dur}s ease-in-out ${m.delay}s infinite`,
          }}/>
        ))}
      </div>

      {/* ── Fireflies (upper garden area) ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {FLIES.map(f => (
          <div key={f.id} style={{
            position: 'absolute',
            left: `${f.x}%`, top: `${f.y}%`,
            width: f.size, height: f.size,
            borderRadius: '50%',
            background: '#d4f040',
            boxShadow: `0 0 ${f.size*3}px ${f.size*2}px rgba(200,240,50,0.35)`,
            animation: `firefly-glow ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}/>
        ))}
      </div>

      {/* ── Floating petals ── */}
      {Array.from({length:8},(_,i)=>i).map(i => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10+i*11}%`, top: '-3%',
          width: 9+i%3*4, height: (9+i%3*4)*1.3,
          borderRadius: '50% 0 50% 0',
          background: ['#f0d4da','#ddd0e8','#f0ddc4','#c8dbd0'][i%4],
          opacity: 0.55,
          animation: `petal-fall ${11+i*2}s ease-in ${i*1.5}s infinite`,
          transform: `rotate(${i*45}deg)`,
        }}/>
      ))}

      {/* ── Swaying flowers at bottom ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, pointerEvents: 'none', transform: `translateX(${dx * -25}px)`, transition: 'transform 0.3s ease' }}>
        {Array.from({length:18},(_,i)=>i).map(i => (
          <div key={i} style={{
            position: 'absolute',
            bottom: 0,
            left: `${3+i*5.5}%`,
            width: 3,
            height: 40+Math.random()*50,
            background: `linear-gradient(to top, ${C.sage}cc, ${C.sagePale}88)`,
            borderRadius: '2px 2px 0 0',
            transformOrigin: 'bottom center',
            animation: `grass-sway ${2+i%3*0.5}s ease-in-out ${i*0.18}s infinite`,
          }}>
            {/* Flower head */}
            <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)', width:10, height:10, borderRadius:'50%', background:['#b85c6e','#7a5a8a','#c17f4a','#4a8a80'][i%4], opacity:0.7 }}/>
          </div>
        ))}
      </div>

      {/* ── Gate structure ── */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: `translateX(-50%) translateX(${dx * -30}px) translateY(${dy * -15}px)`,
        transition: 'transform 0.2s ease',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Arch + pillars */}
        <div style={{ position: 'relative', width: 360 }}>
          <StoneArch />

          {/* Hanging sign (shown before form opens) */}
          {!formOpen && !gateOpen && (
            <div style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 15 }}>
              <HangingSign onClick={() => setFormOpen(true)} />
            </div>
          )}

          {/* Gate halves with perspective */}
          <div style={{ position: 'absolute', top: 40, left: 52, right: 52, height: 280, display: 'flex', perspective: 900, perspectiveOrigin: '50% 50%' }}>
            {/* Left half */}
            <div style={{
              flex: 1, transformOrigin: 'left center',
              transform: gateOpen ? 'rotateY(-82deg)' : 'rotateY(0deg)',
              transition: 'transform 1.1s cubic-bezier(0.6, 0, 0.2, 1)',
              filter: 'drop-shadow(2px 0 8px rgba(0,0,0,0.5))',
            }}>
              <GateHalf side="left" />
            </div>
            {/* Right half */}
            <div style={{
              flex: 1, transformOrigin: 'right center',
              transform: gateOpen ? 'rotateY(82deg)' : 'rotateY(0deg)',
              transition: 'transform 1.1s cubic-bezier(0.6, 0, 0.2, 1)',
              filter: 'drop-shadow(-2px 0 8px rgba(0,0,0,0.5))',
            }}>
              <GateHalf side="right" />
            </div>

            {/* Gate latch */}
            {!gateOpen && (
              <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: 14, height: 20, background: '#6b5010', borderRadius: 3, border: '1px solid #4a3508', boxShadow: '0 2px 6px rgba(0,0,0,0.4)', zIndex: 5 }}/>
            )}
          </div>

          {/* Ground shadow */}
          <div style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', width: 280, height: 20, background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)', borderRadius: '50%' }}/>
        </div>

        {/* ── Login form card ── */}
        <div style={{
          marginTop: 16,
          opacity: formOpen ? 1 : 0,
          transform: formOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
          transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          pointerEvents: formOpen ? 'auto' : 'none',
          width: 320,
        }}>
          <div style={{
            background: 'rgba(20,14,4,0.82)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(180,140,60,0.3)',
            borderRadius: 6,
            padding: '28px 32px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,220,100,0.08)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 14, color: 'rgba(200,219,208,0.7)', margin: '0 0 4px' }}>~ welcome, traveller ~</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: 'white', margin: 0, letterSpacing: '-0.01em' }}>Enter the garden</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 11, color: 'rgba(200,219,208,0.6)', display: 'block', marginBottom: 6, letterSpacing: '0.08em' }}>Your name</label>
                <input
                  autoFocus
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onFocus={() => setFocused('u')}
                  onBlur={() => setFocused(null)}
                  placeholder="e.g. Alex Rivera"
                  style={{
                    width: '100%', padding: '11px 14px',
                    background: focused === 'u' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
                    border: `1px solid ${focused === 'u' ? 'rgba(200,219,208,0.5)' : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: 4, color: 'white',
                    fontFamily: "'Lora', serif", fontSize: 14,
                    outline: 'none', transition: 'all 0.25s', boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 11, color: 'rgba(200,219,208,0.6)', display: 'block', marginBottom: 6, letterSpacing: '0.08em' }}>Passphrase</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('p')}
                  onBlur={() => setFocused(null)}
                  placeholder="············"
                  style={{
                    width: '100%', padding: '11px 14px',
                    background: focused === 'p' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
                    border: `1px solid ${focused === 'p' ? 'rgba(200,219,208,0.5)' : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: 4, color: 'white',
                    fontFamily: "'Lora', serif", fontSize: 14,
                    outline: 'none', transition: 'all 0.25s', boxSizing: 'border-box',
                  }}
                />
              </div>
              {error && <p style={{ fontFamily: "'Lora', serif", fontSize: 12, color: C.rosePale, margin: 0, textAlign: 'center', fontStyle: 'italic' }}>{error}</p>}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 4, padding: '13px',
                  background: loading ? 'rgba(74,124,89,0.4)' : C.sage,
                  border: 'none', borderRadius: 4, color: 'white',
                  fontFamily: "'Lora', serif", fontSize: 14,
                  cursor: loading ? 'default' : 'pointer',
                  transition: 'all 0.3s', letterSpacing: '0.04em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = C.sageDark }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = C.sage }}
              >
                {loading
                  ? <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>🌿</span> Opening the gate…</>
                  : <>Open the gate →</>}
              </button>
            </form>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', margin: '18px 0 0' }}>Any name and passphrase will do</p>
          </div>
        </div>
      </div>

      {/* ── Mid-depth overlay plants (parallax) ── */}
      <div style={{ position: 'absolute', bottom: '6%', left: 0, right: 0, pointerEvents: 'none', transform: `translateX(${dx * 18}px)`, transition: 'transform 0.25s ease' }}>
        {/* Left foliage */}
        <svg viewBox="0 0 200 160" width="200" style={{ position: 'absolute', left: -10, bottom: 0, opacity: 0.75 }}>
          <path d="M20 160 Q0 80 40 40 Q60 80 20 160" fill={C.sageDark} opacity="0.8"/>
          <path d="M50 160 Q20 100 60 60 Q80 100 50 160" fill={C.sage} opacity="0.7"/>
          <path d="M90 160 Q60 110 90 70 Q110 110 90 160" fill={C.sageDark} opacity="0.6"/>
          <ellipse cx="42" cy="50" rx="14" ry="9" fill={C.rose} opacity="0.55" transform="rotate(-20 42 50)"/>
          <ellipse cx="65" cy="65" rx="12" ry="8" fill={C.amber} opacity="0.5" transform="rotate(10 65 65)"/>
        </svg>
        {/* Right foliage */}
        <svg viewBox="0 0 200 160" width="200" style={{ position: 'absolute', right: -10, bottom: 0, opacity: 0.75, transform: 'scaleX(-1)' }}>
          <path d="M20 160 Q0 80 40 40 Q60 80 20 160" fill={C.sageDark} opacity="0.8"/>
          <path d="M50 160 Q20 100 60 60 Q80 100 50 160" fill={C.sage} opacity="0.7"/>
          <path d="M90 160 Q60 110 90 70 Q110 110 90 160" fill={C.sageDark} opacity="0.6"/>
          <ellipse cx="42" cy="50" rx="14" ry="9" fill={C.lavender} opacity="0.55" transform="rotate(-20 42 50)"/>
          <ellipse cx="65" cy="65" rx="12" ry="8" fill={C.rose} opacity="0.5" transform="rotate(10 65 65)"/>
        </svg>
      </div>

      {/* Top left title */}
      {!formOpen && !gateOpen && (
        <div style={{ position: 'absolute', top: 48, left: 52, animation: 'fade-in 1.2s ease both', pointerEvents: 'none' }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 18, color: 'rgba(200,219,208,0.7)', margin: '0 0 6px' }}>~ my portfolio ~</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: 'white', margin: 0, letterSpacing: '-0.02em', textShadow: '0 4px 32px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
            Alex Rivera
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 16, color: 'rgba(210,240,210,0.65)', margin: '8px 0 0' }}>
            Designer · Developer · Dreamer
          </p>
        </div>
      )}

      {/* Bottom hint */}
      {!formOpen && !gateOpen && (
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', animation: 'fade-in 2s ease 1s both', pointerEvents: 'none' }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 16, color: 'rgba(255,255,255,0.4)', margin: 0, animation: 'bob 2.5s ease-in-out infinite' }}>
            tap the sign to enter ↑
          </p>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes wing-flap   { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.35)} }
        @keyframes sun-pulse   { 0%,100%{opacity:1} 50%{opacity:0.7} }
        @keyframes mote-drift  { 0%{transform:translate(0,0) scale(1);opacity:0} 10%{opacity:1} 50%{transform:translate(var(--dx,20px),-60px) scale(1.3)} 90%{opacity:0.5} 100%{transform:translate(var(--dx,30px),-130px) scale(0.8);opacity:0} }
        @keyframes firefly-glow{ 0%,100%{opacity:0;transform:translate(0,0)} 30%{opacity:0.95} 60%{opacity:0.2;transform:translate(22px,-14px)} 80%{opacity:0.8} }
        @keyframes petal-fall  { 0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0} 5%{opacity:0.6} 100%{transform:translateY(110vh) translateX(50px) rotate(360deg);opacity:0} }
        @keyframes grass-sway  { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        @keyframes spin        { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fade-in     { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bob         { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        input::placeholder { color:rgba(255,255,255,0.28); }
      `}</style>
    </div>
  )
}
