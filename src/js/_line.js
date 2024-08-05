import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function line() {

  // タイトルラインのアニメーション
  const lines = document.querySelectorAll(".heading__title-line");
  lines.forEach((line) => {
    gsap.fromTo(line, 
      { width: "0%" },
      { 
        width: "100%", 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: line,
          start: "top 80%", // トリガー位置の調整
          toggleActions: 'play none none reverse',
        }
      }
    );
  });
}
