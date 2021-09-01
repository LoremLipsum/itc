import { useCounter } from './counter.js';

new Glider(document.querySelector('.glider'), {
    slidesToShow: 'auto',
    slidesToScroll: 'auto',
    itemWidth: 142,
    draggable: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 'auto',
          slidesToScroll: 'auto',
          itemWidth: 186,
          duration: 0.25
        }
      },{
        breakpoint: 1360,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          itemWidth: 'auto',
          duration: 0.25
        }
      }
    ]
  }
)

useCounter();
