// Slider component control
class Slide {
    constructor(elem, width, start, parentW, position) {
        this.elem = elem;
        this.width = width;
        this.start = start;
        this.parentW = parentW;
        this.position = position;
    }
};

const sliderComponent = () => {
    let slides = [];
    const imgSlider = document.querySelector('.image-slider'); // Scroll position check
    const sliderWrap = document.querySelector('.slider-wrap'); // Width = all images width
    const btnPrev = document.querySelector('.s-prev');
    const btnNext = document.querySelector('.s-next');

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
            slides.push(new Slide(imgs[i], slideVal.width, startPoint, wrapElem.width, i));
        };
        console.log(slides);
    };

    // Prev / Next Functions
    const nextSlide = () => { imgSlider.scroll({ left: (imgSlider.scrollLeft + 400), top: 0, behavior: 'smooth' }); }
    const prevSlide = () => { imgSlider.scroll({ left: (imgSlider.scrollLeft - 400), top: 0, behavior: 'smooth' }); }

    btnPrev.addEventListener('click', prevSlide);
    btnNext.addEventListener('click', function () {
        nextSlide()
        console.log(slides);
        // updateSlides()
    });

    createSlides();
};

// Run main function after page has fully loaded
window.addEventListener('load', sliderComponent);