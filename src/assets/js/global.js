// Header transition
const header = document.getElementById("header");

window.onscroll = function () {
  window.scrollY >= 10
    ? header.classList.add("header_active")
    : header.classList.remove("header_active");
};
