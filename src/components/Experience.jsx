export default function Experience() {
  return (
    <section className="exp-section" id="experience">
      <div className="sec-label">
        <span className="bracket">[ </span>Experience<span className="bracket"> ]</span>
        <span className="sec-label-line"></span>
      </div>
      <div className="exp-bento">
        {/* Header tile */}
        <div className="eb-tile eb-header rv">
          <div className="eb-glow"></div>
          <div className="eb-header-label">Career Path</div>
          <div className="eb-header-title">
            <span className="eb-title-line1">Where I've</span>
            <em>been &amp; grown.</em>
          </div>
          <p className="eb-header-desc">From managing front desks at luxury hill-station resorts to building software — a journey driven by curiosity, grit, and a love for craft.</p>
          <div className="eb-header-stats">
            <div className="eb-stat"><span className="eb-stat-val">2</span><span className="eb-stat-key">Roles</span></div>
            <div className="eb-stat"><span className="eb-stat-val">3.5+</span><span className="eb-stat-key">Years</span></div>
            <div className="eb-stat"><span className="eb-stat-val">1</span><span className="eb-stat-key">Big Pivot</span></div>
          </div>
        </div>

        {/* Journey tile */}
        <div className="eb-tile eb-journey rv" style={{ transitionDelay: '.09s' }}>
          <div className="eb-glow"></div>
          <div className="eb-journey-label">Timeline</div>
          <div className="eb-journey-track">
            <div className="eb-journey-line"></div>
            <div className="eb-journey-step">
              <div className="eb-journey-dot"></div>
              <div className="eb-journey-info">
                <span className="eb-journey-year">Jan 2021</span>
                <span className="eb-journey-role">Front Office Assistant</span>
              </div>
            </div>
            <div className="eb-journey-step">
              <div className="eb-journey-dot eb-journey-dot--mid"></div>
              <div className="eb-journey-info">
                <span className="eb-journey-year">Aug 2021 – Jul 2024</span>
                <span className="eb-journey-role">Front Office Executive</span>
              </div>
            </div>
            <div className="eb-journey-step">
              <div className="eb-journey-dot eb-journey-dot--now"></div>
              <div className="eb-journey-info">
                <span className="eb-journey-year">2024 → Now</span>
                <span className="eb-journey-role">Software Engineer</span>
              </div>
            </div>
          </div>
          <div className="eb-pivot-inline">
            <span className="eb-pivot-inline-from">Hospitality</span>
            <svg viewBox="0 0 40 10" fill="none" width="40" height="10">
              <path d="M0 5h34M30 1l6 4-6 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="eb-pivot-inline-to">Engineering</span>
            <span className="eb-pivot-inline-label">Career Pivot</span>
          </div>
        </div>

        {/* Role 01 */}
        <div className="eb-tile eb-role rv" style={{ transitionDelay: '.18s' }}>
          <div className="eb-glow"></div>
          <div className="eb-role-num">01</div>
          <div className="eb-role-period"><span className="eb-dot"></span>Jan 2021 — Jun 2021 &nbsp;&middot;&nbsp; 6 months</div>
          <div className="eb-role-title">Front Office <em>Assistant</em></div>
          <div className="eb-role-company">RowanTree by Poppys</div>
          <div className="eb-role-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="11" height="11">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Kodaikanal, Tamil Nadu
          </div>
          <p className="eb-role-desc">Managed front desk operations — guest check-ins, check-outs, and reservations. Delivered seamless hospitality at this boutique Kodaikanal property.</p>
          <div className="eb-highlights-row">
            <div className="eb-hl"><span className="eb-hl-val">6 mo</span><span className="eb-hl-key">Tenure</span></div>
            <div className="eb-hl"><span className="eb-hl-val">Boutique</span><span className="eb-hl-key">Property</span></div>
            <div className="eb-hl"><span className="eb-hl-val">Start</span><span className="eb-hl-key">Role</span></div>
          </div>
          <div className="eb-role-tags">
            <span className="eb-tag">Hospitality</span>
            <span className="eb-tag">Guest Relations</span>
            <span className="eb-tag">Front Desk</span>
            <span className="eb-tag">Reservations</span>
          </div>
        </div>

        {/* Role 02 */}
        <div className="eb-tile eb-role eb-role--featured rv" style={{ transitionDelay: '.27s' }}>
          <div className="eb-glow"></div>
          <div className="eb-role-num">02</div>
          <div className="eb-role-period"><span className="eb-dot eb-dot--active"></span>Aug 2021 — Jul 2024 &nbsp;&middot;&nbsp; 3 years</div>
          <div className="eb-role-title">Front Office <em>Executive</em></div>
          <div className="eb-role-company">Germanus Springs</div>
          <div className="eb-role-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="11" height="11">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Kodaikanal, Tamil Nadu
          </div>
          <p className="eb-role-desc">Led front office operations for a premium resort — end-to-end guest relations, team coordination, billing systems, and consistently high service standards.</p>
          <div className="eb-highlights-row">
            <div className="eb-hl"><span className="eb-hl-val">3 yrs</span><span className="eb-hl-key">Tenure</span></div>
            <div className="eb-hl"><span className="eb-hl-val">100%</span><span className="eb-hl-key">Satisfaction</span></div>
            <div className="eb-hl"><span className="eb-hl-val">Lead</span><span className="eb-hl-key">Role</span></div>
          </div>
          <div className="eb-role-tags">
            <span className="eb-tag">Operations Lead</span>
            <span className="eb-tag">Team Management</span>
            <span className="eb-tag">Billing Systems</span>
            <span className="eb-tag">Premium Service</span>
          </div>
        </div>
      </div>
    </section>
  )
}
