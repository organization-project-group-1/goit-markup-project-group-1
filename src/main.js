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