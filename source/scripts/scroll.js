import { TABLET } from './utils.js';

const getScrollOfset = (width) => {
  if (document.documentElement.clientWidth < width) {
    return -70;
  } else {
    return -120;
  }
}

let scrollOfset = getScrollOfset(TABLET);

const onClickScrollLink = (e) => {
  e.preventDefault();
  let el = document.querySelector(e.target.getAttribute('href'));
  let heightScroll = el.getBoundingClientRect().top + window.pageYOffset + scrollOfset;
  window.scroll({top: heightScroll, behavior: 'smooth'});
}

export { onClickScrollLink };
