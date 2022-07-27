// Slider component control
class Slide {
    constructor(elem, width, start, parentW, position) {
        this.elem = elem;
        this.width = width;
        this.start = start;
        this.parentW = parentW;
        this.position = position;
    }

    getStart() { start };
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
    const nextSlide = () => {
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].start > imgSlider.scrollLeft) {
                imgSlider.scroll({ left: slides[i].start, top: 0, behavior: 'smooth' });
                break;
            } else if (slides[slides.length - 1].start === imgSlider.scrollLeft) {
                imgSlider.scroll({ left: 0, top: 0, behavior: 'smooth' });
            }
        }

    }


    const prevSlide = () => {
        for (let i = slides.length - 1; i >= 0; i--) {
            if (slides[i].start < imgSlider.scrollLeft) {
                imgSlider.scroll({ left: slides[i].start, top: 0, behavior: 'smooth' });
                break;
            }
        }
    }

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