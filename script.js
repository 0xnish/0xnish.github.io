// ─── ANIMATED FAVICON ───
(function(){
  const S        = 64;
  const CHAR     = '\u0BA8\u0BBF'; // நி
  const FLIP_DUR  = 500;
  const PAUSE_DUR = 2500;
  const CYCLE     = FLIP_DUR + PAUSE_DUR;

  const old = document.getElementById('faviconEl');
  if(old) old.remove();
  const link = document.createElement('link');
  link.rel  = 'icon';
  link.type = 'image/png';
  document.head.appendChild(link);

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext('2d');

  const start = performance.now();

  function draw(){
    const e  = performance.now() - start;
    const cp = e % CYCLE;
    const scaleX = cp < FLIP_DUR ? Math.cos((cp / FLIP_DUR) * Math.PI) : 1;

    ctx.clearRect(0, 0, S, S);
    ctx.save();
    ctx.translate(S/2, S/2);
    ctx.scale(scaleX, 1);
    ctx.font = "bold 44px 'Noto Sans Tamil', sans-serif";
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = '#ff6600';
    ctx.fillText(CHAR, 0, 2);
    ctx.restore();

    link.href = canvas.toDataURL('image/png');
  }

  function loop(){
    draw();
    requestAnimationFrame(loop);
  }

  document.fonts.load("bold 44px 'Noto Sans Tamil'").then(() => {
    requestAnimationFrame(loop);
  }).catch(() => requestAnimationFrame(loop));
})();

// ─── LOADER ───
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const ld=document.getElementById('loader');
    ld.classList.add('hide');
    setTimeout(()=>{ld.style.display='none'},800);
  },400);
});

// ─── SCROLL PROGRESS ───
window.addEventListener('scroll',()=>{const sp=document.getElementById('sp');const pct=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;sp.style.width=pct+'%'});

// ─── STARS ───
(function(){
  const c=document.getElementById('starCanvas');
  const isMobile = window.innerWidth <= 768 || navigator.maxTouchPoints > 0;
  if(isMobile){ c.style.display='none'; return; }
  const ctx=c.getContext('2d');
  let W,H,stars=[];
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight}
  resize();
  window.addEventListener('resize',resize);
  for(let i=0;i<180;i++) stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.2,v:Math.random()*.3+.05,a:Math.random(),da:Math.random()*.005+.002,t:Math.random()>.7?1:0});
  function getColors(){
    const isLight=document.body.classList.contains('light');
    return isLight
      ? ['rgba(193,61,16,','rgba(220,50,30,']
      : ['rgba(200,169,126,','rgba(126,184,200,'];
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    const cols=getColors();
    const isLight=document.body.classList.contains('light');
    stars.forEach(s=>{
      s.a+=s.da;if(s.a>1||s.a<0)s.da*=-1;
      const alpha = isLight ? Math.max(s.a, 0.28) : s.a;
      const radius = isLight ? s.r * 1.3 : s.r;
      ctx.beginPath();ctx.arc(s.x,s.y,radius,0,Math.PI*2);
      ctx.fillStyle=cols[s.t]+alpha+')';ctx.fill();
      s.y-=s.v;if(s.y<-5){s.y=H+5;s.x=Math.random()*W;}
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// ─── CUSTOM CURSOR ───
const _isMobile = window.innerWidth <= 768 || navigator.maxTouchPoints > 0;
const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring');
if(!_isMobile){
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
  (function loop(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();
  document.querySelectorAll('a,button,.donate-card').forEach(el=>{el.addEventListener('mouseenter',()=>{cur.classList.add('h');ring.classList.add('h')});el.addEventListener('mouseleave',()=>{cur.classList.remove('h');ring.classList.remove('h')})});
}

// ─── CLICK RIPPLE ───
if(!_isMobile) document.addEventListener('click',e=>{const r=document.createElement('div');r.className='ripple-click';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),700)});

// ─── NAME ANIMATION ───
const h1el=document.getElementById('h1text');
const lineData=[
  [{t:'Nishanth',cls:''},{t:' ',cls:'gap-span'},{t:'J',cls:'italic-span'},{t:' ',cls:'gap-span'},{t:'P',cls:'italic-span'}]
];
const allCharSpans=[];
lineData.forEach((line)=>{const lineDiv=document.createElement('div');line.forEach(part=>{[...part.t].forEach((ch)=>{const span=document.createElement('span');span.className='char'+(part.cls?' '+part.cls:'');span.textContent=ch;span.style.opacity='0';span.style.display='inline-block';lineDiv.appendChild(span);allCharSpans.push(span)});});h1el.appendChild(lineDiv)});
function triggerGlow(span,delay){setTimeout(()=>{span.style.transition='none';span.style.opacity='0';span.style.transform='scale(1.7)';span.style.filter='blur(4px)';requestAnimationFrame(()=>requestAnimationFrame(()=>{span.style.transition='opacity 0.4s ease, transform 0.5s cubic-bezier(.16,1,.3,1), filter 0.4s ease';span.style.opacity='1';span.style.transform='scale(1)';span.style.filter='blur(0px)'}));},delay)}
const startDelay=800;let animIdx=0;
allCharSpans.forEach((span)=>{const isSpace=span.textContent===' '||span.textContent.trim()==='';if(isSpace){span.style.opacity='1';return;}triggerGlow(span,startDelay+animIdx*120);animIdx++});
const introEnd=startDelay+allCharSpans.length*160+600;
setTimeout(function runWave(){let waveIdx=0;allCharSpans.forEach((ch)=>{const isSpace=ch.textContent===' '||ch.textContent.trim()==='';if(isSpace)return;setTimeout(()=>{ch.style.transition='transform 0.3s cubic-bezier(.16,1,.3,1)';ch.style.transform='scale(1.18)';setTimeout(()=>{ch.style.transition='transform 0.45s cubic-bezier(.16,1,.3,1)';ch.style.transform='scale(1)'},260)},waveIdx*280);waveIdx++});setTimeout(runWave,waveIdx*280+3000)},introEnd);

// ─── LOGO TYPE ───
const logoEl=document.getElementById('logoText');const logoName='Nishanth';let li2=0;
function typeLogo(){if(li2<=logoName.length){logoEl.textContent=logoName.slice(0,li2++);setTimeout(typeLogo,120)}}
setTimeout(typeLogo,1200);

// ─── TYPED ROLES ───
const roles=['Software Engineer','Full Stack Developer','System Architect','Problem Solver','Code Craftsman'];
let ri=0,ci2=0,deleting=false;const tel=document.getElementById('typed');
function type(){const word=roles[ri];if(!deleting){tel.textContent=word.slice(0,++ci2);if(ci2===word.length){deleting=true;setTimeout(type,1900);return}}else{tel.textContent=word.slice(0,--ci2);if(ci2===0){deleting=false;ri=(ri+1)%roles.length}}setTimeout(type,deleting?48:82)}
setTimeout(type,2200);

// ─── SCROLL ANIMATIONS ───
const io=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('on')})},{threshold:.1});
document.querySelectorAll('.rv,.rl,.rr,.sk').forEach(el=>io.observe(el));
document.querySelectorAll('.sk').forEach((c,i)=>{c.style.transitionDelay=(i*.09)+'s'});

// ─── COUNT UP ───
function countUp(el,target){const sfx=target===24?'/7':'+';let s=null;requestAnimationFrame(function step(ts){if(!s)s=ts;const p=Math.min((ts-s)/2400,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(e*target)+sfx;if(p<1)requestAnimationFrame(step)})}
const sio=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');const n=x.target.querySelector('[data-target]');if(n&&!n.dataset.done){n.dataset.done=1;countUp(n,+n.dataset.target)}}})},{threshold:.2});
document.querySelectorAll('.stat').forEach(s=>sio.observe(s));
document.querySelectorAll('.stat').forEach(s=>{s.addEventListener('click',e=>{const r=document.createElement('div');r.className='stat-ripple';const b=s.getBoundingClientRect();const size=Math.max(b.width,b.height);r.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-b.left-size/2}px;top:${e.clientY-b.top-size/2}px`;s.appendChild(r);setTimeout(()=>r.remove(),700)})});

// ─── TERMINAL ANIMATION ───
const termIO=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){const lines=x.target.querySelectorAll('.tl');lines.forEach((l,i)=>{l.style.opacity=0;setTimeout(()=>{l.style.transition='opacity .3s ease';l.style.opacity=1},i*80)});termIO.disconnect()}})},{threshold:.3});
const tb=document.getElementById('termBody');if(tb)termIO.observe(tb);

// ─── CONTACT CARDS ───
const cio=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){document.querySelectorAll('.ci').forEach((c,i)=>{setTimeout(()=>c.classList.add('visible'),i*120)});cio.disconnect()}})},{threshold:.2});
const cl=document.getElementById('clinks');if(cl)cio.observe(cl);

// ─── NAV ACTIVE ───
(function(){const sections=document.querySelectorAll('section[id]');const navLinks=document.querySelectorAll('nav a');function onScroll(){const scrollY=window.scrollY;let current='';sections.forEach(sec=>{if(scrollY>=sec.offsetTop-120)current=sec.id});if(window.innerHeight+scrollY>=document.body.scrollHeight-60)current=sections[sections.length-1].id;navLinks.forEach(a=>{a.classList.toggle('active',a.getAttribute('href')==='#'+current)});}window.addEventListener('scroll',onScroll,{passive:true});onScroll();})();

// ─── BMC INLINE ───
// Input removed — direct link to BMC page

// ─── THEME TOGGLE ───
(function(){
  const btn = document.getElementById('themeBtn');
  if(document.documentElement.classList.contains('light-init')){
    document.body.classList.add('light');
    document.documentElement.classList.remove('light-init');
  }

  window.toggleTheme = function(){
    btn.classList.add('theme-spinning');
    setTimeout(() => btn.classList.remove('theme-spinning'), 520);

    document.body.classList.add('theme-transitioning');

    requestAnimationFrame(() => {
      const isLight = document.body.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      const heart = document.getElementById('donateNavIcon');
      if(heart) heart.style.color = isLight ? '#fff' : '#000';

      setTimeout(() => document.body.classList.remove('theme-transitioning'), 500);
    });
  };
})();

// ─── MUSIC PLAYER ───
(function(){
  let audio = null;
  let playing = false;

  window.toggleMusic = function() {
    const btn  = document.getElementById('musicBtn');

    if (!audio) {
      audio = new Audio('music.MP3');
      audio.loop = true;
      audio.preload = 'none';
    }

    if (!playing) {
      audio.play().then(() => {
        playing = true;
        btn.classList.add('music-playing');
        btn.setAttribute('aria-label', 'Pause music');
      }).catch(() => {});
    } else {
      audio.pause();
      playing = false;
      btn.classList.remove('music-playing');
      btn.setAttribute('aria-label', 'Play music');
    }
  };
})();

(function(){
  const el = document.getElementById('donateNavIcon');
  const wrap = document.querySelector('.donate-text');
  const baseColor = () => document.body.classList.contains('light') ? '#fff' : '#000';
  if(el){ el.textContent='♥'; el.style.color=baseColor(); }
  if(wrap){
    wrap.innerHTML = 'Donate'.split('').map(l=>`<span class="dl">${l}</span>`).join('');
  }
  const letters = wrap ? wrap.querySelectorAll('.dl') : [];
  const on  = {color:'#33ff99', textShadow:'0 0 10px rgba(51,255,51,.6)'};
  const off = {color:'', textShadow:'none'};
  function animateBeat(){
    if(el){
      el.style.transition = 'transform .18s ease, color .18s ease';
      el.style.transform  = 'scale(1.4)';
      el.style.color      = '#ff1a1a';
      setTimeout(()=>{
        el.style.transition = 'transform .22s ease, color .3s ease';
        el.style.transform  = 'scale(1)';
        el.style.color      = baseColor();
      }, 200);
    }
    letters.forEach((l, i)=>{
      setTimeout(()=>{
        l.style.transition = 'color .18s ease, text-shadow .18s ease';
        Object.assign(l.style, on);
        setTimeout(()=>{
          l.style.transition = 'color .3s ease, text-shadow .3s ease';
          Object.assign(l.style, off);
        }, 300);
      }, i * 55);
    });
  }
  setTimeout(animateBeat, 800);
  setInterval(animateBeat, 2000);
})();
// ─── UPI COMET BORDER ───
(function(){
  const configs = [
    { sel: '.db-upi-gpay',    color: '#60b4ff', tail: 'rgba(96,180,255,0)',    delay: 0    },
    { sel: '.db-upi-phonepe', color: '#d4a0ff', tail: 'rgba(212,160,255,0)',   delay: 0.6  },
    { sel: '.db-upi-paytm',   color: '#80e8ff', tail: 'rgba(128,232,255,0)',   delay: 1.2  },
    { sel: '.db-upi-airtel',  color: '#ff9090', tail: 'rgba(255,144,144,0)',   delay: 1.8  },
  ];

  configs.forEach(({ sel, color, tail, delay }) => {
    const btn = document.querySelector(sel);
    if (!btn) return;

    // Build inline SVG
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'upi-svgborder');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;overflow:visible;border-radius:6px';

    const defs = document.createElementNS(ns, 'defs');

    // Gradient for comet head → transparent tail
    const grad = document.createElementNS(ns, 'linearGradient');
    const gid = 'upi-g-' + sel.replace(/[^a-z]/g,'');
    grad.setAttribute('id', gid);
    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    // will update x1/y1/x2/y2 dynamically; static fallback
    grad.innerHTML = `<stop offset="0%" stop-color="${tail}"/><stop offset="100%" stop-color="${color}"/>`;
    defs.appendChild(grad);
    svg.appendChild(defs);

    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', color);
    rect.setAttribute('stroke-width', '1.8');
    rect.setAttribute('rx', '6');
    rect.setAttribute('ry', '6');
    rect.style.cssText = 'x:1px;y:1px;';
    svg.appendChild(rect);

    btn.appendChild(svg);

    // Animate via JS so perimeter is dynamic
    let raf;
    function run() {
      const W = btn.offsetWidth;
      const H = btn.offsetHeight;
      const R = 6;
      // perimeter approx (rectangle with rounded corners)
      const perim = 2 * (W + H - 4*R) + 2 * Math.PI * R;
      const tailLen = perim * 0.22; // comet tail = 22% of perimeter

      rect.setAttribute('width',  W - 2);
      rect.setAttribute('height', H - 2);
      rect.setAttribute('x', '1');
      rect.setAttribute('y', '1');
      rect.setAttribute('stroke-dasharray', `${tailLen} ${perim - tailLen}`);

      const duration = 1800; // ms per lap
      const startTime = performance.now() - delay * 1000;

      function frame(now) {
        const elapsed = (now - startTime) % duration;
        const offset  = -(perim * elapsed / duration);
        rect.setAttribute('stroke-dashoffset', offset);

        // optional: vary opacity for head brightness
        const headFrac = ((perim * elapsed / duration) % perim) / perim;
        rect.setAttribute('stroke-opacity', '1');

        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    }

    // Start after layout is ready
    requestAnimationFrame(run);

    // Re-calc on resize
    window.addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      run();
    });
  });
})();

// ─── BMC COMET BORDER ───
(function(){
  const btn = document.getElementById('bmcPayBtn');
  if (!btn) return;

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('class', 'bmc-svgborder');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;overflow:visible;';

  const rect = document.createElementNS(ns, 'rect');
  rect.setAttribute('fill', 'none');
  rect.setAttribute('stroke', '#ffffff');
  rect.setAttribute('stroke-width', '1.8');
  rect.setAttribute('rx', '0');
  rect.setAttribute('ry', '0');
  svg.appendChild(rect);
  btn.appendChild(svg);

  let raf;
  function run() {
    const W = btn.offsetWidth;
    const H = btn.offsetHeight;
    const perim = 2 * (W + H);
    const tailLen = perim * 0.22;

    rect.setAttribute('width',  W - 2);
    rect.setAttribute('height', H - 2);
    rect.setAttribute('x', '1');
    rect.setAttribute('y', '1');
    rect.setAttribute('stroke-dasharray', `${tailLen} ${perim - tailLen}`);

    const duration = 1800;
    const startTime = performance.now();

    function frame(now) {
      const elapsed = (now - startTime) % duration;
      const offset  = -(perim * elapsed / duration);
      rect.setAttribute('stroke-dashoffset', offset);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  requestAnimationFrame(run);
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); run(); });
})();
// ─── UPI ID COMET BORDER ───
(function(){
  const btn = document.querySelector('.db-upi-id-row');
  if (!btn) return;

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;overflow:visible;';

  const rect = document.createElementNS(ns, 'rect');
  rect.setAttribute('fill', 'none');
  rect.setAttribute('stroke', '#ffffff');
  rect.setAttribute('stroke-width', '1.8');
  rect.setAttribute('rx', '0');
  rect.setAttribute('ry', '0');
  svg.appendChild(rect);
  btn.appendChild(svg);

  let raf;
  function run() {
    const W = btn.offsetWidth;
    const H = btn.offsetHeight;
    const perim = 2 * (W + H);
    const tailLen = perim * 0.22;

    rect.setAttribute('width',  W - 2);
    rect.setAttribute('height', H - 2);
    rect.setAttribute('x', '1');
    rect.setAttribute('y', '1');
    rect.setAttribute('stroke-dasharray', `${tailLen} ${perim - tailLen}`);

    const duration = 1800;
    const startTime = performance.now();

    function frame(now) {
      const elapsed = (now - startTime) % duration;
      const offset  = -(perim * elapsed / duration);
      rect.setAttribute('stroke-dashoffset', offset);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  requestAnimationFrame(run);
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); run(); });
})();
