import { useState } from 'react'
import { C, Reveal, BotanicDivider, SectionLabel, Vine, Fireflies } from '../components/shared'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSent(true); setSending(false) }, 1400)
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%', padding: '14px 16px',
    background: focused === field ? 'white' : C.parchment,
    border: `1px solid ${focused === field ? C.sage : C.border}`,
    borderRadius: 4, color: C.ink,
    fontFamily: "'Lora', serif", fontSize: 15,
    outline: 'none', transition: 'all 0.25s', boxSizing: 'border-box',
  })

  return (
    <div style={{ minHeight: '100vh', background: C.parchment }}>
      {/* Header */}
      <div style={{ background: C.sageDark, padding: '64px 60px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("https://images.unsplash.com/photo-1780906467335-72f490a038c4?w=1400&h=400&fit=crop&auto=format")`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel>~ let's talk ~</SectionLabel>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,64px)', fontWeight: 400, color: 'white', margin: 0, letterSpacing: '-0.03em' }}>Get in touch</h1>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 80 }}><Vine side="left" height={600} /></div>
        <div style={{ position: 'absolute', right: 0, top: 80 }}><Vine side="right" height={500} /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left: info */}
          <Reveal>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: C.ink, margin: '0 0 8px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Every great garden
              </h2>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 40, fontWeight: 300, color: C.sage, margin: '0 0 28px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                starts with a seed.
              </h2>
              <div style={{ marginBottom: 32 }}>
                <BotanicDivider />
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: C.inkLight, lineHeight: 1.9, margin: '0 0 40px', fontStyle: 'italic' }}>
                Have a project in mind? An idea that needs tending? Or just want to say hello? I'd love to hear from you — I respond to every message personally.
              </p>

              {/* Direct email */}
              <a href="mailto:vaishnavibollapalli@gmail.com" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 20, color: C.sage, textDecoration: 'none', display: 'inline-block', borderBottom: `2px solid ${C.sage}44`, paddingBottom: 4, marginBottom: 48, transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.sage)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.sage}44`)}
              >vaishnavibollapalli@gmail.com</a>

              {/* Social */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { label: 'GitHub',   handle: '@vaishnavibollapalli', href: 'https://github.com/vaishnavibollapalli/' },
                  { label: 'LinkedIn', handle: 'vishnavi-abhishita-bollapalli', href: 'https://www.linkedin.com/in/vishnavi-abhishita-bollapalli-3885b82b6/' },
                  { label: 'Phone',    handle: '(404) 637-4332', href: 'tel:+14046374332' },
                  { label: 'Location', handle: 'Atlanta, GA 30328', href: '#' },
                ].map(({ label, handle, href }) => (
                  <a key={label} href={href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: `1px solid ${C.border}`, textDecoration: 'none', transition: 'padding-left 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.paddingLeft = '10px' }}
                    onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0' }}
                  >
                    <span style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 13, color: C.inkFaint }}>{label}</span>
                    <span style={{ fontFamily: "'Lora', serif", fontSize: 14, color: C.ink }}>{handle}</span>
                    <span style={{ color: C.sage, fontSize: 16 }}>→</span>
                  </a>
                ))}
                <div style={{ borderTop: `1px solid ${C.border}` }} />
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={120}>
            {sent ? (
              <div style={{ background: C.sageFaint, border: `1px solid ${C.sage}55`, borderRadius: 4, padding: '60px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>🌸</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: C.sageDark, margin: '0 0 12px' }}>Message sent!</h3>
                <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 15, color: C.inkLight, lineHeight: 1.8, margin: '0 0 32px' }}>
                  Thank you for reaching out. I'll get back to you as soon as the garden allows.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }} style={{ fontFamily: "'Lora', serif", fontSize: 14, background: C.sage, color: 'white', padding: '12px 28px', border: 'none', borderRadius: 40, cursor: 'pointer' }}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, background: 'white', border: `1px solid ${C.border}`, borderRadius: 4, padding: '40px 36px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 24, fontWeight: 400, color: C.ink, margin: '0 0 4px' }}>Send a note</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 12, color: C.inkFaint, display: 'block', marginBottom: 6, letterSpacing: '0.05em' }}>Your name</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} placeholder="Alex" style={inputStyle('name')} required />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 12, color: C.inkFaint, display: 'block', marginBottom: 6, letterSpacing: '0.05em' }}>Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} placeholder="you@example.com" style={inputStyle('email')} required />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 12, color: C.inkFaint, display: 'block', marginBottom: 6, letterSpacing: '0.05em' }}>Subject</label>
                  <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} placeholder="Let's work together…" style={inputStyle('subject')} />
                </div>

                <div>
                  <label style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 12, color: C.inkFaint, display: 'block', marginBottom: 6, letterSpacing: '0.05em' }}>Message</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)} placeholder="Tell me about your project, your idea, or just say hi…" rows={5} style={{ ...inputStyle('msg'), resize: 'vertical' as const }} required />
                </div>

                <button type="submit" disabled={sending} style={{ padding: '15px', background: sending ? `${C.sage}88` : C.sage, border: 'none', borderRadius: 4, color: 'white', fontFamily: "'Lora', serif", fontSize: 15, cursor: sending ? 'default' : 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, letterSpacing: '0.04em' }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.background = C.sageDark }}
                  onMouseLeave={e => { if (!sending) e.currentTarget.style.background = C.sage }}
                >
                  {sending ? <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>🌿</span> Sending…</> : <>Let's get in touch →</>}
                </button>

                <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: C.night, padding: '48px 60px', position: 'relative', overflow: 'hidden' }}>
        <Fireflies count={8} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 20, color: C.sagePale, opacity: 0.5, margin: 0 }}>
            Tended with care · © 2026 Vishnavi Abhishikta Bollapalli
          </p>
        </div>
        <style>{`@keyframes firefly { 0%,100%{opacity:0;transform:translate(0,0)} 20%{opacity:0.9} 50%{opacity:0.3;transform:translate(28px,-18px)} 80%{opacity:0.8;transform:translate(-12px,8px)} }`}</style>
      </div>
    </div>
  )
}
