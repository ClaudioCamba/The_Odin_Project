// Slide class
class Slide {
  constructor(elem, width, start, parentW, position) {
    this.elem = elem;
    this.width = width;
    this.start = start;
    this.parentW = parentW;
    this.position = position;
    this.object = this;
    this.dot = null;
  }

  btnDot() {
    const btn = document.createElement("button");
    btn.innerText = this.position;
    btn.setAttribute("data-pos", this.position);

    btn.addEventListener("click", () => {
      sliderComponent.sliderPos(this);
      sliderComponent.activeSlide(this.object);
      sliderComponent.autoStop();
      setTimeout(sliderComponent.autoPlay, 1000);
    });

    this.dot = btn;
    return btn;
  }

  active() {
    this.dot.classList.add("active");
    this.elem.classList.add("active");
  }

  inactive() {
    this.dot.classList.remove("active");
    this.elem.classList.remove("active");
  }
}

// Slider module
const sliderComponent = (() => {
  // Variables
  let slides = [];
  const imgSlider = document.querySelector(".image-slider"); // Scroll position check
  const sliderWrap = document.querySelector(".slider-wrap"); // Width = all images width
  const btnPrev = document.querySelector(".s-prev");
  const btnNext = document.querySelector(".s-next");
  const dotsWrap = document.querySelector(".nav-dots");

  // Create classes
  const createSlides = () => {
    const imgs = imgSlider.children[0].children;
    slides = [];
    for (let i = 0; i < imgs.length; i++) {
      const wrapElem = sliderWrap.getBoundingClientRect();
      const slideVal = imgs[i].getBoundingClientRect();
      let startPoint = 0;

      if (slides.length > 0) {
        for (const slide of slides) {
          startPoint += slide.width;
        }
      }

      imgs[i].setAttribute("data-pos", i);
      slides.push(new Slide(imgs[i], slideVal.width, startPoint, wrapElem.width, i));
    }
  };

  // Next Functions
  const nextSlide = () => {
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].start > imgSlider.scrollLeft) {
        sliderPos(slides[i]);
        break;
      } else if (slides[slides.length - 1].start === imgSlider.scrollLeft) {
        sliderPos(slides[0]);
      }
    }
  };

  // Prev Function
  const prevSlide = () => {
    for (let i = slides.length - 1; i >= 0; i--) {
      if (slides[i].start < imgSlider.scrollLeft) {
        sliderPos(slides[i]);
        break;
      }
    }
  };

  // Navigation dots
  const navDots = () => {
    dotsWrap.innerHTML = "";
    for (const slide of slides) {
      const wrapLI = document.createElement("li");
      wrapLI.appendChild(slide.btnDot());
      dotsWrap.append(wrapLI);
    }
  };

  // Control slider position
  const sliderPos = (p) => {
    activeSlide(p); // Active slides
    return imgSlider.scroll({ left: p.start, top: 0, behavior: "smooth" });
  };

  // Active dot
  const activeSlide = (e) => {
    for (const slide of slides) {
      if (e === slide) {
        slide.active();
      } else {
        slide.inactive();
      }
    }
  };

  // Autoplay
  const autoPlay = setInterval(nextSlide, 5000);
  const autoStop = () => clearInterval(autoPlay);

  return { createSlides, nextSlide, prevSlide, navDots, sliderPos, activeSlide, autoStop, autoPlay, btnPrev, btnNext, slides };
})();

// Run main function after page has fully loaded
window.addEventListener("load", () => {
  sliderComponent.createSlides();
  sliderComponent.navDots();
  sliderComponent.btnPrev.addEventListener("click", () => sliderComponent.prevSlide());
  sliderComponent.btnNext.addEventListener("click", () => sliderComponent.nextSlide());
});
