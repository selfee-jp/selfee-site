import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function mv() {
  const openingTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.mv__title', // トリガーとなる要素
      start: 'top 80%', // トリガーポイント
      end: 'top 20%',
      toggleActions: 'play none none reverse', // スクロール方向に応じたアニメーションの動作
    }
  });

  openingTL
    .to('.js-mv-title', {
      duration: 1,
      delay: .5,
      y: 0,
      autoAlpha: 1,
    //   ease: "power4.inOut",
      stagger: 0.3 // 各要素を順番にアニメーション
    })
    .to('.js-mv-img', {
    //   delay: .1,
      duration: .5,
      y: 0,
      autoAlpha: 1,
    //   ease: "power4.inOut",
    }, '<');
    // .to('.mv__btn', {
    //   duration: 1,
    //   autoAlpha: 1,
    //   ease: "power4.inOut",
    // }, '<');
}
