import { onShowMainNav, onCloseMainNav } from './main-nav.js';
import { onClickScrollLink } from './scroll.js';

const scrollLinks = document.querySelectorAll('.j-scroll-link');

const events = () => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('j-scroll-link')) {
      scrollLinks.forEach(() => {
        onClickScrollLink(e);
        onCloseMainNav(e);
      })
    }

    if (e.target.classList.contains('j-burger')) {
      onShowMainNav(e)
    }
  })

  document.addEventListener('keydown', (e) => {
    onCloseMainNav(e)
  })
}

export { events }
