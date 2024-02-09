const images = [
    'parrot.png', 'rooster.png', 'flamingo.png', 'parrot-2.png', 'rooster-2.png', 'flamingo-2.png', 'parrot-3.png',
    'rooster-3.png', 'flamingo-3.png'
];

let activeImage = 0;
const sliderPlace = document.querySelector('.slider-line');
const widthOffset = document.querySelector('.slider').clientWidth;
sliderPlace.style.width = 3 * widthOffset + 'px';
sliderPlace.style.height = widthOffset + 'px';
sliderPlace.style.left = '-' + widthOffset + 'px';
let flag = true;

const initSlider = () => {
    const img = document.createElement('img');
    img.alt = '';
    img.src = './img/' + images[activeImage];
    sliderPlace.append(img);
    nextImageGenerate();
    prevImageGenerate();
}

const nextImageGenerate = () => {
    let nextImage = activeImage + 1;
    if (nextImage >= images.length) nextImage = 0;
    const img = document.createElement('img');
    img.alt = '';
    img.src = './img/' + images[nextImage];
    sliderPlace.append(img);
}

const prevImageGenerate = (w = false) => {
    let prevImage = activeImage - 1;
    if (prevImage < 0) prevImage = images.length - 1;

    const img = document.createElement('img');
    img.alt = '';
    img.src = './img/' + images[prevImage];
    if (w) img.style.width = 0;
    sliderPlace.prepend(img);
}

const nextSlide = () => {
    if (!flag) return;
    flag = !flag;

    activeImage++;
    if (activeImage >= images.length) activeImage = 0;
    nextImageGenerate();
    animate({
        duration: 1000,
        draw: function (progress) {
            document.querySelector('.slider-line img').style.width = (widthOffset * (1 - progress)) + 'px'
        },
        removeElement: document.querySelector('.slider-line img')
    });
}

const prevSlide = () => {
    if (!flag) return;
    flag = !flag;

    activeImage--;
    if (activeImage < 0) activeImage = images.length - 1;
    prevImageGenerate(true);
    animate({
        duration: 1000,
        draw: function (progress) {
            document.querySelector('.slider-line img').style.width = (widthOffset * progress) + 'px'
        },
        removeElement: document.querySelector('.slider-line img:last-child')
    });
}

initSlider();

document.querySelector('.next-button').addEventListener('click', nextSlide);
document.querySelector('.prev-button').addEventListener('click', prevSlide);

const animate = ({ duration, draw, removeElement }) => {
    const start = performance.now();

    requestAnimationFrame(function animate(time) {
        let step = (time - start) / duration;
        if (step > 1) step = 1;
        draw(step);
        if (step < 1) {
            requestAnimationFrame(animate);
        }
        else {
            removeElement.remove();
            flag = true;
        }
    });
}

