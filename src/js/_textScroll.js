import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export function textScroll() {
    window.addEventListener('DOMContentLoaded', function () {
        gsap.config({ nullTargetWarn: false });

        let splitTarget = document.querySelectorAll('.js-splitText');

        // spanタグに分割する関数
        splitTarget.forEach((target) => {
            let newText = '';
            let spanText = target.textContent; // ターゲットの中身を取得
            spanText.split('').forEach((char, index) => {
                if (index === 0 && target.classList.contains('js-text-effect--head')) {
                    newText += '<span class="char heading__en-big">' + char + '</span>'; // 最初の文字にクラスを追加
                } else if (index === 5 && target.classList.contains('js-text-effect--about')) {
                    newText += '<span class="char heading__en-space">' + char + '</span>'; // 6つ目の文字にクラスを追加
                } else {
                    newText += '<span class="char">' + char + '</span>';
                }
            });
            target.innerHTML = newText; // ターゲットに生成した要素を挿入
        });

        let textEffect = document.querySelectorAll('.js-text-effect'); // ターゲットとなる要素を全取得
        textEffect.forEach((target) => {
            let spans = target.querySelectorAll('.char');
            gsap.to(spans, {
                duration: 0.5, autoAlpha: 1, rotateY: '0deg', // 回転させる時
                // duration: 1, autoAlpha: 1, translateY: 0, // 下から出現させる時
                stagger: {
                    each: 0.1
                },
                scrollTrigger: {
                    trigger: target,
                    // start: 'bottom bottom',
                    start: "top 80%",
                    // markers: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    });
}
