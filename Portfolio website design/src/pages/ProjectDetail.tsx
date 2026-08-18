import { useParams, useNavigate } from 'react-router'
import { getProject } from '../data/projects'
import { C, Reveal, BotanicDivider } from '../components/shared'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const p = getProject(id ?? '')

  if (!p) {
    return (
      <div style={{ minHeight: '100vh', background: C.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 28, color: C.inkFaint }}>Project not found…</p>
          <button onClick={() => navigate('/projects')} style={{ marginTop: 16, fontFamily: "'Lora', serif", fontSize: 14, color: C.sage, background: 'none', border: `1px solid ${C.sage}`, padding: '10px 24px', borderRadius: 40, cursor: 'pointer' }}>
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.parchment }}>
      {/* Hero image */}
      <div style={{ height: '52vh', minHeight: 320, position: 'relative', overflow: 'hidden', background: C.sagePale }}>
        <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.72) saturate(0.9)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,16,10,0.82) 0%, transparent 55%)' }}/>

        {/* Back button */}
        <button
          onClick={() => navigate('/projects')}
          style={{ position: 'absolute', top: 24, left: 28, fontFamily: "'Lora', serif", fontSize: 13, color: 'rgba(255,255,255,0.82)', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.25)', padding: '8px 18px', borderRadius: 40, cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.color = 'white' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.82)' }}
        >
          ← All projects
        </button>

        {/* Title over hero */}
        <div style={{ position: 'absolute', bottom: 36, left: 48, right: 48 }}>
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: 13, color: 'rgba(220,240,225,0.75)', display: 'block', marginBottom: 8, letterSpacing: '0.08em' }}>
            {p.category} · {p.year}
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, color: 'white', margin: 0, letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            {p.title}
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.6vw,20px)', color: 'rgba(215,238,222,0.82)', margin: '10px 0 0', textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
            {p.tagline}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '64px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 56, alignItems: 'start' }}>

          {/* Left — main content */}
          <div>
            <Reveal>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 16, color: C.inkLight, lineHeight: 1.9, margin: '0 0 40px' }}>
                {p.desc}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
                How it works
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
                {p.details.map((d, i) => (
                  <div key={`det-${i}`} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 20px', background: 'white', border: `1px solid ${C.border}`, borderRadius: 6, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: p.flower }}/>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: p.flower, flexShrink: 0, lineHeight: 1.4 }}>{String(i + 1).padStart(2, '0')}</div>
                    <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: C.inkLight, lineHeight: 1.8, margin: 0 }}>{d}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Extra images */}
            {p.extraImages.length > 0 && (
              <Reveal delay={120}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
                  Gallery
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(p.extraImages.length, 2)}, 1fr)`, gap: 16, marginBottom: 48 }}>
                  {p.extraImages.map((img, i) => (
                    <div key={`img-${i}`} style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '16/9', background: C.sagePale }}>
                      <img src={img} alt={`${p.title} screenshot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85)' }}/>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={160}>
              <BotanicDivider />
            </Reveal>
          </div>

          {/* Right — sidebar */}
          <Reveal delay={60}>
            <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Links */}
              <div style={{ background: 'white', border: `1px solid ${C.border}`, borderRadius: 6, padding: '24px 22px' }}>
                <div style={{ height: 3, background: `linear-gradient(to right, ${p.flower}, transparent)`, borderRadius: 2, marginBottom: 18 }}/>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 14px' }}>Links</h3>

                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.border}`, textDecoration: 'none', color: C.ink, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = p.flower)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.ink)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span style={{ fontFamily: "'Lora', serif", fontSize: 14 }}>GitHub Repository</span>
                  <span style={{ marginLeft: 'auto', fontSize: 14 }}>→</span>
                </a>

                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', textDecoration: 'none', color: p.website === '#' ? C.inkFaint : C.ink, transition: 'color 0.2s', cursor: p.website === '#' ? 'default' : 'pointer' }}
                  onMouseEnter={e => { if (p.website !== '#') e.currentTarget.style.color = p.flower }}
                  onMouseLeave={e => { e.currentTarget.style.color = p.website === '#' ? C.inkFaint : C.ink }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <span style={{ fontFamily: "'Lora', serif", fontSize: 14 }}>{p.website === '#' ? 'Live site (coming soon)' : 'Live site'}</span>
                  {p.website !== '#' && <span style={{ marginLeft: 'auto', fontSize: 14 }}>→</span>}
                </a>
              </div>

              {/* Tech stack */}
              <div style={{ background: 'white', border: `1px solid ${C.border}`, borderRadius: 6, padding: '24px 22px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 14px' }}>Tech stack</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontFamily: "'Lora', serif", fontSize: 12, color: p.flower, background: `${p.flower}14`, padding: '4px 12px', borderRadius: 20, border: `1px solid ${p.flower}38` }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div style={{ background: 'white', border: `1px solid ${C.border}`, borderRadius: 6, padding: '24px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 12, color: C.inkFaint }}>Category</span>
                  <span style={{ fontFamily: "'Lora', serif", fontSize: 13, color: C.ink }}>{p.category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                  <span style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 12, color: C.inkFaint }}>Year</span>
                  <span style={{ fontFamily: "'Lora', serif", fontSize: 13, color: C.ink }}>{p.year}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
