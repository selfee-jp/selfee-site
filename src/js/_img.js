import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', function () {
    gsap.config({ nullTargetWarn: false });

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
                duration: .3,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });

    const scrollImg = document.querySelector('.mv__scroll img');
    gsap.fromTo(scrollImg,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" }
    );


        /* initial */
        // gsap.set('.js-brightness', { filter: 'brightness(0)' })
        gsap.set('.img.blur', { filter: 'blur(10px)' })
        // gsap.set('.img.grayscale', { filter: 'grayscale(0)' })
        gsap.set('.js-move-text', { y: 20, autoAlpha: 0 })
        // const effect = ['brightness(.5)', 'blur(0px)', 'grayscale(1)'];//変化後の値を定義
        const effect = ['blur(0px)'];//変化後の値を定義
    
        /* 一番行数が少なく済みそう */
        gsap.utils.toArray('.trigger-effect').forEach((trigger, i) => {// 全ての.trigger-effectに対してアニメーションを定義していく
          let image = trigger.querySelector('.img');
          let text = trigger.querySelectorAll('.js-move-text');
          ScrollTrigger.create({
            trigger: trigger,
            start: 'top 90%',
            onEnter: () => {
              gsap.to(image, { filter: effect[i], duration: 2 });
              gsap.fromTo(text, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .2 })
            }
          })
        })
});
