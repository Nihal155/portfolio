// Nav scroll effect
const nav=document.getElementById('nav');
const toTop=document.getElementById('toTop');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>10);
  toTop.classList.toggle('show',window.scrollY>500);
});
toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Mobile menu
const hamburger=document.getElementById('hamburger');
const navLinks=document.getElementById('navLinks');
hamburger.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

// ============ DARK MODE TOGGLE (default = light) ============
const themeToggle=document.getElementById('themeToggle');
const root=document.documentElement;
function setThemeIcon(mode){
  themeToggle.innerHTML= mode==='dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}
const savedTheme=localStorage.getItem('theme');
if(savedTheme==='dark'){root.setAttribute('data-theme','dark');setThemeIcon('dark');}
else{setThemeIcon('light');}
themeToggle.addEventListener('click',()=>{
  const isDark=root.getAttribute('data-theme')==='dark';
  if(isDark){root.removeAttribute('data-theme');localStorage.setItem('theme','light');setThemeIcon('light');}
  else{root.setAttribute('data-theme','dark');localStorage.setItem('theme','dark');setThemeIcon('dark');}
});

// Counters
function animateCounter(el){
  const target=parseInt(el.getAttribute('data-target'))||0;
  const duration=1400;const start=performance.now();
  function step(now){
    const p=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=Math.floor(eased*target);
    if(p<1)requestAnimationFrame(step);else el.textContent=target;
  }
  requestAnimationFrame(step);
}
const counterObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);counterObs.unobserve(e.target);}});
},{threshold:.4});
document.querySelectorAll('.counter').forEach(c=>{
  c.textContent=c.getAttribute('data-target')||'0';
  counterObs.observe(c);
});

// Reveal on scroll
const revealObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');revealObs.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

// Contact form success (Safe check for multi-page setup)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit',function(e){
    e.preventDefault();
    document.getElementById('formSuccess').classList.add('show');
    this.reset();
    setTimeout(()=>document.getElementById('formSuccess').classList.remove('show'),4000);
  });
}