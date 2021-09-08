const body = document.querySelector('.j-body');
const burger = document.querySelector('.j-burger');
const mainNav = document.querySelector('.j-main-nav');
const isEscKey = (e) => e.key === 'Escape' || e.key === 'Esc';

const onShowMainNav = (e) => {
  e.preventDefault();
  body.classList.toggle('is-open-main-nav');
  burger.classList.toggle('is-active');
  mainNav.classList.toggle('is-active');
}

const onCloseMainNav = (e) => {
  if (isEscKey(e) || e.type === 'click') {
    e.preventDefault();
    body.classList.remove('is-open-main-nav');
    burger.classList.remove('is-active');
    mainNav.classList.remove('is-active');
  }
}

export { onShowMainNav, onCloseMainNav };
