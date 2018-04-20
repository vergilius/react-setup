import '../scss/main.scss';

const circle = `
  <svg viewBox="0 0 100 100">
    <path d="M0,50a50,50 0 1,0 100,0a50,50 0 1,0 -100,0"/>
  </svg>`;

const wrapper = document.querySelector(".js-wrapper");
const element = document.querySelector(".js-container");
const elementPosition = {
  x: element.getBoundingClientRect().x,
  y: element.getBoundingClientRect().y
};

function initialize() {
  const SIZE = {
    LARGE: window.innerWidth
  };

  const POSITION = {
    RIGHT: window.innerWidth,
    LEFT: 0,
    TOP: 0,
    BOTTOM: window.innerHeight
  };

  element.removeEventListener("click", addBubble);
  element.addEventListener("click", addBubble);
}

function calculateSpeechBubblePosition(elementPosition) {
  const x =
    window.innerWidth - elementPosition.x > window.innerWidth / 2
      ? POSITION.RIGHT
      : POSITION.LEFT;

  const y =
    window.innerHeight - elementPosition.y > window.innerHeight / 2
      ? POSITION.BOTTOM
      : POSITION.TOP;

  return {
    x,
    y
  };
}

function addBubble() {
  const bubble = document.querySelector('.speech-bubble');
  if (bubble) {
    bubble.parentElement.removeChild(bubble);
  }
  
  renderSpeechBubble(calculateSpeechBubblePosition(elementPosition));
}

function renderSpeechBubble(position) {
  const element = document.createElement("div");
  element.classList.add("speech-bubble");

  element.innerHTML = circle;

  element.style.top = position.y - SIZE.LARGE / 2 + "px";
  element.style.left = position.x - SIZE.LARGE / 2 + "px";

  document.body.appendChild(element);

  setTimeout(function() {
    const svg = element.querySelector("svg");

    svg.style.width = `${SIZE.LARGE}px`;
    svg.style.height = `${SIZE.LARGE}px`;
  }, 1);
}

window.addEventListener("resize", initialize);
initialize();
