import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export function common() {
    window.addEventListener('DOMContentLoaded', function () {
        gsap.config({ nullTargetWarn: false })

        // フッター TOPスクロールボタン
        window.addEventListener("scroll", () => {
            const scrollTopButton = document.getElementById("js-scrollTop");
            const isScrollingDown = window.scrollY > 400;

            if ((isScrollingDown && gsap.getProperty(scrollTopButton, "opacity") === 0) ||
                (!isScrollingDown && gsap.getProperty(scrollTopButton, "opacity") === 1)) {
                gsap.to(scrollTopButton, {
                    duration: 1,
                    autoAlpha: isScrollingDown ? 1 : 0,
                    ease: isScrollingDown ? "power3.out" : "power3.in",
                });
            }
        });

        document.getElementById("js-scrollTop").addEventListener("click", () => {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: 0,
                    autoKill: false,
                },
            });
        });

        // 電話PC時は無効
        var ua = navigator.userAgent.toLowerCase();
        var isMobile = /iphone/.test(ua) || /android(.+)?mobile/.test(ua);

        if (!isMobile) {
            document.querySelectorAll('a[href^="tel:"]').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                });
                link.style.cursor = 'default'; // カーソルのスタイルをデフォルトに設定
                link.style.opacity = '1';      // 不透明度を1に設定
            });
        }
    })
}
