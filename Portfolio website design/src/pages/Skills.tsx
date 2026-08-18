import { C, Reveal, BotanicDivider, SectionLabel } from '../components/shared'

const SKILLS = [
  { label: 'Languages',      items: ['Python', 'Java', 'C', 'R', 'TypeScript', 'SQL'],              icon: '🌿', color: C.sage,     level: [90, 82, 78, 88, 80, 75] },
  { label: 'Frontend & 3D',  items: ['React', 'Next.js', 'Three.js', 'CSS', 'HTML', 'Vite'],        icon: '🌸', color: C.rose,     level: [88, 82, 72, 90, 90, 80] },
  { label: 'Backend & Cloud',items: ['FastAPI', 'Node.js', 'Flask', 'PostgreSQL', 'Redis', 'AWS'],  icon: '🌱', color: C.teal,     level: [80, 78, 82, 80, 75, 70] },
  { label: 'Research & AI',  items: ['lavaan', 'MANCOVA', 'LGCM', 'Power BI', 'iMotions', 'Claude API'], icon: '🦋', color: C.lavender, level: [85, 82, 78, 75, 72, 80] },
]

const CERTS = [
  {
    org: 'Anthropic',
    color: C.amber,
    icon: '🤖',
    items: [
      { name: 'AI Fluency', desc: 'Foundations of modern AI systems and practical LLM usage.' },
      { name: 'Model Context Protocol (MCP)', desc: 'Building and integrating MCP servers for AI-powered tooling.' },
      { name: 'Claude + Vertex AI', desc: 'Deploying Claude models on Google Cloud Vertex AI infrastructure.' },
    ],
  },
  {
    org: 'CodePath',
    color: C.teal,
    icon: '💻',
    items: [
      { name: 'AI201 — Intermediate AI', desc: 'Applied machine learning, prompt engineering, and AI product development.' },
    ],
  },
]

const TIMELINE = [
  { year: 'Aug 2023', label: 'Arrived at Georgia State', desc: "Freshman STEM Scholar. Dean's List — Fall 2023." },
  { year: 'Mar 2024', label: 'EVP of Student Government', desc: "Chemistry Student of the Semester. Dean's List continued." },
  { year: 'Apr 2025', label: 'Finance Director, SGA', desc: 'Led SGA fiscal operations and budget management.' },
  { year: 'May 2025', label: 'Research Assistant', desc: 'MANCOVA analysis on ABCD dataset, 69 brain regions.' },
  { year: 'May 2026', label: 'IT Support + Research Analyst', desc: "Two new roles alongside studies. President's List Spring 2026." },
]

export default function Skills() {
  return (
    <div style={{ minHeight: '100vh', background: C.parchment }}>
      {/* Header */}
      <div style={{ background: C.sageDark, padding: '64px 60px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1400&h=400&fit=crop&auto=format")`, backgroundSize: 'cover', backgroundPosition: 'center 30%', opacity: 0.15 }}/>
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel>~ tools of the trade ~</SectionLabel>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,64px)', fontWeight: 400, color: 'white', margin: 0, letterSpacing: '-0.03em' }}>Skills & Craft</h1>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 60px' }}>

        {/* Skill bars */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}><BotanicDivider /></div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 88 }}>
          {SKILLS.map(({ label, items, icon, color, level }, si) => (
            <Reveal key={label} delay={si * 80}>
              <div
                style={{ background: 'white', border: `1px solid ${C.border}`, borderRadius: 4, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px rgba(42,33,24,0.1)` }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(to right, ${color}, transparent)` }}/>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: C.ink, margin: 0 }}>{label}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {items.map((item, j) => (
                    <div key={item}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontFamily: "'Lora', serif", fontSize: 13, color: C.inkLight }}>{item}</span>
                        <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: 12, color: color, opacity: 0.7 }}>{level[j]}%</span>
                      </div>
                      <div style={{ height: 5, background: C.parchmentDark, borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${level[j]}%`, background: `linear-gradient(to right, ${color}, ${color}88)`, borderRadius: 3 }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionLabel>~ credentials ~</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: C.ink, margin: '0 0 24px', letterSpacing: '-0.02em' }}>Certifications</h2>
            <BotanicDivider />
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 24, marginBottom: 88 }}>
          {CERTS.map((cert, ci) => (
            <Reveal key={cert.org} delay={ci * 80}>
              <div style={{ background: 'white', border: `1px solid ${C.border}`, borderRadius: 4, padding: '28px 26px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(to right, ${cert.color}, transparent)` }}/>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  <span style={{ fontSize: 22 }}>{cert.icon}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: C.ink, margin: 0 }}>{cert.org}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {cert.items.map((item, ii) => (
                    <div key={item.name} style={{ padding: '14px 0', borderTop: ii > 0 ? `1px solid ${C.border}` : undefined }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: cert.color, flexShrink: 0 }}/>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: C.ink }}>{item.name}</span>
                      </div>
                      <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, color: C.inkLight, lineHeight: 1.65, margin: '0 0 0 15px' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionLabel>~ how I got here ~</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: C.ink, margin: '0 0 24px', letterSpacing: '-0.02em' }}>The Journey</h2>
            <BotanicDivider />
          </div>
        </Reveal>
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ position: 'absolute', left: 80, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${C.sage}88, ${C.border}, transparent)` }}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TIMELINE.map(({ year, label, desc }, i) => (
              <Reveal key={`tl-${i}`} delay={i * 60}>
                <div style={{ display: 'flex', gap: 32, paddingBottom: 36, alignItems: 'flex-start' }}>
                  <div style={{ width: 80, flexShrink: 0, textAlign: 'right', paddingTop: 3 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: C.sage }}>{year}</span>
                  </div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.sage, border: `3px solid ${C.parchment}`, flexShrink: 0, marginTop: 4, zIndex: 1, boxShadow: `0 0 0 3px ${C.sage}33` }}/>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 5px' }}>{label}</h4>
                    <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, color: C.inkLight, lineHeight: 1.75, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
