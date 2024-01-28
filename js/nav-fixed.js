document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.special-price');
    const nav = document.querySelector('.navigation');

    const navFixed = () => {
        let scrollTop = window.scrollY;
        let heroCenter = hero.offsetHeight;
        if (scrollTop >= heroCenter) {
            nav.classList.add('fixed');
        } else {
            nav.classList.remove('fixed');
        }
    }
    navFixed();
    window.addEventListener('scroll', () => {
        navFixed();
    });
});