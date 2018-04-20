import '../scss/main.scss';
import Bubble from './bubble';

const $element = document.querySelector('.js-container');

let currentBubble = null;

const calculateRelativeBubblePosition = element => {
  const x = window.innerWidth - element.x > window.innerWidth / 2
      ? 1
      : -1;

  const y = window.innerHeight - element.y > window.innerHeight / 2
      ? 1
      : -1;

  return {
    x,
    y
  };
}

const getLargestDimension = () => window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

$element.addEventListener('click', () => {
  if (currentBubble) {
    currentBubble.destroy();
    currentBubble = null;
  }

  currentBubble = new Bubble({
    container: document.body,
    alignment: calculateRelativeBubblePosition($element.getBoundingClientRect()),
    size: getLargestDimension()
  });

  currentBubble.render();
});

$element.addEventListener('dragend', event => {
  $element.style.left = `${event.pageX}px`;
  $element.style.top = `${event.pageY}px`;

  event.stopPropagation();
});
