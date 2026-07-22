import { skills } from '../helper/constants'

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
                {sk.iconElements.map((el, j) => {
                  const Tag = el.tag
                  return <Tag key={j} {...el.props} />
                })}
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
