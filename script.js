// ─── LOADER ───
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const ld=document.getElementById('loader');
    ld.classList.add('hide');
    setTimeout(()=>{ld.style.display='none'},800);
  },400);
});

// ─── LOADER — Simple Initializing ───
// ─── SCROLL PROGRESS ───
window.addEventListener('scroll',()=>{const sp=document.getElementById('sp');const pct=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;sp.style.width=pct+'%'});

// ─── STARS ───
(function(){
  const c=document.getElementById('starCanvas');
  const isMobile = window.innerWidth <= 768 || navigator.maxTouchPoints > 0;
  // Skip canvas animation on mobile entirely
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

// ─── DONATE MODAL ───
let currentType='upi';
const UPI_ID='coder-nishanth@airtel'; // ← UPDATE THIS

function openDonate(type){
  currentType=type;
  const overlay=document.getElementById('donateOverlay');
  const icon=document.getElementById('dmIcon');
  const title=document.getElementById('dmTitle');
  const sub=document.getElementById('dmSub');
  const upiBlock=document.getElementById('dmUpiBlock');
  const btn=document.getElementById('dmBtn');
  const btnText=document.getElementById('dmBtnText');
  const amts=document.querySelectorAll('.dma');
  const divider=document.getElementById('dmDivider');
  amts.forEach(a=>a.classList.remove('active'));

  if(type==='upi'){
    icon.textContent='♥';
    title.textContent='Pay via UPI / GPay';
    sub.innerHTML='Copy the UPI ID below and open GPay,<br>PhonePe, or any UPI app to send support.';
    upiBlock.style.display='block';
    divider.style.display='flex';
    document.getElementById('dmUpiId').textContent=UPI_ID;
    const upiAmts=['₹49','₹99','₹199','₹499'];
    amts.forEach((a,i)=>{a.textContent=upiAmts[i];});
    amts[1].classList.add('active');
    updateUPILink('99');
    btnText.textContent='Open UPI App ♥';
  } else if(type==='coffee'){
    icon.textContent='☕';
    title.textContent='Buy Me a Coffee';
    sub.innerHTML='Every coffee keeps me going!<br>Click below to support on Buy Me a Coffee.';
    upiBlock.style.display='none';
    divider.style.display='none';
    const coffeeAmts=['$1','$3','$5','$10'];
    amts.forEach((a,i)=>{a.textContent=coffeeAmts[i];});
    amts[1].classList.add('active');
    btn.href='https://buymeacoffee.com/coder.nishanth';
    btnText.textContent='Buy Me a Coffee ☕';
  } else if(type==='paypal'){
    icon.innerHTML='<svg viewBox="0 0 24 24" width="44" height="44"><path fill="#009cde" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.243-8.413 6.243H9.97l-1.248 7.917h3.507l.532-3.365h2.035c4.655 0 7.44-2.282 8.426-6.509z"/></svg>';
    title.textContent='Donate via PayPal';
    sub.innerHTML='Send support from anywhere in the world.<br>Every bit counts — thank you! ♥';
    upiBlock.style.display='none';
    divider.style.display='none';
    const ppAmts=['$1','$5','$10','$25'];
    amts.forEach((a,i)=>{a.textContent=ppAmts[i];});
    amts[1].classList.add('active');
    btn.href='https://paypal.me/nishanthjp'; // ← UPDATE THIS
    btnText.textContent='Donate via PayPal ♥';
  }
  overlay.classList.add('open');
  document.body.style.overflow='hidden';
}

function updateUPILink(amt){
  document.getElementById('dmBtn').href=`upi://pay?pa=${UPI_ID}&pn=Nishanth JP&am=${amt}&cu=INR`;
}

function closeDonate(){document.getElementById('donateOverlay').classList.remove('open');document.body.style.overflow='';}
function closeDonateOutside(e){if(e.target===document.getElementById('donateOverlay'))closeDonate();}

function copyUPI(){
  navigator.clipboard.writeText(UPI_ID).catch(()=>{});
  const hint=document.getElementById('dmCopyHint');
  hint.textContent='✓ Copied to clipboard!';
  hint.classList.add('copied');
  setTimeout(()=>{hint.textContent='↑ tap to copy UPI ID';hint.classList.remove('copied')},2500);
}

function selectAmt(el,amt){
  document.querySelectorAll('.dma').forEach(a=>a.classList.remove('active'));
  el.classList.add('active');
  if(currentType==='upi') updateUPILink(amt);
}

// Heart + letters — perfectly synced
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
