const body = document.body;
const menuToggle = document.getElementById("menu-toggle");
const collapsibleElements = document.querySelectorAll(".mobile-collapsible");
const LOCK_CLASS = "scroll-lock";
const SCROLL_TRANSITION_DURATION = 300;

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
const toggleMenu = (open) => {
  if (!menuToggle) return;

  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  const shouldOpen = open === true || (open === undefined && !isExpanded);
  const icon = menuToggle.querySelector("i");
  const isMobile = window.innerWidth <= 1024;

  if (shouldOpen) {
    body.classList.add(LOCK_CLASS);
    if (!isMobile) {
      const scrollbarWidth = getScrollbarWidth();
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    collapsibleElements.forEach((el) => el.classList.add("is-open"));
    menuToggle.setAttribute("aria-expanded", "true");
    if (icon) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }
  } else {
    collapsibleElements.forEach((el) => el.classList.remove("is-open"));
    menuToggle.setAttribute("aria-expanded", "false");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
    setTimeout(() => {
      if (menuToggle.getAttribute("aria-expanded") === "false") {
        body.classList.remove(LOCK_CLASS);

        if (!isMobile) {
          body.style.paddingRight = "";
        }
      }
    }, SCROLL_TRANSITION_DURATION);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  if (menuToggle) {
    const closeMenu = () => {
      toggleMenu(false);
    };
    menuToggle.addEventListener("click", () => {
      toggleMenu();
    });
    const navLinks = document.querySelectorAll(
      ".nav-list a, .menu-footer-controls a"
    );
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 1024) {
          setTimeout(closeMenu, 100);
        }
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }
});
