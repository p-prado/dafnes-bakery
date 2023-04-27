const sliderTrack = document.querySelector('.slider-track');
const sliderCards = Array.from(document.querySelectorAll('.slider-card'));
const prevButton = document.querySelector('.slider-button--left');
const nextButton = document.querySelector('.slider-button--right');

let currentPosition = 0;

prevButton.addEventListener('click', () => {
  currentPosition = currentPosition > 0 ? currentPosition - 1 : 0;
  updateSlider();
});

nextButton.addEventListener('click', () => {
  currentPosition = currentPosition < sliderCards.length - 3 ? currentPosition + 1 : sliderCards.length - 3;
  updateSlider();
});

function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentPosition * 33.33}%)`;

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
}
