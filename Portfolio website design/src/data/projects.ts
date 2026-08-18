export type ProjectData = {
  id: string
  title: string
  category: string
  year: string
  tagline: string
  desc: string
  details: string[]
  tags: string[]
  flower: string
  featured: boolean
  img: string
  github: string
  website: string
  extraImages: string[]
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'fitfindr',
    title: 'FitFindr',
    category: 'AI · Fitness',
    year: '2025',
    tagline: 'AI-powered fitness companion with an immersive 3D interface.',
    desc: 'FitFindr is an intelligent fitness recommendation platform that uses large language models via Groq to generate personalised workout and nutrition plans. The frontend is built with Three.js for an immersive 3D experience, while the Python/Flask backend handles LLM orchestration and user session management.',
    details: [
      'LLM-driven personalisation: Groq API powers real-time workout plan generation based on user goals, fitness level, and available equipment.',
      'Immersive 3D interface: Three.js renders animated 3D body models and interactive exercise visualisations directly in the browser.',
      'Flask REST API: lightweight backend handles auth, user profiles, and conversation history with the LLM.',
      'Responsive design: works across desktop and mobile with adaptive 3D scenes.',
    ],
    tags: ['Python', 'Flask', 'Groq', 'Three.js', 'LLMs', 'REST API'],
    flower: '#7a5a8a',
    featured: true,
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&auto=format',
    github: 'https://github.com/vaishnavibollapalli/',
    website: '#',
    extraImages: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop&auto=format',
    ],
  },
  {
    id: 'sentinel',
    title: 'Sentinel',
    category: 'Security',
    year: '2025',
    tagline: 'Real-time threat detection and network monitoring dashboard.',
    desc: 'Sentinel is a security monitoring platform that watches network traffic, detects anomalies, and surfaces alerts through a live dashboard. Built with a Python backend for packet analysis and a React frontend for real-time visualisation of threat data.',
    details: [
      'Anomaly detection: statistical baselines flag unusual traffic patterns without relying on signature databases.',
      'Live dashboard: React with WebSocket push delivers alerts and metrics in real time.',
      'Python packet analysis: Scapy-based capture pipeline processes and classifies traffic at the OS level.',
      'Alert triage: severity scoring system helps prioritise which events need immediate attention.',
    ],
    tags: ['Python', 'React', 'WebSockets', 'Scapy', 'Network Security'],
    flower: '#b85c6e',
    featured: true,
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop&auto=format',
    github: 'https://github.com/vaishnavibollapalli/',
    website: '#',
    extraImages: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop&auto=format',
    ],
  },
  {
    id: 'haven',
    title: 'Haven',
    category: 'Wellness',
    year: '2025',
    tagline: 'A safe digital space for mental wellness check-ins and journaling.',
    desc: "Haven is a mental wellness app designed around the insight that small, consistent check-ins matter more than occasional deep sessions. Inspired by Vishnavi's research on genetic risk factors and mental health, Haven helps users track mood patterns, journal freely, and identify early warning signs through gentle data visualisation.",
    details: [
      'Mood tracking: daily emoji-based check-ins feed into a longitudinal chart showing patterns over weeks and months.',
      'Private journaling: end-to-end encrypted journal entries that stay on-device unless the user opts to back up.',
      'Pattern insights: simple visualisations surface correlations between sleep, activity, and mood without clinical language.',
      'Crisis resources: a discreet button always links to local and national mental health hotlines.',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AES encryption'],
    flower: '#4a8a80',
    featured: false,
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format',
    github: 'https://github.com/vaishnavibollapalli/',
    website: '#',
    extraImages: [
      'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&h=500&fit=crop&auto=format',
    ],
  },
  {
    id: 'fitfin',
    title: 'FitFin',
    category: 'Finance · AI',
    year: '2025',
    tagline: 'AI-driven financial planning with Monte Carlo risk simulation.',
    desc: 'FitFin is a full-stack financial planning platform that combines AI-driven investment advice with quantitative risk modelling. Users input their portfolio and goals; the FastAPI backend runs thousands of Monte Carlo simulations and returns probability distributions of outcomes, surfaced through an intuitive React dashboard.',
    details: [
      'Monte Carlo engine: FastAPI backend runs 10,000+ simulations per query to model portfolio outcomes under market uncertainty.',
      'AI recommendations: Claude API provides contextual explanations of risk metrics in plain language.',
      'AWS infrastructure: Lambda functions, S3, and RDS PostgreSQL handle compute-intensive simulation workloads at scale.',
      'Next.js frontend: server-side rendering for fast initial load, with client-side chart interactivity via Recharts.',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'AWS', 'Monte Carlo', 'Claude API'],
    flower: '#4a7c59',
    featured: true,
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop&auto=format',
    github: 'https://github.com/vaishnavibollapalli/',
    website: '#',
    extraImages: [
      'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=800&h=500&fit=crop&auto=format',
    ],
  },
  {
    id: 'deadmans-switch',
    title: "Dead Man's Switch",
    category: 'Security',
    year: '2025',
    tagline: 'Time-gated encrypted message delivery triggered by inactivity.',
    desc: "Dead Man's Switch is a secure system for delivering encrypted messages if a user stops checking in. A Redis-backed heartbeat monitors user activity; if the heartbeat lapses, AES-256-encrypted messages stored in PostgreSQL are automatically released to designated recipients. Designed for journalists, activists, and anyone who needs a contingency communication plan.",
    details: [
      'AES-256 encryption: all message content is encrypted client-side before transmission; the server never sees plaintext.',
      'Redis heartbeat: a lightweight check-in mechanism (email link, API ping, or browser visit) resets the countdown timer.',
      'PostgreSQL message store: encrypted blobs with metadata for recipient routing, trigger conditions, and delivery history.',
      'Node.js orchestration: an event-driven backend handles timers, notifications, and the delivery pipeline.',
    ],
    tags: ['Node.js', 'Redis', 'AES-256', 'PostgreSQL', 'Encryption'],
    flower: '#c17f4a',
    featured: true,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format',
    github: 'https://github.com/vaishnavibollapalli/',
    website: '#',
    extraImages: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop&auto=format',
    ],
  },
  {
    id: 'unofficial-guide',
    title: 'Unofficial Guide',
    category: 'Campus · Web',
    year: '2024',
    tagline: 'The student-built guide to Georgia State University.',
    desc: "Unofficial Guide is a community-driven web app that surfaces the things GSU's official resources don't tell you — the best study spots, which professors curve generously, hidden campus amenities, and dining hacks. Built during Vishnavi's tenure in Student Government, where she saw first-hand what information students actually needed.",
    details: [
      'Community contributions: students submit tips that are moderated and categorised by a lightweight admin panel.',
      'Smart search: full-text search with category filters lets students find specific advice fast.',
      'Map integration: study spots and campus resources are pinned on an interactive campus map.',
      'Mobile-first: designed for students walking to class, not sitting at a desk.',
    ],
    tags: ['React', 'TypeScript', 'Supabase', 'Mapbox', 'Tailwind CSS'],
    flower: '#d4a843',
    featured: false,
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=500&fit=crop&auto=format',
    github: 'https://github.com/vaishnavibollapalli/',
    website: '#',
    extraImages: [
      'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=500&fit=crop&auto=format',
    ],
  },
]

export function getProject(id: string): ProjectData | undefined {
  return PROJECTS.find(p => p.id === id)
}
