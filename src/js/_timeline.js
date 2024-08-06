import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export function timeline() {
    window.addEventListener('DOMContentLoaded', function () {
        gsap.config({ nullTargetWarn: false })

        const companyHistoryWrapper = document.querySelector('.company-history__wrapper');

        if (companyHistoryWrapper) {
            // タイムラインのコンテンツ表示
            const historyElements = document.querySelectorAll(".company-history__list");
            historyElements.forEach((element) => {
                gsap.fromTo(
                    element,
                    {
                        autoAlpha: 0,
                        y: 5,
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 2,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: element, // トリガーとなる要素を指定
                            start: "top 75%", // スクロール開始位置を指定
                            toggleActions: 'play none none reverse',
                            // markers: true,
                        },
                    }
                );
            });

            // .company-history__wrapper が存在する場合のみ以下のコードを実行
            const line = document.querySelector('.company-history__line');
            gsap.fromTo(
                line, {
                scaleY: 0,
                duration: .5,
            },
                {
                    scaleY: 1,
                    transformOrigin: "top center",
                    duration: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: '.company-history__wrapper', // トリガーとなる要素を指定
                        start: "top 70%", // スクロール開始位置を指定
                        end: "bottom bottom",
                        toggleActions: 'play none none reverse',
                        scrub: true,
                        // markers: true,
                    },
                }
            );

       
        }

    });
}
