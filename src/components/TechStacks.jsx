import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import StackIcon from 'tech-stack-icons'

const DURATION = 200
const LEAVE_DELAY = 200

const stacks = [
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'Redux', icon: 'redux' },
  { name: 'C#', icon: 'c#' },
  { name: '.NET', icon: 'net' },
  { name: 'Unity', icon: 'unity' },
  { name: 'Java', icon: 'java' },
  { name: 'Spring', icon: 'spring' },
  { name: 'Python', icon: 'python' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Docker', icon: 'docker' },
  { name: 'AWS', icon: 'aws' },
  { name: 'Linux', icon: 'linux' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Redis', icon: 'redis' },
  { name: 'OpenAI', icon: 'openai' },
  { name: 'Claude', icon: 'claude' },
  { name: 'GitHub Copilot', icon: 'copilotgithub' },
  { name: 'TensorFlow', icon: 'tensorflow' },
  { name: 'PyTorch', icon: 'pytorch' },
  { name: 'LangChain', icon: 'langchain' },
  { name: 'Prisma', icon: 'prisma' },
  { name: 'GraphQL', icon: 'graphql' },
  { name: 'Vite', icon: 'vitejs' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Google Cloud', icon: 'gcloud' },
  { name: 'Jira', icon: 'jira' },
  { name: 'Postman', icon: 'postman' },
  { name: 'VS Code', icon: 'vscode' },
  { name: 'Visual Studio', icon: 'visualstudio' },
  { name: 'Anthropic', icon: 'anthropic' },
  { name: 'Figma', icon: 'figma' },
  { name: 'Kubernetes', icon: 'kubernetes' },
  { name: 'Azure', icon: 'azure' },
  { name: 'HTML', icon: 'html5' },
  { name: 'CSS', icon: 'css3' },
  { name: 'OpenCode', icon: 'opencode' },
  { name: 'Google', icon: 'google' },
  { name: 'Canva', icon: 'canva' },
  { name: 'Android', icon: 'android' },
  { name: 'Dart', icon: 'dart' },
  { name: 'Microsoft', icon: 'microsoft' },
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
  will-change: transform;
  transition: transform ${DURATION}ms ease, background ${DURATION}ms ease;
}
.ts-cell:hover {
  background: #ffffff !important;
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
  will-change: transform;
}
.ts-logo span,
.ts-logo svg,
.ts-logo img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
  filter: grayscale(0);
}
.ts-cell:hover .ts-logo span,
.ts-cell:hover .ts-logo svg,
.ts-cell:hover .ts-logo img,
.ts-cell-big .ts-logo span,
.ts-cell-big .ts-logo svg,
.ts-cell-big .ts-logo img {
  transform: scale(1.15);
}
.ts-cell:hover .ts-logo,
.ts-cell-big .ts-logo {
  opacity: 1;
}
body.light .ts-cell {
  background: #f0ece6;
  border-color: rgba(193,61,16,0.12);
}
body.light .ts-cell:hover {
  background: #e8e4dc;
}
`

const Cell = memo(function Cell({ i, icon, onEnter }) {
  return (
    <div
      className="ts-cell"
      data-i={i}
      onPointerEnter={onEnter}
      style={{ zIndex: i + 1 }}
    >
      <div className="ts-logo">
        <StackIcon name={icon} style={{ width: '100%', height: '100%' }} />
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
        {stacks.map((tech, i) => (
          <Cell key={i} i={i} icon={tech.icon} onEnter={onEnter} />
        ))}
      </div>
    </section>
  )
}
