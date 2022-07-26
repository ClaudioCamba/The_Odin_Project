// Dropdown Function
const mobileMenu = (() => {
    const btnOpen = document.querySelector('.menu-open');
    const btnClose = document.querySelector('.menu-close');

    btnOpen.addEventListener('click', () => { btnOpen.parentElement.classList.add('active') });
    btnClose.addEventListener('click', () => { btnClose.parentElement.classList.remove('active') });

})();