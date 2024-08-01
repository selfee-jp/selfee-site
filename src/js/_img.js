import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


export function img() {
    window.addEventListener('DOMContentLoaded', function () {
        gsap.config({ nullTargetWarn: false })

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
    });
}
