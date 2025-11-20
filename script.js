// ripple on click for elements with .ripple-target
document.addEventListener('click', function (e) {
  const el = e.target.closest('.ripple-target');
  if (!el) return;

  // create ripple
  const r = document.createElement('span');
  r.className = 'ripple';
  document.body.appendChild(r);

  // place at mouse pos
  r.style.left = e.pageX + 'px';
  r.style.top = e.pageY + 'px';

  // remove after animation
  setTimeout(() => r.remove(), 700);
});

// fade-in sections when scrolled into view
const io = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting) ent.target.classList.add('visible');
  });
}, {threshold: 0.12});

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// small accessibility: keyboard focus styles for quick buttons
document.querySelectorAll('.quick-btn, .retro-btn, .btn, .more-link').forEach(el=>{
  el.addEventListener('keydown', (ev)=>{
    if(ev.key === 'Enter' || ev.key === ' '){
      ev.target.click();
    }
  });
});


// highlight target section when clicking quick buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const targetID = btn.getAttribute('href'); // e.g. #work
    const section = document.querySelector(targetID);
    if (!section) return;

    // remove old flash if still present
    section.classList.remove('section-highlight');

    // force reflow so animation restarts
    void section.offsetWidth;

    // add highlight
    section.classList.add('section-highlight');
  });
});
