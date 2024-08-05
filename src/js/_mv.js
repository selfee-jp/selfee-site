import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function mv() {
  // タイムラインの初期化
  const openingTL = gsap.timeline();

  // タイトルアニメーション
  openingTL
    .to('.js-mv-title', {
      duration: 1,
      delay: 0.5,
      y: 0,
      autoAlpha: 1,
      stagger: 0.3 // 各要素を順番にアニメーション
    })
    .to('.js-mv-img', {
      duration: 0.5,
      y: 0,
      autoAlpha: 1,
    }, '<'); // 前のアニメーションと同時に開始
}
