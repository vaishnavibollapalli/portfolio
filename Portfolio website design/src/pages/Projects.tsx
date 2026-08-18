import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PROJECTS } from '../data/projects'
import { C, Reveal, BotanicDivider, SectionLabel } from '../components/shared'

const CATS = ['All', 'AI · Fitness', 'Security', 'Wellness', 'Finance · AI', 'Campus · Web']

function Card({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <Reveal delay={i * 55}>
      <div
        onClick={() => navigate(`/projects/${p.id}`)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'white', border: `1px solid ${C.border}`, borderRadius: 6,
          overflow: 'hidden', cursor: 'pointer',
          transition: 'all 0.38s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'translateY(-8px) rotate(-0.2deg)' : 'none',
          boxShadow: hovered ? `0 24px 64px rgba(42,33,24,0.16), 0 0 0 1px ${p.flower}44` : '0 2px 12px rgba(42,33,24,0.06)',
        }}
      >
        <div style={{ height: 188, overflow: 'hidden', position: 'relative', background: C.sagePale }}>
          <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.75) sepia(0.08)', transition: 'transform 0.55s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}/>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(20,14,8,0.6) 0%, transparent 55%)` }}/>

          <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: "'Dancing Script', cursive", fontSize: 12, color: 'white', background: `${p.flower}cc`, padding: '3px 12px', borderRadius: 20 }}>
            {p.category}
          </span>
          {p.featured && (
            <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: "'Lora', serif", fontSize: 10, color: C.amberPale, background: 'rgba(0,0,0,0.45)', padding: '3px 10px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
              Featured
            </span>
          )}
          <span style={{ position: 'absolute', bottom: 12, right: 12, fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{p.year}</span>
        </div>

        <div style={{ padding: '22px 22px 26px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${p.flower}, transparent)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}/>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.01em' }}>{p.title}</h3>
          <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, color: C.inkFaint, margin: '0 0 10px', lineHeight: 1.5 }}>{p.tagline}</p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: C.inkLight, lineHeight: 1.78, margin: '0 0 16px' }}>{p.desc.slice(0, 130)}…</p>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: hovered ? 12 : 0 }}>
            {p.tags.slice(0, 4).map(t => (
              <span key={t} style={{ fontFamily: "'Lora', serif", fontSize: 11, color: p.flower, background: `${p.flower}16`, padding: '3px 10px', borderRadius: 20, border: `1px solid ${p.flower}38` }}>{t}</span>
            ))}
          </div>

          {hovered && (
            <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, color: p.flower, animation: 'fade-slide-up 0.25s ease' }}>
              View project details →
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  const [cat, setCat] = useState('All')
  const shown = cat === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === cat)

  return (
    <div style={{ minHeight: '100vh', background: C.parchmentDark }}>
      {/* Header */}
      <div style={{ background: C.sageDark, padding: '64px 60px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1400&h=400&fit=crop&auto=format")`, backgroundSize: 'cover', backgroundPosition: 'center 40%', opacity: 0.15 }}/>
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel>~ things I have grown ~</SectionLabel>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,64px)', fontWeight: 400, color: 'white', margin: 0, letterSpacing: '-0.03em' }}>Projects</h1>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 60px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 44 }}><BotanicDivider /></div>
        </Reveal>

        {/* Filter pills */}
        <Reveal>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, padding: '8px 20px', borderRadius: 40, border: `1px solid ${cat === c ? C.sage : C.border}`, background: cat === c ? C.sage : 'white', color: cat === c ? 'white' : C.inkLight, cursor: 'pointer', transition: 'all 0.25s' }}>
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {shown.map((p, i) => <Card key={p.id} p={p} i={i} />)}
        </div>

        {shown.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 24, color: C.inkFaint }}>No flowers here yet…</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-slide-up { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  )
}
