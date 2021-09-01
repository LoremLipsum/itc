const counters = document.querySelectorAll('.j-counter');

const useCounter = () => {
  if (!counters) return;
  const upClass = 'j-counter-up';
  const downClass = 'j-counter-down';
  const inputClass = '.j-counter-input';
  let input;
  let count;
  let el;

  for (var i = 0; i < counters.length; i += 1) {
    counters[i].addEventListener('click', function(e) {
      e.preventDefault();
      input = e.currentTarget.querySelector(inputClass);
      el = e.target;
      count = parseInt(input.getAttribute('data-count'), 10);

      if (el.classList.contains(downClass)) {
        count = count == 1 ? count : (count - 1);
      } else if (el.classList.contains(upClass)){
        count += 1;
      }

      input.value = count;
      input.setAttribute('data-count', count);
    });
  }
}

export { useCounter };
