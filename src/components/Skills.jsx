const skills = [
  {
    num: '01',
    icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    name: 'Backend Development',
    desc: 'Building robust, scalable server-side systems and APIs that power modern applications.'
  },
  {
    num: '02',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>,
    name: 'Frontend Engineering',
    desc: 'Crafting responsive, performant user interfaces with attention to every pixel and interaction.'
  },
  {
    num: '03',
    icon: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></>,
    name: 'System Design',
    desc: 'Architecting distributed systems that scale with thoughtful design and engineering principles.'
  },
  {
    num: '04',
    icon: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    name: 'Database Engineering',
    desc: 'Designing efficient database schemas and query optimization for high-performance applications.'
  },
  {
    num: '05',
    icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    name: 'Cloud & DevOps',
    desc: 'Deploying and managing cloud infrastructure with CI/CD pipelines and containerization.'
  },
  {
    num: '06',
    icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    name: 'Problem Solving',
    desc: 'Breaking down complex challenges into elegant solutions with analytical thinking and creativity.'
  },
]

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="sec-label">
        <span className="bracket">[ </span>Expertise<span className="bracket"> ]</span>
        <span className="sec-label-line"></span>
      </div>
      <div className="skills-grid">
        {skills.map((sk, i) => (
          <div key={i} className="sk">
            <div className="sk-glow"></div>
            <div className="sk-num">{sk.num}</div>
            <div className="sk-iw">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {sk.icon}
              </svg>
            </div>
            <div className="sk-name">{sk.name}</div>
            <div className="sk-desc">{sk.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
