export default class Animations {
  /**
   * @type {number}
   */
  screenWidth;

  keyframesForLeft = [
    {
      transform: 'translateX(-70px)',
      opacity: 0,
      offset: 0,
    },
    {
      transform: 'translateX(0px)',
      opacity: 1,
      offset: 1,
    },
  ];

  keyframesForRight = [
    {
      transform: 'translateX(70px)',
      opacity: 0,
      offset: 0,
    },
    {
      transform: 'translateX(0px)',
      opacity: 1,
      offset: 1,
    },
  ];

  keyframesForUp = [
    {
      transform: 'translateY(50px)',
      opacity: 0,
      offset: 0,
    },
    {
      transform: 'translateY(0px)',
      opacity: 1,
      offset: 1,
    },
  ];

  optionsForSideAnimations = {
    duration: 100,
    delay: 300,
    iterations: 1,
    fill: 'forwards',
    easing: 'ease',
  };

  constructor() {
    this.screenWidth = document.documentElement.clientWidth;
    this.scrollObserverElement = document.querySelector('.observe');
    this.animatedItems = document.querySelectorAll('.side-animation');
  }

  setAnimationOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setAnimation();
        }
      });
    });
    observer.observe(this.scrollObserverElement);
  }

  setAnimation() {
    this.animatedItems.forEach((item, i) => {
      this.optionsForSideAnimations.delay = 500 * (i + 1);
      if (this.screenWidth < 600) {
        if (i % 2 !== 0) {
          item.animate(this.keyframesForLeft, this.optionsForSideAnimations);
        } else {
          item.animate(this.keyframesForRight, this.optionsForSideAnimations);
        }
      } else {
        item.animate(this.keyframesForUp, this.optionsForSideAnimations);
      }
    });
  }

  init() {
    this.setAnimationOnScroll();
  }
}
