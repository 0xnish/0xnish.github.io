import { links } from '../helper/constants'

export default function Footer() {
  return (
    <footer>
      <div>&copy; 2026 Nishanth J P</div>
      <div className="fl">
        <a href={links.github} target="_blank" rel="noopener">GitHub</a>
        <a href={links.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </footer>
  )
}
