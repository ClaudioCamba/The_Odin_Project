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
        const btn = document.createElement('button');
        btn.innerText = this.position;
        btn.setAttribute('data-pos', this.position);

        btn.addEventListener('click', () => {
            sliderComponent.sliderPos(this.start);
            sliderComponent.activeSlide(this.object);
        });

        this.dot = btn;
        return btn;
    }

    active() {
        this.dot.classList.add('active');
        this.elem.classList.add('active');
    }

    inactive() {
        this.dot.classList.remove('active');
        this.elem.classList.remove('active');
    }

};

// Slider module
const sliderComponent = (() => {
    // Variables
    let slides = [];
    const imgSlider = document.querySelector('.image-slider'); // Scroll position check
    const sliderWrap = document.querySelector('.slider-wrap'); // Width = all images width
    const btnPrev = document.querySelector('.s-prev');
    const btnNext = document.querySelector('.s-next');
    const dotsWrap = document.querySelector('.nav-dots');

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
            imgs[i].setAttribute('data-pos', i);
            slides.push(new Slide(imgs[i], slideVal.width, startPoint, wrapElem.width, i));
        };
        console.log(slides);
    };

    // Next Functions
    const nextSlide = () => {
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].start > imgSlider.scrollLeft) {
                sliderPos(slides[i].start);
                activeSlide(slides[i]);
                break;
            } else if (slides[slides.length - 1].start === imgSlider.scrollLeft) {
                sliderPos(0);
            }
        }
    }

    // Prev Function
    const prevSlide = () => {
        for (let i = slides.length - 1; i >= 0; i--) {
            if (slides[i].start < imgSlider.scrollLeft) {
                sliderPos(slides[i].start);
                activeSlide(slides[i]);
                break;
            }
        }
    }

    // Navigation dots
    const navDots = () => {
        dotsWrap.innerHTML = '';
        for (const slide of slides) {
            const wrapLI = document.createElement('li');
            wrapLI.appendChild(slide.btnDot());
            dotsWrap.append(wrapLI);
        }
    }

    // Control slider position
    const sliderPos = (p) => {
        return imgSlider.scroll({ left: p, top: 0, behavior: 'smooth' });
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
    }

    return { createSlides, nextSlide, prevSlide, navDots, sliderPos, activeSlide, btnPrev, btnNext }
})();

// Run main function after page has fully loaded
window.addEventListener('load', () => {
    sliderComponent.createSlides();
    sliderComponent.navDots();
    sliderComponent.btnPrev.addEventListener('click', () => sliderComponent.prevSlide());
    sliderComponent.btnNext.addEventListener('click', () => sliderComponent.nextSlide());
});
