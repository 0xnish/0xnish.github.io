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

// ─── COPY UPI ID ───
window.copyUPI = function() {
  const upiId = 'coder-nishanth@airtel';
  const btn = document.getElementById('upiCopyBtn');
  const icoCopy = btn.querySelector('.ico-copy');
  const icoCheck = btn.querySelector('.ico-check');
  const label = btn.querySelector('.copy-label');

  function onCopied() {
    btn.classList.add('copied');
    if(icoCopy) icoCopy.style.display = 'none';
    if(icoCheck) icoCheck.style.display = 'block';
    if(label) label.textContent = 'Copied';
    setTimeout(() => {
      btn.classList.remove('copied');
      if(icoCopy) icoCopy.style.display = 'block';
      if(icoCheck) icoCheck.style.display = 'none';
      if(label) label.textContent = 'Copy';
    }, 2000);
  }

  navigator.clipboard.writeText(upiId).then(onCopied).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = upiId;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    onCopied();
  });
};


// ─── BUTTON COMET BORDERS ───
(function(){
  const configs = [
    { id: 'upiCopyBtn', color: '#ff0000' },
    { id: 'bmcPayBtn',  color: '#0099ff' },
  ];

  const phases = [
    { name: 'forward',     duration: 2000 },
    { name: 'reverse',     duration: 2000 },
    { name: 'blink',       duration: 2000 },
    { name: 'fast',        duration: 1500 },
    { name: 'pause',       duration: 800  },
    { name: 'double',      duration: 2000 },
    { name: 'stretch',     duration: 2000 },
    { name: 'strobe',      duration: 1500 },
    { name: 'crawl',       duration: 3000 },
    { name: 'pingpong',    duration: 2000 },
    { name: 'breathe',     duration: 2000 },
    { name: 'accelerate',  duration: 2000 },
  ];
  const totalCycle = phases.reduce((s, p) => s + p.duration, 0);

  function getPhase(elapsed) {
    let t = elapsed % totalCycle;
    for (const p of phases) {
      if (t < p.duration) return { phase: p.name, t, duration: p.duration };
      t -= p.duration;
    }
  }

  configs.forEach(({ id, color }) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;overflow:visible;';

    // Two rects for double comet pattern
    const rect1 = document.createElementNS(ns, 'rect');
    const rect2 = document.createElementNS(ns, 'rect');
    [rect1, rect2].forEach(r => {
      r.setAttribute('fill', 'none');
      r.setAttribute('stroke', color);
      r.setAttribute('stroke-width', '2');
      r.setAttribute('stroke-opacity', '0.9');
      svg.appendChild(r);
    });
    rect2.style.display = 'none';
    btn.appendChild(svg);

    let raf;
    const startTime = performance.now();

    function run() {
      const W = btn.offsetWidth;
      const H = btn.offsetHeight;
      const perim = 2 * (W + H);

      [rect1, rect2].forEach(r => {
        r.setAttribute('width',  W - 2);
        r.setAttribute('height', H - 2);
        r.setAttribute('x', '1');
        r.setAttribute('y', '1');
      });

      function frame(now) {
        const elapsed = now - startTime;
        const { phase, t, duration } = getPhase(elapsed);
        const progress = t / duration; // 0 to 1

        let tail = perim * 0.2;
        let offset = 0;
        let opacity = '0.9';
        let showRect2 = false;

        if (phase === 'forward') {
          offset = -(perim * progress);

        } else if (phase === 'reverse') {
          offset = perim * progress;

        } else if (phase === 'blink') {
          const blink = Math.sin(progress * Math.PI * 8);
          opacity = blink > 0 ? '0.9' : '0';
          offset = -(perim * progress);

        } else if (phase === 'fast') {
          offset = -(perim * progress / 0.4);
          tail = perim * 0.1;

        } else if (phase === 'pause') {
          offset = 0;
          opacity = '0.2';

        } else if (phase === 'double') {
          // Two comets opposite each other
          showRect2 = true;
          tail = perim * 0.15;
          offset = -(perim * progress);
          rect2.setAttribute('stroke-dasharray', `${tail} ${perim - tail}`);
          rect2.setAttribute('stroke-dashoffset', -(perim * progress) + perim / 2);
          rect2.setAttribute('stroke-opacity', '0.9');

        } else if (phase === 'stretch') {
          // Tail grows and shrinks
          tail = perim * (0.05 + 0.45 * Math.sin(progress * Math.PI));
          offset = -(perim * progress);

        } else if (phase === 'strobe') {
          // Fast flicker
          const strobe = Math.floor(progress * 20) % 2;
          opacity = strobe === 0 ? '0.9' : '0';
          offset = -(perim * progress * 2);
          tail = perim * 0.12;

        } else if (phase === 'crawl') {
          // Very slow, long tail
          offset = -(perim * progress * 0.5);
          tail = perim * 0.4;
          opacity = '0.6';

        } else if (phase === 'pingpong') {
          // Bounces back and forth
          const bounce = Math.sin(progress * Math.PI * 2);
          offset = -(perim * 0.5 * (1 + bounce) * 0.5);
          tail = perim * 0.15;

        } else if (phase === 'breathe') {
          // Opacity pulses, slow movement
          opacity = String(0.2 + 0.7 * Math.abs(Math.sin(progress * Math.PI * 2)));
          offset = -(perim * progress * 0.5);
          tail = perim * 0.25;

        } else if (phase === 'accelerate') {
          // Starts slow, ends fast (ease-in)
          offset = -(perim * progress * progress);
          tail = perim * (0.05 + 0.2 * progress);
        }

        rect1.setAttribute('stroke-dasharray', `${tail} ${perim - tail}`);
        rect1.setAttribute('stroke-dashoffset', offset);
        rect1.setAttribute('stroke-opacity', opacity);
        rect2.style.display = showRect2 ? '' : 'none';

        raf = requestAnimationFrame(frame);
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }

    requestAnimationFrame(run);
    window.addEventListener('resize', () => { cancelAnimationFrame(raf); run(); });
  });
})();
