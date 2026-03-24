export default function Marquee() {
  const items = ['Software Engineering', 'Yottron Solutions', 'Clean Architecture', 'Problem Solving', 'Innovation', 'Scalable Systems', 'Full Stack Dev', 'Open Source']
  const doubled = [...items, ...items]
  return (
    <div className="mq-wrap">
      <div className="mq">
        {doubled.map((item, i) => (
          <span key={i} className="mq-item">{item}<span className="md">&#10022;</span></span>
        ))}
      </div>
    </div>
  )
}
