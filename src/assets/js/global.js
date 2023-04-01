// Header transition
const header = document.getElementById("header");
const hamburger = document.querySelector(".hamburger_nav");
const navLinkMobile = document.querySelector(".header_navbar_mobile");
const overlay = document.querySelector(".overlay");
const closeNavbarMobile = document.querySelector(".close_navbar_mobile");

function hanldeCloseNavMobile() {
  navLinkMobile.classList.remove("active");
}

function hanldeClosePopUp() {
  // navLinkMobile.classList.remove("active");
}

window.onscroll = function () {
  window.scrollY >= 10
    ? header.classList.add("header_active")
    : header.classList.remove("header_active");
};

hamburger.addEventListener("click", function () {
  navLinkMobile.classList.add("active");
  overlay.classList.add("active");
});

overlay.addEventListener("click", function () {
  hanldeCloseNavMobile();
  hanldeClosePopUp();
  overlay.classList.remove("active");
});

closeNavbarMobile.addEventListener("click", function () {
  hanldeCloseNavMobile();
  hanldeClosePopUp();
  overlay.classList.remove("active");
});
