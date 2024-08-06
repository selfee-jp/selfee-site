import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function animation() {
  // フッター TOPスクロールボタン
  const scrollTopButton = document.getElementById("js-scrollTop");
  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: 0,
          autoKill: false,
        },
      });
    });
  }

  // フェードインアニメーション
  const fadeInElements = document.querySelectorAll(".js-fade-in");
  fadeInElements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element, // トリガーとなる要素を指定
          start: "top 90%", // スクロール開始位置を指定
          // markers: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  const fadeInLeftElements = document.querySelectorAll(".js-fade-in-left");
  fadeInLeftElements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element, // トリガーとなる要素を指定
          start: "top 80%", // スクロール開始位置を指定
          // markers: true,
        },
      }
    );
  });

  const fadeInRightElements = document.querySelectorAll(".js-fade-in-right");
  fadeInRightElements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element, // トリガーとなる要素を指定
          start: "top 70%", // スクロール開始位置を指定
          // markers: true,
        },
      }
    );
  });

  // matchMedia
  const mm = gsap.matchMedia();

  // 761px以上の時 PC
  mm.add("(min-width:761px)", () => {
    const cardWrappers = document.querySelectorAll(".js-card-wrapper");
    cardWrappers.forEach((wrapper) => {
      const cards = wrapper.querySelectorAll(".js-card");
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 10 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: wrapper,
            start: "top 75%",
            toggleActions: "play none none reverse",
            // markers: true,
          },
        }
      );
    });
  });

  // 760px以下の時 sp
  mm.add("(max-width:760px)", () => {
    const cards = document.querySelectorAll(".js-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 10 },
        {
          y: 0,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            // markers: true,
          },
        }
      );
    });
  });


}
