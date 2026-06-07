export default {
  async fetch(request, env, ctx) {
    return new Response(HTML, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NOVA // beyond reality</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --c1:#ff2e97; --c2:#7a5cff; --c3:#00e5ff; --c4:#ffe600;
    --bg:#05010f;
  }
  html { scroll-behavior:smooth; }
  body {
    background:var(--bg); color:#fff; overflow-x:hidden;
    font-family:'Segoe UI',system-ui,sans-serif;
    cursor:none;
  }
  a { color:inherit; text-decoration:none; }

  /* ---------- animated gradient backdrop ---------- */
  .bg-grad {
    position:fixed; inset:0; z-index:-3;
    background:
      radial-gradient(circle at 20% 30%, rgba(255,46,151,.35), transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(122,92,255,.35), transparent 40%),
      radial-gradient(circle at 50% 80%, rgba(0,229,255,.30), transparent 45%),
      radial-gradient(circle at 90% 90%, rgba(255,230,0,.20), transparent 40%);
    animation:bgshift 18s ease-in-out infinite alternate;
    filter:blur(20px);
  }
  @keyframes bgshift {
    0%{transform:scale(1) translate(0,0);}
    50%{transform:scale(1.3) translate(-4%,3%);}
    100%{transform:scale(1.1) translate(4%,-3%);}
  }
  #stars { position:fixed; inset:0; z-index:-2; }
  .grid-overlay {
    position:fixed; inset:0; z-index:-1; pointer-events:none;
    background-image:linear-gradient(rgba(122,92,255,.08) 1px,transparent 1px),
      linear-gradient(90deg,rgba(122,92,255,.08) 1px,transparent 1px);
    background-size:48px 48px;
    mask-image:radial-gradient(circle at 50% 40%,#000,transparent 80%);
  }

  /* ---------- custom cursor ---------- */
  .cursor-dot,.cursor-ring {
    position:fixed; top:0; left:0; border-radius:50%;
    pointer-events:none; z-index:9999; mix-blend-mode:difference;
  }
  .cursor-dot { width:8px; height:8px; background:#fff; transform:translate(-50%,-50%); }
  .cursor-ring {
    width:42px; height:42px; border:2px solid #fff;
    transform:translate(-50%,-50%); transition:width .2s,height .2s,background .2s;
  }
  .cursor-ring.hover { width:70px; height:70px; background:rgba(255,255,255,.15); }

  /* ---------- nav ---------- */
  nav {
    position:fixed; top:0; width:100%; z-index:100;
    display:flex; justify-content:space-between; align-items:center;
    padding:20px 6vw; backdrop-filter:blur(8px);
    background:linear-gradient(180deg,rgba(5,1,15,.7),transparent);
  }
  .logo { font-weight:900; font-size:1.5rem; letter-spacing:3px;
    background:linear-gradient(90deg,var(--c1),var(--c3));
    -webkit-background-clip:text; background-clip:text; color:transparent; }
  .nav-links { display:flex; gap:34px; font-size:.85rem; letter-spacing:2px; text-transform:uppercase; }
  .nav-links a { position:relative; opacity:.8; transition:.3s; }
  .nav-links a::after { content:''; position:absolute; left:0; bottom:-6px; width:0; height:2px;
    background:linear-gradient(90deg,var(--c1),var(--c3)); transition:.3s; }
  .nav-links a:hover { opacity:1; } .nav-links a:hover::after { width:100%; }

  /* ---------- hero ---------- */
  .hero { min-height:100vh; display:flex; flex-direction:column;
    align-items:center; justify-content:center; text-align:center; position:relative; padding:0 5vw; }
  .badge {
    border:1px solid rgba(255,255,255,.25); border-radius:50px;
    padding:8px 20px; font-size:.75rem; letter-spacing:3px; text-transform:uppercase;
    margin-bottom:30px; background:rgba(255,255,255,.04); animation:floaty 4s ease-in-out infinite;
  }
  @keyframes floaty { 50%{transform:translateY(-10px);} }
  .glitch {
    font-size:clamp(3rem,13vw,11rem); font-weight:900; line-height:.9; letter-spacing:-2px;
    position:relative; text-transform:uppercase;
  }
  .glitch span { position:absolute; inset:0; }
  .glitch span:nth-child(1){ color:var(--c1); animation:glitch1 2.5s infinite; clip-path:inset(0 0 60% 0); }
  .glitch span:nth-child(2){ color:var(--c3); animation:glitch2 2.5s infinite; clip-path:inset(50% 0 0 0); }
  @keyframes glitch1{ 0%,90%,100%{transform:translate(0);} 92%{transform:translate(-6px,2px);} 96%{transform:translate(5px,-2px);} }
  @keyframes glitch2{ 0%,90%,100%{transform:translate(0);} 93%{transform:translate(5px,-1px);} 97%{transform:translate(-5px,3px);} }
  .hero-sub { font-size:clamp(1rem,2.2vw,1.4rem); margin-top:26px; max-width:620px; opacity:.85; }
  .grad-text { background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3),var(--c4));
    background-size:300% auto; -webkit-background-clip:text; background-clip:text; color:transparent;
    animation:flow 6s linear infinite; }
  @keyframes flow { to{ background-position:300% center; } }

  .cta-row { display:flex; gap:20px; margin-top:42px; flex-wrap:wrap; justify-content:center; }
  .btn {
    position:relative; padding:16px 40px; border-radius:50px; font-weight:700;
    letter-spacing:1px; overflow:hidden; border:none; font-size:1rem; cursor:none;
  }
  .btn-primary { color:#05010f; background:linear-gradient(90deg,var(--c1),var(--c3)); }
  .btn-primary::before { content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,var(--c3),var(--c4)); opacity:0; transition:.4s; }
  .btn-primary:hover::before { opacity:1; }
  .btn-primary span { position:relative; z-index:1; }
  .btn-ghost { background:transparent; color:#fff; border:2px solid rgba(255,255,255,.3); }
  .btn-ghost:hover { border-color:var(--c3); box-shadow:0 0 30px rgba(0,229,255,.4); }

  .scroll-ind { position:absolute; bottom:30px; left:50%; transform:translateX(-50%);
    font-size:.7rem; letter-spacing:3px; opacity:.6; animation:floaty 2s infinite; }

  /* ---------- marquee ---------- */
  .marquee { overflow:hidden; white-space:nowrap; padding:24px 0; border-top:1px solid rgba(255,255,255,.1);
    border-bottom:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.02); }
  .marquee div { display:inline-block; animation:scroll 22s linear infinite; }
  .marquee span { font-size:2.4rem; font-weight:900; text-transform:uppercase; margin:0 30px;
    -webkit-text-stroke:1.5px rgba(255,255,255,.6); color:transparent; }
  .marquee span.fill { color:var(--c1); -webkit-text-stroke:0; }
  @keyframes scroll { to{ transform:translateX(-50%); } }

  /* ---------- sections ---------- */
  section.block { padding:120px 6vw; max-width:1200px; margin:0 auto; }
  .sec-title { font-size:clamp(2rem,6vw,4rem); font-weight:900; text-align:center; margin-bottom:16px; }
  .sec-desc { text-align:center; opacity:.7; max-width:560px; margin:0 auto 60px; }

  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:28px; }
  .card {
    position:relative; padding:40px 32px; border-radius:24px;
    background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02));
    border:1px solid rgba(255,255,255,.12); overflow:hidden;
    transform-style:preserve-3d; transition:transform .15s ease-out;
  }
  .card::before { content:''; position:absolute; inset:0; opacity:0; transition:.4s;
    background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,46,151,.25),transparent 60%); }
  .card:hover::before { opacity:1; }
  .card .ico { font-size:2.6rem; margin-bottom:18px; display:block; }
  .card h3 { font-size:1.4rem; margin-bottom:12px; }
  .card p { opacity:.75; line-height:1.6; font-size:.95rem; }

  /* stats */
  .stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:30px; text-align:center; }
  .stat .num { font-size:clamp(2.4rem,6vw,4rem); font-weight:900;
    background:linear-gradient(90deg,var(--c3),var(--c1)); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .stat .lbl { letter-spacing:2px; text-transform:uppercase; font-size:.75rem; opacity:.7; margin-top:6px; }

  /* reveal */
  .reveal { opacity:0; transform:translateY(50px); transition:.8s cubic-bezier(.2,.8,.2,1); }
  .reveal.show { opacity:1; transform:none; }

  /* CTA banner */
  .banner { text-align:center; padding:100px 6vw; }
  .banner h2 { font-size:clamp(2.4rem,8vw,6rem); font-weight:900; line-height:1; }

  footer { text-align:center; padding:50px 6vw; opacity:.6; font-size:.85rem;
    border-top:1px solid rgba(255,255,255,.1); }

  @media(max-width:640px){ .nav-links{ display:none; } }
</style>
</head>
<body>
<!-- github backup test -->
<div class="bg-grad"></div>
<canvas id="stars"></canvas>
<div class="grid-overlay"></div>
<div class="cursor-dot"></div>
<div class="cursor-ring"></div>

<nav>
  <div class="logo">◆ NOVA</div>
  <div class="nav-links">
    <a href="#features">Features</a>
    <a href="#stats">Stats</a>
    <a href="#join">Join</a>
  </div>
</nav>

<header class="hero">
  <div class="badge">✦ the future is now loading</div>
  <h1 class="glitch" data-text="NOVA">NOVA<span aria-hidden="true">NOVA</span><span aria-hidden="true">NOVA</span></h1>
  <p class="hero-sub">We build <span class="grad-text">impossible experiences</span> that bend pixels, melt minds, and break the boundaries of the ordinary web.</p>
  <div class="cta-row">
    <button class="btn btn-primary magnetic"><span>Launch Me ↗</span></button>
    <button class="btn btn-ghost magnetic">Watch the chaos</button>
  </div>
  <div class="scroll-ind">SCROLL ↓</div>
</header>

<div class="marquee">
  <div>
    <span class="fill">Insane</span><span>Effects</span><span class="fill">Bold</span><span>Design</span>
    <span class="fill">Pure</span><span>Energy</span><span class="fill">No</span><span>Limits</span>
    <span class="fill">Insane</span><span>Effects</span><span class="fill">Bold</span><span>Design</span>
    <span class="fill">Pure</span><span>Energy</span><span class="fill">No</span><span>Limits</span>
  </div>
</div>

<section class="block" id="features">
  <h2 class="sec-title reveal">Powers Unleashed</h2>
  <p class="sec-desc reveal">Move your mouse over the cards. Everything reacts. Nothing is calm here.</p>
  <div class="cards">
    <div class="card tilt reveal"><span class="ico">⚡</span><h3>Hyper Speed</h3><p>Blazing-fast load times that warp through space and arrive before you blink.</p></div>
    <div class="card tilt reveal"><span class="ico">🌀</span><h3>3D Reactivity</h3><p>Tilt, glow, and parallax that follow your every move across the screen.</p></div>
    <div class="card tilt reveal"><span class="ico">🎨</span><h3>Living Color</h3><p>Gradients that flow, breathe, and never sit still for even a second.</p></div>
    <div class="card tilt reveal"><span class="ico">✨</span><h3>Particle Magic</h3><p>A galaxy of stars drifting behind every word you read.</p></div>
    <div class="card tilt reveal"><span class="ico">🧲</span><h3>Magnetic UI</h3><p>Buttons that lean toward your cursor like they actually want to be clicked.</p></div>
    <div class="card tilt reveal"><span class="ico">👾</span><h3>Glitch Core</h3><p>Controlled chaos baked into the headline. Reality is optional.</p></div>
  </div>
</section>

<section class="block" id="stats">
  <div class="stats">
    <div class="stat reveal"><div class="num" data-target="99">0</div><div class="lbl">% Pure Vibes</div></div>
    <div class="stat reveal"><div class="num" data-target="1200">0</div><div class="lbl">FPS Energy</div></div>
    <div class="stat reveal"><div class="num" data-target="42">0</div><div class="lbl">Effects Stacked</div></div>
    <div class="stat reveal"><div class="num" data-target="100">0</div><div class="lbl">% Unhinged</div></div>
  </div>
</section>

<section class="banner" id="join">
  <h2 class="reveal">READY?<br><span class="grad-text">LET'S GO.</span></h2>
  <div class="cta-row" style="justify-content:center;margin-top:40px;">
    <button class="btn btn-primary magnetic"><span>Enter the Void ◎</span></button>
  </div>
</section>

<footer>◆ NOVA — built for chaos. © 2024. Move your mouse. Trust nothing.</footer>

<script>
// ---------- custom cursor ----------
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.card').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
});

// ---------- starfield ----------
const cv=document.getElementById('stars'),ctx=cv.getContext('2d');
let stars=[];
function resize(){cv.width=innerWidth;cv.height=innerHeight;stars=Array.from({length:160},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,z:Math.random()*1.5+.2,c:['#ff2e97','#7a5cff','#00e5ff','#ffe600','#ffffff'][Math.floor(Math.random()*5)]}));}
resize();addEventListener('resize',resize);
let pmx=0,pmy=0;addEventListener('mousemove',e=>{pmx=(e.clientX/innerWidth-.5);pmy=(e.clientY/innerHeight-.5);});
(function draw(){ctx.clearRect(0,0,cv.width,cv.height);for(const s of stars){s.y+=s.z*.4;s.x+=pmx*s.z*1.2;if(s.y>cv.height){s.y=0;s.x=Math.random()*cv.width;}ctx.globalAlpha=s.z/1.7;ctx.fillStyle=s.c;ctx.beginPath();ctx.arc(s.x,s.y,s.z*1.3,0,7);ctx.fill();}ctx.globalAlpha=1;requestAnimationFrame(draw);})();

// ---------- 3D tilt ----------
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
    card.style.transform='perspective(800px) rotateY('+(px-.5)*16+'deg) rotateX('+(.5-py)*16+'deg) translateZ(10px)';
    card.style.setProperty('--mx',px*100+'%');card.style.setProperty('--my',py*100+'%');
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

// ---------- magnetic buttons ----------
document.querySelectorAll('.magnetic').forEach(b=>{
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.4+'px,'+(e.clientY-r.top-r.height/2)*.4+'px)';});
  b.addEventListener('mouseleave',()=>b.style.transform='');
});

// ---------- scroll reveal ----------
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('show');if(en.target.querySelector?.('.num'))countUp(en.target.querySelector('.num'));io.unobserve(en.target);}}),{threshold:.2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ---------- count up ----------
function countUp(el){const t=+el.dataset.target;let n=0;const step=t/60;const i=setInterval(()=>{n+=step;if(n>=t){n=t;clearInterval(i);}el.textContent=Math.floor(n);},16);}
</script>
</body>
</html>`;