document.addEventListener('DOMContentLoaded', function () {
    let formData = {};
    const form = document.querySelector('#form');
    const LS = localStorage;
    const name = document.querySelector('.name');
    const tel = document.querySelector('#tel');

    form.addEventListener('input', function (event) {
        formData[event.target.name] = event.target.value;
        LS.setItem('formData', JSON.stringify(formData));
    });


    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        alert(`${name.value}, мы получили Ваш номер - ${tel.value}, скоро с Вами свяжется наш менеджер. Ваш выбор - наше вдохновление!`);
    })

    if (LS.getItem('formData')) {
        formData = JSON.parse(LS.getItem('formData'));

        for (let key in formData) {
            form.elements[key].value = formData[key];
        }
    }

})