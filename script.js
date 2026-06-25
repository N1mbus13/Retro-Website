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

// Theme Color Switcher with localStorage state management
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const updateToggleUI = (isDark) => {
    const icon = themeToggle.querySelector('.mode-icon');
    const text = themeToggle.querySelector('.mode-text');
    if (icon) icon.textContent = isDark ? '🌙' : '⚡';
    if (text) text.textContent = isDark ? 'DARK' : 'LIGHT';
  };

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-brutalist');
    const isDark = document.documentElement.classList.contains('dark-brutalist');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateToggleUI(isDark);
  });

  // Apply saved preference on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-brutalist');
    updateToggleUI(true);
  } else {
    updateToggleUI(false);
  }
}
