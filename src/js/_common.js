import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function common() {
    window.addEventListener('DOMContentLoaded', function () {
        gsap.config({ nullTargetWarn: false });

        // フッター TOPスクロールボタン
        const scrollTopButton = document.getElementById("js-scrollTop");
        if (scrollTopButton) {
            window.addEventListener("scroll", () => {
                const isScrollingDown = window.scrollY > 400;
                const currentOpacity = gsap.getProperty(scrollTopButton, "opacity");

                if ((isScrollingDown && currentOpacity === 0) || (!isScrollingDown && currentOpacity === 1)) {
                    gsap.to(scrollTopButton, {
                        duration: 1,
                        autoAlpha: isScrollingDown ? 1 : 0,
                        ease: isScrollingDown ? "power3.out" : "power3.in",
                    });
                }
            });

            scrollTopButton.addEventListener("click", () => {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: 0,
                        autoKill: false,
                    },
                });
            });
        }

        // 電話PC時は無効
        const ua = navigator.userAgent.toLowerCase();
        const isMobile = /iphone/.test(ua) || /android(.+)?mobile/.test(ua);

        if (!isMobile) {
            const telLinks = document.querySelectorAll('a[href^="tel:"]');
            telLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                });
                link.style.cursor = 'default';
                link.style.opacity = '1';
            });
        }
    });
}
