import { memo, useCallback, useEffect, useRef } from 'react'
import {
  React, NextJs, TypeScript, JavaScript, TailwindCSS, Redux, CSharp,
  Java, Spring, Python, NodeJs, Git, GitHubDark, Docker, AWS, Linux,
  MySQL, PostgreSQL, MongoDB, Redis, OpenAI, ClaudeAI, Copilot,
  Tensorflow, PyTorch, Prisma, GraphQL, ViteJS, Supabase, Firebase,
  GoogleCloud, Jira, Postman, Anthropic, Figma,
  Kubernetes, Azure, HTML5, CSS3, Google, Canva, Android, Dart, Microsoft,
} from 'developer-icons'

const DURATION = 260
const LEAVE_DELAY = 200

const stacks = [
  { name: 'React', Icon: React },
  { name: 'Next.js', Icon: NextJs },
  { name: 'TypeScript', Icon: TypeScript },
  { name: 'JavaScript', Icon: JavaScript },
  { name: 'Tailwind', Icon: TailwindCSS },
  { name: 'Redux', Icon: Redux },
  { name: 'C#', Icon: CSharp },
  { name: '.NET', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path d="M0 0h256v256H0z" fill="none"/><path fill="#512bd4" d="M0 0h256v256H0z"/><path fill="#fff" d="M45.627 163.555q-2.715 0-4.615-1.809q-1.9-1.856-1.901-4.408q0-2.598 1.9-4.454q1.901-1.856 4.616-1.856q2.76 0 4.661 1.856q1.946 1.856 1.946 4.454q0 2.551-1.946 4.408q-1.9 1.81-4.66 1.81m72.361-1.02h-11.765L75.225 113.63a22 22 0 0 1-1.946-3.85h-.272l.047.305l.043.35l.04.393l.038.436l.049.736l.042.832l.035.93l.028 1.028l.02 1.125l.01.805l.01 2.2v43.614H62.961V96h12.535l29.957 47.743l.74 1.169l.477.768l.408.675l.34.583l.19.338l.16.296l.13.255h.18l-.034-.21l-.064-.45l-.06-.493l-.053-.537l-.024-.285l-.046-.602l-.04-.645l-.035-.69l-.042-1.114l-.03-1.212l-.018-1.31l-.006-1.407V96h10.362zm50.685 0h-36.428V96h34.98v9.373h-24.21v18.837h22.31v9.326h-22.31v19.673h25.658zm51.772-57.162H201.8v57.162h-10.77v-57.162h-18.6V96h48.014z"/></svg>' },
  { name: 'Unity', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128"><path d="M0 0h128v128H0z" fill="none"/><path d="m63.991 128l51.702-29.855l-19.817-11.461l-20.26 11.704a1.15 1.15 0 0 1-1.125-.009a1.15 1.15 0 0 1-.568-.975V69.608c0-.819.424-1.56 1.133-1.968L99.13 53.737a1.12 1.12 0 0 1 1.124.009c.352.195.572.564.576.966V78.11l19.83 11.454V29.855L63.99 62.566Zm0 0"/><path fill="#4d4d4d" d="m52.397 98.401l-20.27-11.718l-19.832 11.46L63.991 128V62.566L7.34 29.854V89.56l19.825-11.45V54.714c.009-.401.225-.77.572-.966a1.13 1.13 0 0 1 1.13-.009L52.953 67.64a2.28 2.28 0 0 1 1.133 1.97v27.8a1.16 1.16 0 0 1-.565.98a1.13 1.13 0 0 1-1.124.012"/><path fill="gray" d="M68.959 0v22.9L89.22 34.597c.348.203.555.576.555.984c0 .403-.212.772-.555.975L65.137 50.468a2.3 2.3 0 0 1-2.27 0L38.791 36.556a1.12 1.12 0 0 1-.56-.975a1.13 1.13 0 0 1 .56-.984L59.048 22.9V0L7.339 29.855l56.652 32.711l56.665-32.71Zm0 0"/></svg>' },
  { name: 'Java', Icon: Java },
  { name: 'Spring', Icon: Spring },
  { name: 'Python', Icon: Python },
  { name: 'Node.js', Icon: NodeJs },
  { name: 'Git', Icon: Git },
  { name: 'GitHub', Icon: GitHubDark },
  { name: 'Docker', Icon: Docker },
  { name: 'AWS', Icon: AWS },
  { name: 'Linux', Icon: Linux },
  { name: 'MySQL', Icon: MySQL },
  { name: 'PostgreSQL', Icon: PostgreSQL },
  { name: 'MongoDB', Icon: MongoDB },
  { name: 'Redis', Icon: Redis },
  { name: 'OpenAI', Icon: OpenAI },
  { name: 'Claude', Icon: ClaudeAI },
  { name: 'GitHub Copilot', Icon: Copilot },
  { name: 'TensorFlow', Icon: Tensorflow },
  { name: 'PyTorch', Icon: PyTorch },
  { name: 'LangChain', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#7fc8ff" d="M7.53 15.975a7.53 7.53 0 0 0 2.206-5.325A7.54 7.54 0 0 0 7.53 5.325L2.205 0A7.54 7.54 0 0 0 0 5.325a7.54 7.54 0 0 0 2.205 5.325zm11.144.493a7.54 7.54 0 0 0-5.325-2.206a7.54 7.54 0 0 0-5.325 2.206l5.325 5.325a7.54 7.54 0 0 0 5.325 2.205A7.54 7.54 0 0 0 24 21.793zM2.219 21.78a7.54 7.54 0 0 0 5.325 2.205v-7.53H.014a7.54 7.54 0 0 0 2.205 5.325M20.73 8.595a7.53 7.53 0 0 0-5.327-2.206a7.53 7.53 0 0 0-5.325 2.207l5.325 5.325z"/></svg>' },
  { name: 'Prisma', Icon: Prisma },
  { name: 'GraphQL', Icon: GraphQL },
  { name: 'Vite', Icon: ViteJS },
  { name: 'Supabase', Icon: Supabase },
  { name: 'Firebase', Icon: Firebase },
  { name: 'Google Cloud', Icon: GoogleCloud },
  { name: 'Jira', Icon: Jira },
  { name: 'Postman', Icon: Postman },
  { name: 'VS Code', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128"><path d="M0 0h128v128H0z" fill="none"/><mask id="SVGescYAbDI" width="128" height="128" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#fff" fill-rule="evenodd" d="M90.767 127.126a7.97 7.97 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.33 5.33 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64L1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.33 5.33 0 0 0 6.807.303l21.974-16.68l50.45 46.025a8 8 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z" clip-rule="evenodd"/></mask><g mask="url(#SVGescYAbDI)"><path fill="#0065a9" d="M123.471 13.82L97.097 1.12A7.97 7.97 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.33 5.33 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8 8 0 0 0-4.529-7.208Z"/><g filter="url(#SVGUBw6ic8w)"><path fill="#007acc" d="m123.471 114.181l-26.374 12.698A7.97 7.97 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.33 5.33 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8 8 0 0 1-4.529 7.208"/></g><g filter="url(#SVGg9RgH3Uo)"><path fill="#1f9cf0" d="M97.098 126.882A7.98 7.98 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.98 7.98 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21z"/></g><path fill="url(#SVGpqCa3cMW)" fill-rule="evenodd" d="M90.69 127.126a7.97 7.97 0 0 0 6.349-.244l26.353-12.681a8 8 0 0 0 4.53-7.21V21.009a8 8 0 0 0-4.53-7.21L97.039 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026l-21.974-16.68a5.33 5.33 0 0 0-6.807.302l-7.048 6.411a5.336 5.336 0 0 0-.006 7.888L20.718 64L1.662 81.386a5.335 5.335 0 0 0 .006 7.888l7.048 6.411a5.33 5.33 0 0 0 6.807.303l21.975-16.681l50.45 46.026a8 8 0 0 0 2.742 1.793m5.252-92.184L57.662 64l38.28 29.057z" clip-rule="evenodd" opacity=".25"/></g><defs><filter id="SVGUBw6ic8w" width="144.744" height="113.408" x="-8.411" y="22.594" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="4.167"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_36"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_1_36" result="shape"/></filter><filter id="SVGg9RgH3Uo" width="56.667" height="144.007" x="79.667" y="-8.004" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="4.167"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_36"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_1_36" result="shape"/></filter><linearGradient id="SVGpqCa3cMW" x1="63.922" x2="63.922" y1=".33" y2="127.67" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg>' },
  { name: 'Visual Studio', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128"><path d="M0 0h128v128H0z" fill="none"/><defs><linearGradient id="SVGZad1u4qS" x1="48" x2="48" y1="97.75" y2="2.25" gradientTransform="matrix(1 0 0 -1 0 97.75)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><path fill="#52218a" d="M14.39 26.295a5.3 5.3 0 0 0-1.417.373l-9.694 4A5.33 5.33 0 0 0 0 35.561v56.88a5.33 5.33 0 0 0 3.28 4.893l9.693 4.066a5.33 5.33 0 0 0 5.521-.865l2.172-1.867a2.947 2.947 0 0 1-4.666-2.4V31.734a2.947 2.947 0 0 1 4.666-2.4l-2.172-1.799a5.33 5.33 0 0 0-4.103-1.24z"/><path fill="#6c33af" d="M94.75.416A8 8 0 0 0 88 2.668l-82.666 91.4A3.08 3.08 0 0 1 0 92.002v.44a5.33 5.33 0 0 0 3.28 4.892l9.693 4.066a5.33 5.33 0 0 0 5.521-.865l2.172-1.867l99.08-81.24A5.053 5.053 0 0 1 128 21.334v-.307a8 8 0 0 0-4.533-7.213L97.094 1.121A8 8 0 0 0 94.75.416"/><path fill="#854cc7" d="M14.871 26.238a5.3 5.3 0 0 0-1.898.43l-9.694 4A5.33 5.33 0 0 0 0 35.561v.441a3.08 3.08 0 0 1 5.334-2.066L88 125.334a8 8 0 0 0 9.094 1.547l26.373-12.694a8 8 0 0 0 4.533-7.212v-.307a5.053 5.053 0 0 1-8.254 3.906l-99.08-81.24l-2.172-1.865a5.33 5.33 0 0 0-3.623-1.23z"/><path fill="#b179f1" d="M94.75.416a8 8 0 0 0-5.674 1.469A4.693 4.693 0 0 1 96 6.015v116a4.693 4.693 0 0 1-8 3.319a8 8 0 0 0 9.094 1.547l26.373-12.68a8 8 0 0 0 4.533-7.213V21.016a8 8 0 0 0-4.533-7.215L97.094 1.12A8 8 0 0 0 94.75.416m-5.674 1.469A4.7 4.7 0 0 0 88 2.668a8 8 0 0 1 1.076-.783"/><path fill="url(#SVGZad1u4qS)" fill-rule="evenodd" d="M94.145.348a8 8 0 0 0-3.026.386A8 8 0 0 0 88 2.668L45.494 49.682L20.666 29.334l-2.172-1.865a5.33 5.33 0 0 0-4.814-1.108a3.4 3.4 0 0 0-.707.24l-9.694 4.067A5.33 5.33 0 0 0 0 35.162v57.679a5.33 5.33 0 0 0 3.28 4.493l9.693 4a3.4 3.4 0 0 0 .707.24a5.33 5.33 0 0 0 4.814-1.105l2.172-1.801l24.828-20.346L88 125.334a8 8 0 0 0 3.854 2.135a8 8 0 0 0 5.24-.588l26.373-12.68a8 8 0 0 0 4.533-7.213V21.016a8 8 0 0 0-4.533-7.215L97.094 1.12a8 8 0 0 0-2.95-.773ZM96 36.908v54.186L62.947 64.002Zm-80 8.787l16.547 18.307L16 82.309Z" opacity=".25"/></svg>' },
  { name: 'Anthropic', svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill-rule="evenodd" d="M13.827 3.52h3.603L24 20h-3.603zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687L6.205 13.48H10.7z"/></svg>' },
  { name: 'Figma', Icon: Figma },
  { name: 'Kubernetes', Icon: Kubernetes },
  { name: 'Azure', Icon: Azure },
  { name: 'HTML', Icon: HTML5 },
  { name: 'CSS', Icon: CSS3 },
  { name: 'OpenCode', svg: '<svg width="240" height="300" viewBox="0 0 240 300" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1401_86274)"><mask id="mask0_1401_86274" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="300"><path d="M240 0H0V300H240V0Z" fill="white"/></mask><g mask="url(#mask0_1401_86274)"><path d="M180 240H60V120H180V240Z" fill="#CFCECD"/><path d="M180 60H60V240H180V60ZM240 300H0V0H240V300Z" fill="#211E1E"/></g></g><defs><clipPath id="clip0_1401_86274"><rect width="240" height="300" fill="white"/></clipPath></defs></svg>' },
  { name: 'Google', Icon: Google },
  { name: 'Canva', Icon: Canva },
  { name: 'Android', Icon: Android },
  { name: 'Dart', Icon: Dart },
  { name: 'Microsoft', Icon: Microsoft },
]

const COLS = 10
const ROWS = 5

const CSS = `
.ts-grid {
  display: grid;
  grid-template-columns: repeat(${COLS}, minmax(0, 1fr));
  grid-template-rows: repeat(${ROWS}, minmax(0, 1fr));
  gap: 0;
  width: 100%;
  perspective: 1600px;
  transform-style: preserve-3d;
}
.ts-cell {
  background: #e0e0e0;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 16px;
  cursor: default;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  overflow: visible;
  transition: transform ${DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), background ${DURATION}ms ease;
}
@media (hover: hover) and (pointer: fine) {
  .ts-cell:hover {
    background: #ffffff !important;
  }
}
.ts-cell-small {
  transform: scale(1.05) translate(-5px, -5px) translateZ(0);
}
.ts-cell-big {
  transform: scale(1.15) translate(-20px, -20px) translateZ(15px);
}
.ts-logo {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
  filter: none;
  transition: opacity ${DURATION}ms ease;
  user-select: none;
  pointer-events: none;
}
.ts-logo span,
.ts-logo svg,
.ts-logo img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
  filter: grayscale(0);
  transform: translateZ(0);
  transition: transform ${DURATION}ms cubic-bezier(0.16, 1, 0.3, 1);
}
.ts-cell-big .ts-logo span,
.ts-cell-big .ts-logo svg,
.ts-cell-big .ts-logo img {
  transform: scale(1.15);
}
@media (hover: hover) and (pointer: fine) {
  .ts-cell:hover .ts-logo span,
  .ts-cell:hover .ts-logo svg,
  .ts-cell:hover .ts-logo img {
    transform: scale(1.15);
  }
}
.ts-cell-big .ts-logo {
  opacity: 1;
}
@media (hover: hover) and (pointer: fine) {
  .ts-cell:hover .ts-logo {
    opacity: 1;
  }
}
body.light .ts-cell {
  background: #f0ece6;
  border-color: rgba(193,61,16,0.12);
}
@media (hover: hover) and (pointer: fine) {
  body.light .ts-cell:hover {
    background: #e8e4dc;
  }
}
`

const Cell = memo(function Cell({ i, stack, onEnter }) {
  return (
    <div
      className="ts-cell"
      data-i={i}
      onPointerEnter={onEnter}

      style={{ zIndex: i + 1 }}
    >
      <div className="ts-logo">
        {stack.svg ? (
          <span dangerouslySetInnerHTML={{ __html: stack.svg }} />
        ) : stack.Icon ? (
          <stack.Icon size={36} />
        ) : (
          <span style={{ fontSize: '14px', fontWeight: 600, opacity: 0.7 }}>{stack.text}</span>
        )}
      </div>
    </div>
  )
})

export default function TechStacks() {
  const gridRef = useRef(null)
  const leaveTimer = useRef(null)

  useEffect(() => {
    return () => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }
  }, [])

  const onEnter = useCallback((e) => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
    const cell = e.currentTarget
    const i = +cell.dataset.i
    const grid = gridRef.current
    if (!grid) return

    const cols = grid.children[0] ? Math.round(grid.getBoundingClientRect().width / grid.children[0].getBoundingClientRect().width) : COLS

    const prevBig = grid.querySelector('.ts-cell-big')
    if (prevBig) prevBig.classList.remove('ts-cell-big')
    grid.querySelectorAll('.ts-cell-small').forEach(c => c.classList.remove('ts-cell-small'))

    cell.classList.add('ts-cell-big')
    cell.style.zIndex = 60

    const col = i % cols
    const neighbours = []
    if (col !== 0) neighbours.push(i - 1)
    if (col !== cols - 1) neighbours.push(i + 1)
    neighbours.push(i - cols)
    neighbours.push(i + cols)

    for (const n of neighbours) {
      if (n >= 0 && n < grid.children.length) {
        const nc = grid.children[n]
        if (nc) {
          nc.classList.add('ts-cell-small')
          nc.style.zIndex = 55
        }
      }
    }
  }, [])

  const onLeave = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => {
      const grid = gridRef.current
      if (!grid) return
      const big = grid.querySelector('.ts-cell-big')
      if (big) { big.classList.remove('ts-cell-big'); big.style.zIndex = '' }
      grid.querySelectorAll('.ts-cell-small').forEach(c => { c.classList.remove('ts-cell-small'); c.style.zIndex = '' })
    }, LEAVE_DELAY)
  }, [])

  return (
    <section className="techstacks-section" id="techstacks">
      <style>{CSS}</style>
      <div className="sec-label">
        <span className="bracket">[ </span>Tech Stacks<span className="bracket"> ]</span>
        <span className="sec-label-line"></span>
      </div>
      <h2 className="rv">Tools I <em>work with.</em></h2>
      <div className="ts-grid" ref={gridRef} onPointerLeave={onLeave}>
        {stacks.map((stack, i) => (
          <Cell key={i} i={i} stack={stack} onEnter={onEnter} />
        ))}
      </div>
    </section>
  )
}
