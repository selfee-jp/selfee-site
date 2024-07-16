import { micromodal } from "micromodal";

export function drawer() {
  MicroModal.init();

  const buttons = document.querySelectorAll(".js-drawerButton");
  const header = document.getElementById("js-header");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // buttonの兄弟要素のIDを取得
      const modal = button.nextElementSibling.id;
      if (button.ariaExpanded == "false") {
        button.ariaExpanded = true;
        MicroModal.show(modal, {
          disableScroll: true, // ページスクロールを無効に
          awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
        });
        header.classList.add("is-open");
      } else {
        button.ariaExpanded = false;
        MicroModal.close(modal, {
          awaitCloseAnimation: true,
        });
        header.classList.remove("is-open");
      }
    });
  });
}
