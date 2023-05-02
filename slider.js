// Slider content id, indicates what 'page' the slider is on.
var sliderPage = 1;
// Get all the slider buttons
var sliderButtons = document.querySelectorAll('.slider-btn');
// For every slider button
sliderButtons.forEach(sliderButton => {
    // Add a click event listener
    sliderButton.addEventListener('click', function () {
        setSliderContent(sliderButton.dataset.linkedSliderContent);
    });
});

// Function to set the slider content to the content ID passed in as parameter.
function setSliderContent(sliderContentId) {
    let clickedButton = document.querySelector(`[data-linked-slider-content="${sliderContentId}"]`);
    if (!clickedButton.classList.contains("slider-btn-active")) {
        let btnContent = document.querySelector(`[data-slider-content-id="${sliderContentId}"]`);
        let sliderContentActive = document.querySelector('.slider-content-active');
        let sliderBtnActive = document.querySelector('.slider-btn-active');
        // Make the slider-content with the correct data-slider-content-id active
        btnContent.classList.add("slider-content-active");
        // Make the other slider content inactive
        sliderContentActive.classList.remove("slider-content-active");
        // Make the clicked button appearance active
        clickedButton.classList.add("slider-btn-active");
        // Make the other buttons inactive
        sliderBtnActive.classList.remove("slider-btn-active");
        sliderPage = sliderContentId;
    }
}

// Make the slider go to the next slider content every three seconds.
setInterval(function () {
    if (sliderPage >= sliderButtons.length) {
        sliderPage = 0;
    }
    setSliderContent(sliderPage + 1);
}, 7500);







// RESPONSIVE CARD SLIDER

// Get elements from the DOM
const sliderTrack = document.querySelector('.slider-track');
const sliderCards = Array.from(document.querySelectorAll('.card'));
const prevButton = document.querySelector('.slider-button--left');
const nextButton = document.querySelector('.slider-button--right');

const largeMediaQuery = window.matchMedia('(max-width: 1200px)');
const mediumMediaQuery = window.matchMedia('(max-width: 960px)');
const smallMediaQuery = window.matchMedia('(max-width: 768px)');

let cardWidth = smallMediaQuery.matches ? 100 : mediumMediaQuery.matches ? 50 : 33.33;
let cardsShown = smallMediaQuery.matches ? 1 : mediumMediaQuery.matches ? 2 : 3;

// Set initial position of the slider
let currentPosition = 0;

// Set up auto-scroll interval variable
let autoScrollInterval = null;

// Define function to start auto-scroll
const startAutoScroll = () => {
    // Set interval to change position and update slider every second
    autoScrollInterval = setInterval(() => {
        currentPosition = currentPosition < sliderCards.length - cardsShown ? currentPosition + 1 : 0;
        updateSlider();
    }, 6000);
};

// Define function to stop auto-scroll
const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
};

// Define function to restart auto-scroll
const restartAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
};

// Define function to initialize the slider
const initSlider = () => {
    // Start auto-scrolling
    startAutoScroll();

    // Add event listeners to stop and restart auto-scroll on mouseenter and mouseleave of slider track
    sliderTrack.addEventListener('mouseenter', stopAutoScroll);
    sliderTrack.addEventListener('mouseleave', restartAutoScroll);

    // Add event listeners to prev and next buttons to change position and update slider
    prevButton.addEventListener('click', () => {
        currentPosition = currentPosition > 0 ? currentPosition - 1 : 0;
        updateSlider();
    });
    nextButton.addEventListener('click', () => {
        currentPosition = currentPosition < sliderCards.length - cardsShown ? currentPosition + 1 : sliderCards.length - cardsShown;
        updateSlider();
    });
};

// Define function to update the slider
const updateSlider = () => {
    // Move slider track to show current position
    // Move the slider the required amount according to the media query currently in use.
    sliderTrack.style.transform = `translateX(-${currentPosition * cardWidth}%)`;


    // Add classes to cards to show current, previous, and next cards
    sliderCards.forEach((card, index) => {
        card.classList.remove('slider-card--current');
        card.classList.remove('slider-card--previous');
        card.classList.remove('slider-card--next');

        if (index === currentPosition) {
            card.classList.add('slider-card--current');
        } else if (index < currentPosition) {
            card.classList.add('slider-card--previous');
        } else if (index > currentPosition + 2) {
            card.classList.add('slider-card--next');
        }
    });
};

// Call the initSlider function to initialize the slider
initSlider();

// On resize, reevaluate the values for the card width and cards shown.
window.addEventListener('resize', function(){
    cardWidth = smallMediaQuery.matches ? 100 : mediumMediaQuery.matches ? 50 : 33.33;
    cardsShown = smallMediaQuery.matches ? 1 : mediumMediaQuery.matches ? 2 : 3;
    updateSlider();
});