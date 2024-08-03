import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', function () {
    gsap.config({ nullTargetWarn: false });

    // 画像が横から出てくるアニメーション
    const clipPathElements = document.querySelectorAll(".js-clip-path");
    clipPathElements.forEach((element) => {
        gsap.fromTo(
            element,
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                webkitMaskImage: 'linear-gradient(to right, black 100%, transparent 100%)',
                maskImage: 'linear-gradient(to right, black 100%, transparent 100%)',
                duration: 0.3,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });

    // MVのスクロールアニメーション
    const scrollImg = document.querySelector('.mv__scroll img');
    if (scrollImg) {
        gsap.fromTo(scrollImg,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" }
        );
    }

    // 文字が順番に出てくるアニメーション
    gsap.set('.js-move-text', { y: 20, autoAlpha: 0 });

    gsap.utils.toArray('.trigger-effect').forEach((trigger) => {
        let text = trigger.querySelectorAll('.js-move-text');
        ScrollTrigger.create({
            trigger: trigger,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(text, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.2 });
            }
        });
    });

    // 通常のパララックスエフェクト
    gsap.utils.toArray('.js-parallax').forEach(parallax => {
        let img = parallax.querySelector('.js-parallax__img');

        if (img) {
            // 縦方向の移動
            gsap.fromTo(img, { y: 100 }, {
                y: -100,
                scrollTrigger: {
                    trigger: parallax,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });

            // ぼかしからくっきりと
            gsap.fromTo(img, { filter: 'blur(10px)' }, {
                filter: 'blur(0px)',
                scrollTrigger: {
                    trigger: parallax,
                    start: 'top bottom',
                    end: 'top center',
                    scrub: 1,
                }
            });
        }
    });

    // FV用のパララックスエフェクト
    gsap.utils.toArray('.js-parallax-mv').forEach(parallax => {
        let img = parallax.querySelector('.js-parallax__img-mv');

        if (img) {
            // 縦方向の移動
            gsap.fromTo(img, { y: 50 }, {
                y: -50,
                scrollTrigger: {
                    trigger: parallax,
                    start: 'top center',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
        }
    });
});
