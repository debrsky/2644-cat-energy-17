console.log('заработало!!');

var root = document.documentElement;
root.classList.remove('no-js');

var pageHeader = document.querySelector(".page-header");
var navToggle = pageHeader.querySelector(".nav-toggle");

navToggle.addEventListener("click", function (evt) {
  toggleMenu();
});

var beforeAfter = document.querySelector(".before-after");
if (beforeAfter) {
  var btnBefore = beforeAfter.querySelector(".control-panel__btn-wrapper--before .control-panel__btn");
  var btnAfter = beforeAfter.querySelector(".control-panel__btn-wrapper--after .control-panel__btn");

  btnBefore.addEventListener("click", function (evt) {
    showBefore();
  });

  btnAfter.addEventListener("click", function (evt) {
    showAfter();
  });
}


function showBefore() {
  beforeAfter.classList.remove("before-after--show-after");
  beforeAfter.classList.add("before-after--show-before");
}

function showAfter() {
  beforeAfter.classList.remove("before-after--show-before");
  beforeAfter.classList.add("before-after--show-after");
}


function toggleMenu () {
  if (pageHeader.classList.contains("page-header--mobile-nav-hidden")) {
    openMenu();
  } else {
    closeMenu();
  }
}

function openMenu () {
  pageHeader.classList.remove("page-header--mobile-nav-hidden");
  navToggle.classList.remove("nav-toggle--open");
  navToggle.classList.add("nav-toggle--close");
}

function closeMenu () {
  pageHeader.classList.add("page-header--mobile-nav-hidden");
  navToggle.classList.remove("nav-toggle--close");
  navToggle.classList.add("nav-toggle--open");
}
