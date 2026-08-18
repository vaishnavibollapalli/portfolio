import { C, Reveal, BotanicDivider, SectionLabel, Vine } from '../components/shared'

const JOURNEY = [
  { period: 'Aug 2023',    icon: '🌱', label: 'Arrived at Georgia State University', desc: "Began CS degree as a Freshman STEM Scholar. Earned Dean's List in the very first semester (Fall 2023)." },
  { period: 'Spring 2024', icon: '🏆', label: 'Chemistry Student of the Semester', desc: "Named Chemistry Student of the Semester — Spring 2024. Dean's List continued." },
  { period: 'Mar 2024',    icon: '🎙️', label: 'Elected EVP of Student Government', desc: 'Became Executive Vice President of SGA, representing the student body and leading cross-campus initiatives.' },
  { period: 'Apr 2025',    icon: '💼', label: 'Finance Director, SGA', desc: "Promoted to Finance Director of the Student Government Association, stewarding the organisation's annual budget." },
  { period: 'May 2025',    icon: '🧠', label: 'Research Assistant — Mental Health', desc: 'Joined neuroscience lab studying genetic risk and mental illness. Began MANCOVA analysis on 69 brain regions using the ABCD dataset.' },
  { period: 'Summer 2025', icon: '⭐', label: "President's List", desc: "Achieved the highest academic honour — President's List — for Summer 2025." },
  { period: 'May 2026',    icon: '💻', label: 'IT Support Specialist · GSU Robinson', desc: 'Joined the Robinson College of Business IT team while maintaining full-time studies and both research roles.' },
  { period: 'May 2026',    icon: '👁️', label: 'Research Analyst — Eye-Tracking', desc: "Second research role: analysing gaze-visualisation data from 48 participants using R, iMotions, and gganimate." },
  { period: 'Spring 2026', icon: '⭐', label: "President's List (again)", desc: "President's List Spring 2026 — maintaining academic excellence across a packed schedule." },
]

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: C.parchment }}>
      {/* Page header */}
      <div style={{ background: C.sageDark, padding: '64px 60px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&h=400&fit=crop&auto=format")`, backgroundSize: 'cover', backgroundPosition: 'center 60%', opacity: 0.16 }}/>
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel>~ who I am ~</SectionLabel>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,64px)', fontWeight: 400, color: 'white', margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
            About Me
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 60 }}><Vine side="left" height={500} /></div>
        <div style={{ position: 'absolute', right: 0, top: 120 }}><Vine side="right" height={400} /></div>

        {/* Bio section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', marginBottom: 100 }}>
          <Reveal>
            <div style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '3/4', borderRadius: 4, overflow: 'hidden', boxShadow: `0 32px 80px rgba(42,33,24,0.18)` }}>
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=1100&fit=crop&auto=format" alt="Study and research" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.8) sepia(0.08)' }}/>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(42,33,24,0.38) 0%, transparent 55%)` }}/>
                <div style={{ position: 'absolute', inset: 14, border: '1px solid rgba(255,255,255,0.18)', pointerEvents: 'none' }}/>
              </div>
              {/* Floating stat card */}
              <div style={{ position: 'absolute', bottom: -24, right: -24, background: C.parchment, border: `1px solid ${C.border}`, padding: '18px 22px', borderRadius: 4, boxShadow: `0 10px 36px rgba(42,33,24,0.12)`, display: 'flex', gap: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: C.sage, lineHeight: 1 }}>3.57</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: 11, color: C.inkFaint, marginTop: 3 }}>GPA</div>
                </div>
                <div style={{ width: 1, background: C.border }}/>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: C.amber, lineHeight: 1 }}>5+</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: 11, color: C.inkFaint, marginTop: 3 }}>honors</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 400, color: C.ink, margin: '0 0 24px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                Rooted in<br /><em style={{ color: C.sage, fontStyle: 'italic', fontWeight: 300 }}>curiosity.</em>
              </h2>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 18, color: C.ink, lineHeight: 1.7, margin: '0 0 20px' }}>
                "I came to CS the same way I came to research — by asking questions nobody had a clean answer to."
              </p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: C.inkLight, lineHeight: 1.9, margin: '0 0 16px' }}>
                I am a Computer Science student at Georgia State University, a research assistant in two active labs, a former EVP and Finance Director of Student Government, and a builder of software that solves real problems. Every semester since I arrived I have been on the Dean's or President's List.
              </p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: C.inkLight, lineHeight: 1.9, margin: '0 0 36px' }}>
                My work lives at the intersection of data science, AI, and human well-being. Whether analysing 69 brain regions in a neuroimaging dataset or building a financial simulation engine, I approach every problem with the same rigour and genuine curiosity.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { icon: '🌿', label: 'Based in',       value: 'Atlanta, GA 30328' },
                  { icon: '🎓', label: 'University',      value: 'Georgia State University' },
                  { icon: '🌱', label: 'Studying since',  value: 'Aug 2023 · CS major' },
                  { icon: '🦋', label: 'Focused on',      value: 'AI, research, security' },
                  { icon: '🔬', label: 'Research roles',  value: '2 active labs' },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderTop: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 17 }}>{icon}</span>
                    <span style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, color: C.inkFaint, flex: 1 }}>{label}</span>
                    <span style={{ fontFamily: "'Lora', serif", fontSize: 14, color: C.ink }}>{value}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${C.border}` }}/>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Journey timeline */}
        <div style={{ marginBottom: 100 }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>~ how I got here ~</SectionLabel>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: C.ink, margin: '0 0 24px', letterSpacing: '-0.02em' }}>My Journey</h2>
              <BotanicDivider />
            </div>
          </Reveal>

          <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto' }}>
            {/* Centre line */}
            <div style={{ position: 'absolute', left: 110, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${C.sage}66, ${C.border}, transparent)` }}/>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {JOURNEY.map(({ period, icon, label, desc }, i) => (
                <Reveal key={`j-${i}`} delay={i * 50}>
                  <div style={{ display: 'flex', gap: 28, paddingBottom: 36, alignItems: 'flex-start' }}>
                    {/* Period */}
                    <div style={{ width: 110, flexShrink: 0, textAlign: 'right', paddingTop: 2 }}>
                      <span style={{ fontFamily: "'Lora', serif", fontSize: 11, fontWeight: 600, color: C.sage, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{period}</span>
                    </div>
                    {/* Dot */}
                    <div style={{ width: 13, height: 13, borderRadius: '50%', background: C.sage, border: `3px solid ${C.parchment}`, flexShrink: 0, marginTop: 3, zIndex: 1, boxShadow: `0 0 0 3px ${C.sage}30` }}/>
                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 16 }}>{icon}</span>
                        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: C.ink, margin: 0 }}>{label}</h4>
                      </div>
                      <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, color: C.inkLight, lineHeight: 1.75, margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>~ what I believe ~</SectionLabel>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: C.ink, margin: '0 0 24px', letterSpacing: '-0.02em' }}>My values</h2>
              <BotanicDivider />
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '🌱', title: 'Grow with intention', body: 'Every line of code should serve a purpose. I resist feature creep the way a good gardener resists invasive plants.' },
              { icon: '🌸', title: 'Research-driven', body: 'Data should lead decisions. From 69 brain regions to Monte Carlo simulations, I let evidence shape what I build.' },
              { icon: '🦋', title: 'Lead by example', body: 'As EVP and Finance Director of Student Government, I learned that good leadership means tending the community around you.' },
            ].map(({ icon, title, body }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div style={{ background: C.parchmentDark, border: `1px solid ${C.border}`, borderRadius: 4, padding: '32px 28px' }}>
                  <span style={{ fontSize: 32, display: 'block', marginBottom: 16 }}>{icon}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: C.ink, margin: '0 0 12px' }}>{title}</h3>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: C.inkLight, lineHeight: 1.8, margin: 0 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
