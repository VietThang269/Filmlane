// Header transition
const header = document.getElementById("header");
const hamburger = document.querySelector(".hamburger_nav");
const navLinkMobile = document.querySelector(".header_navbar_mobile");
const overlay = document.querySelector(".overlay");
const closeNavbarMobile = document.querySelector(".close_navbar_mobile");
const btnSignin = document.querySelector(".btn_signIn");
const signIn = document.getElementById("sign_in");
const signUp = document.getElementById("sign_up");

const navSignUp = document.querySelector(".nav_sign_up");
const navSignIn = document.querySelector(".nav_sign_in");

function hanldeCloseNavMobile() {
  navLinkMobile.classList.remove("active");
}

function hanldeClosePopUp() {
  // navLinkMobile.classList.remove("active");
  signIn.classList.contains("active") && signIn.classList.remove("active");
  signUp.classList.contains("active") && signUp.classList.remove("active");
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

btnSignin.addEventListener("click", function () {
  signIn.classList.add("active");
  overlay.classList.add("active");
});

navSignUp.addEventListener("click", function () {
  signIn.classList.remove("active");
  signUp.classList.add("active");
});

navSignIn.addEventListener("click", function () {
  signIn.classList.add("active");
  signUp.classList.remove("active");
});
