const hamburger = document.getElementById('hamburger')
const headerNav = document.getElementById('header_navigation')

hamburger.addEventListener('click', () => {
    headerNav.classList.toggle('show');
});