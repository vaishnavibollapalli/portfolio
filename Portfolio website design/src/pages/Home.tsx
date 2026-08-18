import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router'
import gardenImg from '../imports/image.png'
import { C, Reveal, SectionLabel, BotanicDivider, Fireflies } from '../components/shared'

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    const start = Date.now()
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setCount(Math.floor(ease * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration])
  return { ref, count }
}

// ── Stat tile ─────────────────────────────────────────────────────────────────
function StatTile({ num, suffix = '', label, sub, color, delay }: { num: number; suffix?: string; label: string; sub: string; color: string; delay: number }) {
  const { ref, count } = useCountUp(num, 1600)
  return (
    <div ref={ref} style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '28px 12px', flex: 1, transition: 'background 0.3s', animationDelay: `${delay}ms` }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, color, lineHeight: 1, letterSpacing: '-0.02em' }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: 'rgba(200,219,208,0.85)', marginTop: 6 }}>{label}</div>
      <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{sub}</div>
    </div>
  )
}

// ── Interactive project card ──────────────────────────────────────────────────
type Project = { title: string; cat: string; color: string; desc: string; tags: string[]; img: string; path: string }
function ProjectCard({ p, delay }: { p: Project; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  return (
    <Reveal delay={delay}>
      <div
        onClick={() => navigate(p.path)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'white', border: `1px solid ${C.border}`,
          borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'translateY(-10px) scale(1.01)' : 'none',
          boxShadow: hovered ? `0 28px 72px rgba(42,33,24,0.18), 0 0 0 1px ${p.color}44` : '0 2px 16px rgba(42,33,24,0.07)',
        }}
      >
        {/* Image zone */}
        <div style={{ height: 160, position: 'relative', overflow: 'hidden', background: C.sagePale }}>
          <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: `saturate(${hovered ? 0.95 : 0.65}) sepia(0.1)`, transition: 'transform 0.6s ease, filter 0.4s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(42,33,24,0.55) 0%, transparent 55%)` }} />

          {/* Category badge */}
          <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: "'Dancing Script', cursive", fontSize: 12, color: 'white', background: `${p.color}cc`, padding: '3px 12px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
            {p.cat}
          </span>

          {/* Bloom flowers on hover */}
          {hovered && (
            <>
              {[{ top: '8px', right: '8px', size: 36, color: p.color }, { bottom: '12px', right: '24px', size: 24, color: C.amber }].map((f, i) => (
                <div key={i} style={{ position: 'absolute', ...f as any, animation: 'flower-bloom 0.4s cubic-bezier(0.34,1.56,0.64,1) both', animationDelay: `${i * 80}ms` }}>
                  <svg viewBox="0 0 40 40" width={f.size} height={f.size}>
                    {[0,60,120,180,240,300].map((a,j)=>(
                      <ellipse key={j} cx="20" cy="20" rx="4" ry="8" fill={f.color} opacity="0.75" transform={`rotate(${a} 20 20)`}/>
                    ))}
                    <circle cx="20" cy="20" r="5" fill={C.gold} opacity="0.9"/>
                  </svg>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '20px 20px 22px', position: 'relative' }}>
          {/* Accent top line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${p.color}, transparent)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }} />

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{p.title}</h3>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: C.inkLight, lineHeight: 1.75, margin: '0 0 14px' }}>{p.desc}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {p.tags.map(t => (
              <span key={t} style={{ fontFamily: "'Lora', serif", fontSize: 10, color: p.color, background: `${p.color}16`, padding: '3px 10px', borderRadius: 20, border: `1px solid ${p.color}44` }}>{t}</span>
            ))}
          </div>
          {hovered && (
            <div style={{ marginTop: 14, fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, color: C.sage, animation: 'fade-slide-up 0.3s ease' }}>
              View project →
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}

// ── Garden path quick-nav ─────────────────────────────────────────────────────
function GardenNav({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const BEDS = [
    { icon: '🦋', label: 'About',    desc: 'My story & values',   path: '/about',    color: C.lavender, bg: C.lavenderPale },
    { icon: '🌸', label: 'Projects', desc: 'Everything I built',  path: '/projects', color: C.rose,     bg: C.rosePale    },
    { icon: '🌱', label: 'Skills',   desc: 'Craft & experience',  path: '/skills',   color: C.teal,     bg: C.sageFaint   },
    { icon: '✉️',  label: 'Contact',  desc: "Let's grow together", path: '/contact',  color: C.amber,    bg: C.amberPale   },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
      {BEDS.map(({ icon, label, desc, path, color, bg }, i) => (
        <Reveal key={label} delay={i * 70}>
          <div
            onClick={() => navigate(path)}
            style={{ background: bg, border: `1px solid ${color}33`, borderRadius: 8, padding: '22px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${color}28` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: C.ink }}>{label}</div>
              <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 12, color: C.inkLight, marginTop: 2 }}>{desc}</div>
            </div>
            <span style={{ marginLeft: 'auto', color, fontSize: 18, flexShrink: 0, transition: 'transform 0.2s' }}>→</span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

const FEATURED: Project[] = [
  { title: 'FitFindr', cat: 'AI · Fitness', color: C.lavender, desc: 'AI-powered fitness companion using Python, Flask, Groq, and LLMs with an immersive Three.js 3D interface.', tags: ['Python', 'Flask', 'Groq', 'Three.js'], img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=380&fit=crop&auto=format', path: '/projects/fitfindr' },
  { title: 'FitFin', cat: 'Finance · AI', color: C.teal, desc: 'Full-stack financial planning app with React, FastAPI, AWS, and Monte Carlo simulation for investment forecasting.', tags: ['React', 'Next.js', 'FastAPI', 'AWS'], img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=380&fit=crop&auto=format', path: '/projects/fitfin' },
  { title: "Dead Man's Switch", cat: 'Security', color: C.amber, desc: 'Encrypted dead-man-switch system with Node.js, Redis, AES-256 encryption, and PostgreSQL for time-gated message delivery.', tags: ['Node.js', 'Redis', 'AES-256', 'PostgreSQL'], img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=380&fit=crop&auto=format', path: '/projects/deadmans-switch' },
]

export default function Home() {
  const navigate = useNavigate()
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)

  const onMove = useCallback((e: MouseEvent) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }), [])
  const onScroll = useCallback(() => setScrollY(window.scrollY), [])

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll) }
  }, [onMove, onScroll])

  const dx = mouse.x - 0.5; const dy = mouse.y - 0.5
  const auth = JSON.parse(localStorage.getItem('garden_auth') || '{}')
  const name = auth.username || 'Vishnavi'

  return (
    <div style={{ minHeight: '100vh', background: C.parchment }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 520, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background photo - deep parallax */}
        <div style={{
          position: 'absolute', inset: '-10%',
          backgroundImage: `url(${gardenImg})`,
          backgroundSize: 'cover',
          backgroundPosition: `${50 + dx * -14}% ${50 + dy * -8}%`,
          transition: 'background-position 0.12s ease',
          transform: `translateY(${scrollY * 0.28}px)`,
          filter: 'brightness(0.68) saturate(1.1)',
        }} />

        {/* Overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(10,18,10,0.82) 0%, rgba(10,18,10,0.35) 55%, transparent 85%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 10% 50%, transparent 30%, rgba(5,12,5,0.5) 100%)', pointerEvents: 'none' }} />

        {/* Sun ray */}
        <div style={{ position: 'absolute', top: '-20%', left: '50%', width: 350, height: 500, pointerEvents: 'none', background: 'conic-gradient(from 168deg, transparent 0deg, rgba(255,215,80,0.08) 7deg, transparent 14deg, rgba(255,215,80,0.05) 19deg, transparent 25deg)', transform: `translate(${dx * -20}px, ${dy * -12}px)`, transition: 'transform 0.2s ease', animation: 'sun-breathe 5s ease-in-out infinite' }} />

        {/* Fireflies in upper area */}
        <Fireflies count={8} />

        {/* Floating botanical elements - mid parallax layer */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: `translate(${dx * 16}px, ${dy * 10}px)`, transition: 'transform 0.25s ease' }}>
          {/* Scattered petals */}
          {[{top:'18%',left:'70%',size:28,color:C.rosePale,rot:-20},{top:'35%',left:'82%',size:20,color:C.lavenderPale,rot:40},{top:'55%',left:'75%',size:24,color:C.amberPale,rot:15}].map((p,i)=>(
            <div key={i} style={{ position:'absolute', top:p.top, left:p.left, width:p.size, height:p.size*1.3, borderRadius:'50% 0 50% 0', background:p.color, opacity:0.55, transform:`rotate(${p.rot}deg)`, animation:`sway-petal ${3+i}s ease-in-out ${i*0.7}s infinite` }}/>
          ))}
        </div>

        {/* Hero text */}
        <div style={{ position: 'relative', padding: '0 56px', maxWidth: 700, transform: `translate(${dx * -6}px, ${dy * -4}px)`, transition: 'transform 0.2s ease' }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 18, color: 'rgba(200,230,210,0.75)', margin: '0 0 14px', animation: 'fade-up 0.8s ease 0.1s both' }}>
            ~ welcome to the garden ~
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, color: 'white', margin: '0 0 8px', lineHeight: 1.0, letterSpacing: '-0.03em', textShadow: '0 4px 40px rgba(0,0,0,0.35)', animation: 'fade-up 0.8s ease 0.25s both' }}>
            Bollapalli Vishnavi
          </h1>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 300, color: C.sagePale, margin: '0 0 24px', lineHeight: 1.0, letterSpacing: '-0.02em', textShadow: '0 4px 40px rgba(0,0,0,0.3)', animation: 'fade-up 0.8s ease 0.4s both' }}>
            Abhishikta
          </h1>
          <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 17, color: 'rgba(255,255,255,0.68)', lineHeight: 1.85, maxWidth: 460, margin: '0 0 44px', animation: 'fade-up 0.8s ease 0.55s both' }}>
            CS student, researcher, and builder — tending this garden of projects at Georgia State University.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: 'fade-up 0.8s ease 0.7s both' }}>
            <button onClick={() => navigate('/projects')} style={{ fontFamily: "'Lora', serif", fontSize: 14, background: C.sage, color: 'white', padding: '13px 30px', border: 'none', borderRadius: 40, cursor: 'pointer', transition: 'all 0.28s', letterSpacing: '0.03em', boxShadow: `0 4px 20px ${C.sage}55` }}
              onMouseEnter={e => { e.currentTarget.style.background = C.sageDark; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${C.sage}55` }}
              onMouseLeave={e => { e.currentTarget.style.background = C.sage; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 4px 20px ${C.sage}55` }}
            >
              Explore projects
            </button>
            <button onClick={() => navigate('/about')} style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 14, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.85)', padding: '13px 30px', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 40, cursor: 'pointer', transition: 'all 0.28s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none' }}
            >
              About me
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', animation: 'scroll-bob 2.5s ease-in-out infinite', pointerEvents: 'none' }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 13, color: 'rgba(255,255,255,0.38)', margin: '0 0 6px' }}>scroll to explore</p>
          <svg width="14" height="20" viewBox="0 0 14 20"><path d="M7 0 L7 16 M1 10 L7 16 L13 10" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: `linear-gradient(90deg, ${C.sageDark} 0%, #1e3d28 50%, ${C.sageDark} 100%)`, display: 'flex' }}>
        <StatTile num={3}  suffix="."  label="57 GPA"            sub="Georgia State University"  color={C.amberPale}    delay={0}   />
        <StatTile num={4}  suffix="+"  label="Projects built"    sub="research & software"        color={C.lavenderPale} delay={80}  />
        <StatTile num={2}  suffix=""   label="Research roles"    sub="active since 2025"          color={C.sagePale}     delay={160} />
        <StatTile num={5}  suffix="+"  label="Awards & honors"   sub="Dean's & President's List"  color={C.rosePale}     delay={240} />
      </div>

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '88px 48px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionLabel>~ fresh from the garden ~</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px,4vw,50px)', fontWeight: 400, color: C.ink, margin: '0 0 24px', letterSpacing: '-0.02em' }}>Featured Work</h2>
            <BotanicDivider />
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 24 }}>
          {FEATURED.map((p, i) => <ProjectCard key={p.title} p={p} delay={i * 80} />)}
        </div>
        <Reveal delay={200}>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <button onClick={() => navigate('/projects')} style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 16, background: 'transparent', border: `1.5px solid ${C.border}`, color: C.inkLight, padding: '12px 36px', borderRadius: 40, cursor: 'pointer', transition: 'all 0.28s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.color = C.sage; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.inkLight; e.currentTarget.style.transform = 'none' }}
            >
              See all projects →
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── GARDEN NAV ── */}
      <section style={{ background: C.parchmentDark, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <SectionLabel>~ explore the garden ~</SectionLabel>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: C.ink, margin: 0, letterSpacing: '-0.02em' }}>Where would you like to wander?</h2>
            </div>
          </Reveal>
          <GardenNav navigate={navigate} />
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 48px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${gardenImg})`, backgroundSize: 'cover', backgroundPosition: `${50 + (mouse.x - 0.5) * -8}% 70%`, filter: 'brightness(0.35) saturate(0.8)', transition: 'background-position 0.2s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,16,8,0.5)', pointerEvents: 'none' }} />
        <Fireflies count={6} />
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(20px,3vw,32px)', color: 'white', lineHeight: 1.6, margin: '0 0 24px', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
              "A garden is a grand teacher. It teaches patience and careful watchfulness; it teaches industry and thrift."
            </p>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 16, color: 'rgba(200,219,208,0.6)' }}>~ Gertrude Jekyll ~</p>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes sun-breathe    { 0%,100%{opacity:1} 50%{opacity:0.7} }
        @keyframes fade-up        { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scroll-bob     { 0%,100%{opacity:0.5;transform:translateX(-50%) translateY(0)} 50%{opacity:1;transform:translateX(-50%) translateY(8px)} }
        @keyframes flower-bloom   { from{opacity:0;transform:scale(0) rotate(-30deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
        @keyframes fade-slide-up  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sway-petal     { 0%,100%{transform:rotate(var(--r,0deg)) translateY(0)} 50%{transform:rotate(calc(var(--r,0deg) + 6deg)) translateY(-8px)} }
        @keyframes firefly        { 0%,100%{opacity:0;transform:translate(0,0)} 25%{opacity:0.9} 60%{opacity:0.25;transform:translate(24px,-16px)} 80%{opacity:0.8;transform:translate(-10px,7px)} }
      `}</style>
    </div>
  )
}
