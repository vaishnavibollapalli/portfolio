import { C, Reveal, SectionLabel, BotanicDivider } from '../components/shared'

const RESEARCH = [
  {
    id: 1,
    role: 'Research Assistant',
    period: 'May 2025 – Present',
    lab: 'Neuroscience & Mental Health Lab · Georgia State University',
    title: 'Genetic Risk Factors & Mental Illness',
    status: 'Active',
    color: C.lavender,
    icon: '🧠',
    summary:
      'Investigating how polygenic risk scores interact with brain structure across 69 cortical and subcortical regions to predict mental illness outcomes. This work sits at the intersection of computational neuroscience, genetics, and clinical psychology.',
    highlights: [
      'Analysed the ABCD (Adolescent Brain Cognitive Development) dataset — one of the largest longitudinal studies of brain development in the US, with data from over 11,000 children.',
      'Applied MANCOVA (Multivariate Analysis of Covariance) and Latent Growth Curve Modelling (LGCM) in R using the lavaan package to examine trajectories of brain development across 69 regions.',
      'Developed R scripts for data cleaning, feature engineering, and statistical modelling of neuroimaging data.',
      'Presented preliminary findings to the Georgia Board of Regents, communicating research implications to a non-technical policy audience.',
    ],
    methods: ['R', 'lavaan', 'MANCOVA', 'LGCM', 'ABCD Dataset', 'Neuroimaging Analysis'],
    impact: 'Presented to GA Board of Regents',
    quote: 'Understanding the genetic underpinnings of mental illness requires both rigorous statistical methodology and careful human interpretation.',
  },
  {
    id: 2,
    role: 'Research Analyst',
    period: 'May 2026 – Present',
    lab: 'Cognitive & Perceptual Sciences Lab · Georgia State University',
    title: 'Eye-Tracking Gaze Visualisation',
    status: 'Active',
    color: C.teal,
    icon: '👁️',
    summary:
      "Studying attentional patterns across 48 participants using iMotions eye-tracking hardware and R-based analysis pipelines. The goal is to understand how people visually navigate complex information environments — with applications in UX design, education, and cognitive science.",
    highlights: [
      'Processed raw gaze data from 48 participants captured via iMotions eye-tracking apparatus, including fixation detection, saccade classification, and AOI (Area of Interest) mapping.',
      'Built animated gaze-path visualisations using ggplot2 and gganimate in R, enabling intuitive exploration of individual and aggregate attentional patterns.',
      'Developed a reusable R pipeline for importing, cleaning, and visualising iMotions output files, reducing per-participant processing time significantly.',
      'Investigating differences in gaze behaviour across participant subgroups to surface statistically significant patterns.',
    ],
    methods: ['R', 'iMotions', 'ggplot2', 'gganimate', 'Eye-Tracking', 'AOI Analysis'],
    impact: '48 participants · ongoing analysis',
    quote: 'Where the eye goes, attention follows — and attention shapes everything from learning to design.',
  },
]

export default function Research() {
  return (
    <div style={{ minHeight: '100vh', background: C.parchment }}>
      {/* Header */}
      <div style={{ background: C.sageDark, padding: '64px 60px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&h=400&fit=crop&auto=format")`, backgroundSize: 'cover', backgroundPosition: 'center 40%', opacity: 0.15 }}/>
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel>~ what I study ~</SectionLabel>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,64px)', fontWeight: 400, color: 'white', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
            Research
          </h1>
          <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 16, color: 'rgba(200,228,210,0.72)', margin: 0 }}>
            Two active research roles at Georgia State University
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 60px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <BotanicDivider />
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {RESEARCH.map((r, idx) => (
            <Reveal key={r.id} delay={idx * 100}>
              <div style={{ display: 'grid', gridTemplateColumns: idx % 2 === 0 ? '1fr 2fr' : '2fr 1fr', gap: 56, alignItems: 'start' }}>

                {/* Info card (alternates sides) */}
                {idx % 2 === 1 && (
                  <div style={{ order: 2 }}>
                    <InfoCard r={r} />
                  </div>
                )}

                {/* Main content */}
                <div style={{ order: idx % 2 === 0 ? 2 : 1 }}>
                  {/* Role badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 20 }}>{r.icon}</span>
                    <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: 14, color: r.color, letterSpacing: '0.06em' }}>{r.role}</span>
                    <span style={{ fontFamily: "'Lora', serif", fontSize: 11, color: 'white', background: r.color, padding: '2px 10px', borderRadius: 20 }}>{r.status}</span>
                  </div>

                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,3vw,40px)', fontWeight: 700, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    {r.title}
                  </h2>
                  <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, color: C.inkFaint, margin: '0 0 20px' }}>{r.lab}</p>

                  <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: C.inkLight, lineHeight: 1.9, margin: '0 0 28px' }}>
                    {r.summary}
                  </p>

                  {/* Highlights */}
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 14px' }}>Key contributions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                    {r.highlights.map((h, i) => (
                      <div key={`h-${r.id}-${i}`} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.color, flexShrink: 0, marginTop: 7 }}/>
                        <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: C.inkLight, lineHeight: 1.8, margin: 0 }}>{h}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote style={{ borderLeft: `3px solid ${r.color}`, paddingLeft: 18, margin: '0', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 16, color: C.inkLight, lineHeight: 1.65 }}>
                    "{r.quote}"
                  </blockquote>
                </div>

                {idx % 2 === 0 && (
                  <div>
                    <InfoCard r={r} />
                  </div>
                )}
              </div>

              {idx < RESEARCH.length - 1 && (
                <div style={{ marginTop: 72, display: 'flex', justifyContent: 'center' }}>
                  <BotanicDivider />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

function InfoCard({ r }: { r: typeof RESEARCH[0] }) {
  return (
    <div style={{ background: 'white', border: `1px solid ${C.border}`, borderRadius: 6, padding: '28px 24px', position: 'sticky', top: 24 }}>
      {/* Accent bar */}
      <div style={{ height: 4, background: `linear-gradient(to right, ${r.color}, transparent)`, borderRadius: 2, marginBottom: 20 }}/>

      <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: C.inkFaint, marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Period</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: C.ink, marginBottom: 20 }}>{r.period}</div>

      <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: C.inkFaint, marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Impact</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: r.color, marginBottom: 20 }}>{r.impact}</div>

      <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: C.inkFaint, marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Methods & Tools</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {r.methods.map(m => (
          <span key={m} style={{ fontFamily: "'Lora', serif", fontSize: 11, color: r.color, background: `${r.color}14`, padding: '3px 10px', borderRadius: 20, border: `1px solid ${r.color}30` }}>{m}</span>
        ))}
      </div>
    </div>
  )
}
