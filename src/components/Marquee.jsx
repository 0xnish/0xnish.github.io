import { marqueeItems } from '../helper/constants'

export default function Marquee() {
  return (
    <div className="mq-wrap">
      <div className="mq-track">
        <div className="mq-content">
          {marqueeItems.map((item, i) => (
            <span key={i} className="mq-item">{item}<span className="md">&#10022;</span></span>
          ))}
        </div>
        <div className="mq-content" aria-hidden="true">
          {marqueeItems.map((item, i) => (
            <span key={i} className="mq-item">{item}<span className="md">&#10022;</span></span>
          ))}
        </div>
      </div>
    </div>
  )
}
