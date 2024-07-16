import { Splide } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

export function slide() {
  if (document.querySelector(".js-slide")) {
    new Splide(".js-slide", {
      type: "loop",
      perPage: 3,
      perMove: 1,
      autoplay: true,
      interval: 3000,
      pauseOnHover: false,
      focus: 0,
    }).mount();
  }
  if (document.querySelector(".js-slide-auto")) {
    new Splide(".js-slide-auto", {
      perPage: 3,
      type: "loop",
      focus: 0,
      autoScroll: {
        speed: 2,
      },
    }).mount({ AutoScroll });
  }
}
