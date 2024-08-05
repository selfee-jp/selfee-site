import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function textScroll() {
    window.addEventListener('DOMContentLoaded', function () {
        gsap.config({ nullTargetWarn: false });

        const splitTargets = document.querySelectorAll('.js-splitText');

        // spanタグに分割する関数
        splitTargets.forEach((target) => {
            let newText = '';
            const spanText = target.textContent; // ターゲットの中身を取得
            spanText.split('').forEach((char, index) => {
                if (index === 0 && target.classList.contains('js-text-effect--head')) {
                    newText += `<span class="char heading__en-big">${char}</span>`; // 最初の文字にクラスを追加
                } else if (index === 5 && target.classList.contains('js-text-effect--about')) {
                    newText += `<span class="char heading__en-space">${char}</span>`; // 6つ目の文字にクラスを追加
                } else {
                    newText += `<span class="char">${char}</span>`;
                }
            });
            target.innerHTML = newText; // ターゲットに生成した要素を挿入
        });

        const textEffects = document.querySelectorAll('.js-text-effect'); // ターゲットとなる要素を全取得
        textEffects.forEach((target) => {
            const spans = target.querySelectorAll('.char');
            gsap.to(spans, {
                duration: 0.5,
                autoAlpha: 1,
                rotateY: '0deg', // 回転させる時
                // translateY: 0, // 下から出現させる時（コメントアウトされているので削除）
                stagger: {
                    each: 0.1
                },
                scrollTrigger: {
                    trigger: target,
                    start: "top 80%",
                    toggleActions: 'play none none reverse',
                }
            });
        });
    });
}
