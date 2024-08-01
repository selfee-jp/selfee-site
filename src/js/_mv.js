import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function mv() {
  const openingTL = gsap.timeline();

  openingTL
    .to('.js-mv-title', {
      duration: 1,
      delay: .5,
      y: 0,
      autoAlpha: 1,
      stagger: 0.3 // 各要素を順番にアニメーション
    })
    .to('.js-mv-img', {
    //   delay: .1,
      duration: .5,
      y: 0,
      autoAlpha: 1,
    }, '<');
}
