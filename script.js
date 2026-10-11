// Fraud-detection demo: switch between an everyday and a suspicious transaction.
const buttons = document.querySelectorAll('.pill[data-mode]');
const views = document.querySelectorAll('.txn[data-view]');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    buttons.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    views.forEach((v) => {
      v.hidden = v.dataset.view !== mode;
    });
  });
});

// Phone glow follows the demo state.
const phone = document.querySelector('.phone');
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    phone.classList.toggle('is-flagged', btn.dataset.mode === 'flagged');
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
