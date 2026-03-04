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
  for(let i=0;i<180;i++) stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.2,v:Math.random()*.3+.05,a:Math.random(),da:Math.random()*.005+.002,c:Math.random()>.7?'rgba(126,184,200,':'rgba(200,169,126,'});
  function draw(){
    ctx.clearRect(0,0,W,H);
    stars.forEach(s=>{s.a+=s.da;if(s.a>1||s.a<0)s.da*=-1;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=s.c+s.a+')';ctx.fill();s.y-=s.v;if(s.y<-5){s.y=H+5;s.x=Math.random()*W;}});
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
document.querySelectorAll('.rv,.rl,.rr,.sk,.exp-item').forEach(el=>io.observe(el));
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

// ─── UPI INLINE ───
const UPI_ID = 'coder-nishanth@airtel';

function updateUPILink(amt) {
  const btn = document.getElementById('upiPayBtn');
  const label = document.getElementById('upiPayAmt');
  const amtEl = document.getElementById('upiAmt');
  if (!amt || isNaN(amt) || +amt < 1) {
    btn.href = `upi://pay?pa=${UPI_ID}&pn=Nishanth%20JP&cu=INR`;
    if (label) label.textContent = '';
    return;
  }
  btn.href = `upi://pay?pa=${UPI_ID}&pn=Nishanth%20JP&am=${amt}&cu=INR`;
  if (label) label.textContent = '₹' + amt;
}

function syncUPIInput(el) {
  updateUPILink(el.value);
}

function copyUPI() {
  navigator.clipboard.writeText(UPI_ID).catch(() => {});
  const hint = document.getElementById('upiCopyHint');
  const label = document.getElementById('upiCopyLabel');
  if (label) label.textContent = 'copied!';
  hint.classList.add('copied');
  setTimeout(() => {
    if (label) label.textContent = 'copy';
    hint.classList.remove('copied');
  }, 2500);
}

// ─── BMC INLINE ───
let _bmcCurrency = 'INR';
const BMC_URL = 'https://buymeacoffee.com/nishanth';

function setBMCCurrency(cur, el) {
  _bmcCurrency = cur;
  document.querySelectorAll('#bmcCurINR, #bmcCurUSD').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('bmcSymbol').innerHTML    = cur === 'INR' ? '&#8377;' : '$';
  document.getElementById('bmcSymbolBtn').innerHTML = cur === 'INR' ? '&#8377;' : '$';
  // Clear amount on currency switch
  document.getElementById('bmcAmt').value = '';
  document.getElementById('bmcPayAmt').textContent = '';
  document.getElementById('bmcPayBtn').href = BMC_URL;
}

function syncBMCInput(el) {
  updateBMCLink(el.value);
}

function updateBMCLink(amt) {
  const btn   = document.getElementById('bmcPayBtn');
  const amtEl = document.getElementById('bmcPayAmt');
  if (!amt || isNaN(amt) || +amt < 1) {
    amtEl.textContent = '';
    btn.href = BMC_URL;
    return;
  }
  amtEl.textContent = amt;
  btn.href = `${BMC_URL}?amount=${amt}&currency=${_bmcCurrency}`;
}

// ─── DONATE HEART ANIMATION ───
(function(){
  const el = document.getElementById('donateNavIcon');
  const wrap = document.querySelector('.donate-text');
  if(el){ el.textContent='♥'; el.style.color='#000'; }
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
        el.style.color      = '#000';
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
