export function header() {
    document.addEventListener('DOMContentLoaded', function () {
        // gsap.config({ nullTargetWarn: false })
  
        document.querySelectorAll('.js-hamburger').forEach(function (hamburger) {
            hamburger.addEventListener('click', function () {
                this.classList.toggle('is-open');
                const drawer = document.querySelector('.js-drawer');
                if (drawer.classList.contains('is-open')) {
                    closeDrawer();
                } else {
                    openDrawer();
                }
            });
        });
  
        document.querySelectorAll('.header__nav-item a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (document.querySelector('.js-hamburger').classList.contains('is-open')) {
                    closeDrawer();
                }
            });
        });
  
        document.querySelectorAll('.js-drawer a[href]').forEach(function (link) {
            link.addEventListener('click', function () {
                closeDrawer();
            });
        });
  
        // js-drawer-overlayをクリックしたときにドロワーを閉じる
        document.querySelector('.js-drawer-overlay').addEventListener('click', function () {
            closeDrawer();
        });
  
        window.addEventListener('resize', function () {
            if (window.matchMedia('(min-width: 768px)').matches) {
                closeDrawer();
            }
        });
    });
  
    function openDrawer() {
        const drawer = document.querySelector('.js-drawer');
        drawer.classList.add('is-open');
        document.body.classList.add('body-no-scroll');
    }
  
    function closeDrawer() {
        const drawer = document.querySelector('.js-drawer');
        const header = document.querySelector('.js-header');
        const hamburger = document.querySelector('.js-hamburger');
        drawer.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        document.body.classList.remove('body-no-scroll');
    }
  }
  