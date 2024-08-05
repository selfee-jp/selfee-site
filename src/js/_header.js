export function header() {
    document.addEventListener('DOMContentLoaded', function () {
        const hamburgers = document.querySelectorAll('.js-hamburger');
        const drawer = document.querySelector('.js-drawer');
        const drawerOverlay = document.querySelector('.js-drawer-overlay');
        const navLinks = document.querySelectorAll('.header__nav-item a');
        const drawerLinks = document.querySelectorAll('.js-drawer a[href]');
        
        if (hamburgers.length > 0 && drawer && drawerOverlay && navLinks.length > 0 && drawerLinks.length > 0) {
            hamburgers.forEach(hamburger => {
                hamburger.addEventListener('click', function () {
                    this.classList.toggle('is-open');
                    if (drawer.classList.contains('is-open')) {
                        closeDrawer();
                    } else {
                        openDrawer();
                    }
                });
            });

            navLinks.forEach(link => {
                link.addEventListener('click', function () {
                    if (document.querySelector('.js-hamburger.is-open')) {
                        closeDrawer();
                    }
                });
            });

            drawerLinks.forEach(link => {
                link.addEventListener('click', function () {
                    closeDrawer();
                });
            });

            drawerOverlay.addEventListener('click', function () {
                closeDrawer();
            });

            window.addEventListener('resize', function () {
                if (window.matchMedia('(min-width: 768px)').matches) {
                    closeDrawer();
                }
            });
        }
    });

    function openDrawer() {
        const drawer = document.querySelector('.js-drawer');
        const body = document.body;
        if (drawer && body) {
            drawer.classList.add('is-open');
            body.classList.add('body-no-scroll');
        }
    }

    function closeDrawer() {
        const drawer = document.querySelector('.js-drawer');
        const header = document.querySelector('.js-header');
        const hamburger = document.querySelector('.js-hamburger');
        const body = document.body;
        if (drawer && hamburger && body) {
            drawer.classList.remove('is-open');
            hamburger.classList.remove('is-open');
            body.classList.remove('body-no-scroll');
        }
    }
}
