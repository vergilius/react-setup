const template = `
  <svg viewBox="0 0 100 100">
    <path d="M0,50a50,50 0 1,0 100,0a50,50 0 1,0 -100,0"/>
  </svg>`;

// const fluctuate = value => value * Math.floor(Math.random() * 2);
const texts = [
  'Hi boss! howdy?',
  `There's more in the world than you can imagine in your whole life`,
  `Deciding upon someone's sitting place... Life sucks`
];

const POSITION = {
  RIGHT: window.innerWidth,
  LEFT: 0,
  TOP: 0,
  BOTTOM: window.innerHeight
};

const positionFromAlignment = alignment => {
  return {
    x: alignment.x > 0 ? POSITION.RIGHT : POSITION.LEFT,
    y: alignment.y > 0 ? POSITION.BOTTOM : POSITION.TOP
  }
}

export default class Bubble {
  constructor({container, alignment, size}) {
    this.$el = null;
    this.$container = container;
    this.alignment = alignment;

    const position = positionFromAlignment(alignment);
    this.position = {
      centerX: position.x - size / 2,
      centerY: position.y - size / 2,
      x: position.x,
      y: position.y
    };
    this.size = size;
  }

  // handleAnimationEnd = event => {
  //   this.addText();
  // };

  // addText() {
  //   if (this.$text) {
  //     return;
  //   }

  //   const text = texts[Math.floor(Math.random() * texts.length)];

  //   this.$text = document.createElement('div');
  //   this.$text.classList.add('text');
  //   this.$text.innerHTML = text;

  //   this.$text.style.top = `${this.size / 4}px`;
  //   this.$text.style.left = `${this.size / 2}px`;

  //   this.$text.style.width = `${this.size / 2.5}px`;
  //   this.$text.style.height = `${this.size / 2.5}px`;

  //   this.$el.appendChild(this.$text);

  //   this.$text.classList.add('text--visible');
  // }

  animate() {
    // this.$svg.removeEventListener('transitionend', this.handleAnimationEnd);
    // this.$svg.addEventListener('transitionend', this.handleAnimationEnd);

    setTimeout(() => {
      this.$svg.style.width = `${this.size}px`;
      this.$svg.style.height = `${this.size}px`;
      this.$svg.style.top = `0px`;
      this.$svg.style.left = `0px`;
    }, 1);
  }

  destroy() {
    if (this.$el) {
      this.$container.removeChild(this.$el);
    }
  }

  render() {
    this.destroy();

    this.$el = document.createElement('div');

    this.$el.innerHTML = template;
    this.$el.classList.add('speech-bubble');

    this.$el.style.top = `${this.position.centerY}px`;
    this.$el.style.left = `${this.position.centerX}px`;

    this.$container.appendChild(this.$el);
    this.$svg = this.$el.querySelector('svg');

    this.$svg.style.top = `${this.position.centerY}px`;
    this.$svg.style.left = `${this.position.centerX}px`;

    this.animate();
  }
}
