export function initializeNavbarToggler(): void {
    document.addEventListener('DOMContentLoaded', function () {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarMenu = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarMenu) {
            navbarToggler.addEventListener('click', function () {
                navbarMenu.classList.toggle('show');
            });
        }
    });
}