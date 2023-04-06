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

// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";

import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOHXo9j9MEAf8Qz_EAAsLy0D-qGe5fyeI",
  authDomain: "filmlane-61503.firebaseapp.com",
  databaseURL:
    "https://filmlane-61503-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "filmlane-61503",
  storageBucket: "filmlane-61503.appspot.com",
  messagingSenderId: "108764945647",
  appId: "1:108764945647:web:a5a598b393a87e99d80f1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth();

const providerGoogle = new GoogleAuthProvider(app);

const signUpForm = document.getElementById("form_signUp");
const signInForm = document.getElementById("form_signIn");
const logout = document.getElementById("logout");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email_signUp_input").value;
  const password = document.getElementById("password_signUp_input").value;
  const confirmPassword = document.getElementById(
    "confirm_password_signUp_input"
  ).value;

  // Validate
  if (password.length < 6) {
    alert("Min length password is 6 !");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password and confrim password not equal !");
    return;
  }

  // Move on with Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        email: email,
        password: password,
      });

      hanldeClosePopUp();
      overlay.classList.remove("active");
      alert("user created!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
      // ..
    });
});

signInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email_input").value;
  const password = document.getElementById("password_input").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      const dt = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: dt,
      });

      hanldeClosePopUp();
      overlay.classList.remove("active");
      alert("User loged in!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    localStorage.setItem("user", uid);

    logout.classList.add("active");
    btnSignin.classList.add("active");
  } else {
    localStorage.removeItem("user");

    logout.classList.remove("active");
    btnSignin.classList.remove("active");
  }
});

// With third party
const loginWithFacebook = document.getElementById("login_with_facebook");
const loginWithTwitter = document.getElementById("login_with_twitter");
const loginWithGoogle = document.getElementById("login_with_google");

loginWithFacebook.addEventListener("click", handleLoginFacebook);
loginWithTwitter.addEventListener("click", handleLoginTwitter);
loginWithGoogle.addEventListener("click", handleLoginGoogle);

function handleLoginFacebook() {
  const provider = new FacebookAuthProvider();
  provider.addScope("user_birthday");
  auth.languageCode = "it";
  provider.setCustomParameters({
    display: "popup",
  });

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      hanldeClosePopUp();
      overlay.classList.remove("active");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
}
function handleLoginTwitter() {
  const provider = new TwitterAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      hanldeClosePopUp();
      overlay.classList.remove("active");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = TwitterAuthProvider.credentialFromError(error);

      alert(errorMessage);
    });
}
function handleLoginGoogle() {
  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      hanldeClosePopUp();
      overlay.classList.remove("active");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      alert(errorMessage);
    });
}

logout.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("user loged out");
    })
    .catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});
