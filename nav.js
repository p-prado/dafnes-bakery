const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', ()=> {
    const visibility = primaryNav.getAttribute('data-visible')
    console.log(visibility);

    if (visibility === "false") {
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
    } else if (visibility === "true"){
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
    }
})

// CHANGE NAV COLOR ON SCROLL
// document.querySelector(window).scroll(function() {
//     if (document.querySelector(this).scrollTop > 400) {
//         document.querySelector( ".header #background" ).fadeIn();
//     } else {
//         document.querySelector( ".header #background" ).fadeOut();
//     }
// });