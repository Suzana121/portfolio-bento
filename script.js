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
