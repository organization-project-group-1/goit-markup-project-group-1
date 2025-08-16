const btn = document.querySelector('.menu-toggle');
const menu = document.getElementById('mobile-menu');
const drawer = document.getElementById('menu-drawer');
const closeBtn = document.querySelector('.menu-overlay__close');

function openMenu() {
  menu.classList.add('is-open');
  void menu.offsetWidth;
  drawer.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  btn.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  drawer.classList.remove('is-open');
  void menu.offsetWidth;
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  btn.setAttribute('aria-expanded', 'false');
}

btn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('.students-list');
  const wrapper = document.querySelector('.students-wrapper');
  if (!list || !wrapper) return;

  let timer, step, duration = 1000, pause = 10000;

  const getGap = () => {
    const cs = getComputedStyle(list);
    const g = parseFloat(cs.gap || cs.columnGap || 0);
    return isNaN(g) ? 0 : g;
  };

  const computeStep = () => {
    const card = list.querySelector('.student-card') || list.querySelector('.student-item');
    if (!card) return 0;
    const w = card.getBoundingClientRect().width;
    return w + getGap();
  };

  const shouldAnimate = () => window.innerWidth < 1280 && list.children.length > 1;

  const tick = () => {
    list.style.transition = `transform ${duration}ms linear`;
    list.style.transform = `translateX(-${step}px)`;
  };

  const afterMove = () => {
    list.style.transition = 'none';
    list.appendChild(list.firstElementChild);
    list.style.transform = 'translateX(0)';
    void list.offsetWidth;
    timer = setTimeout(tick, pause);
  };

  list.addEventListener('transitionend', afterMove);

  const start = () => {
    clearTimeout(timer);
    list.style.transition = 'none';
    list.style.transform = 'translateX(0)';
    if (shouldAnimate()) {
      step = computeStep();
      if (step > 0) timer = setTimeout(tick, pause);
    }
  };

  wrapper.addEventListener('mouseenter', () => clearTimeout(timer));
  wrapper.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => document.hidden ? clearTimeout(timer) : start());
  window.addEventListener('resize', start);

  start();
});