// Cardify phone: switch between real app screenshots.
const buttons = document.querySelectorAll('.pill[data-screen]');
const shots = document.querySelectorAll('.phone-screen img[data-shot]');
const order = [...buttons].map((b) => b.dataset.screen);

function showScreen(name) {
  buttons.forEach((b) => {
    const on = b.dataset.screen === name;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', String(on));
  });
  shots.forEach((img) => {
    img.hidden = img.dataset.shot !== name;
  });
}

// Rotate through the screens on its own until the visitor picks one.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let current = 0;
let timer = reduceMotion ? null : setInterval(() => {
  current = (current + 1) % order.length;
  showScreen(order[current]);
}, 3500);

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    current = order.indexOf(btn.dataset.screen);
    showScreen(btn.dataset.screen);
  });
});

// ---------- Entrance animations ----------

// Split the headline into words so they can rise in one by one.
const title = document.querySelector('.a-intro h1');
if (title) {
  title.innerHTML = title.textContent
    .split(' ')
    .map((w, i) => `<span class="word" style="--i:${i}">${w}</span>`)
    .join(' ');
}

const revealEls = document.querySelectorAll('.nav, .bento > .card');
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.setProperty('--d', `${Math.min(i, 6) * 90}ms`);
});

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// ---------- Cursor spotlight on cards ----------
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});
