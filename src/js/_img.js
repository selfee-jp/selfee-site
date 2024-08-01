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
});
