//MENU
let buttonMenu = document.getElementById("menu-toggle"),
  iconOpen = document.getElementById("mega-nav-open-menu-icon"),
  iconClose = document.getElementById("mega-nav-close-menu-icon"),
  megaNav = document.getElementById("mega-nav"),
  megaMenu = document.querySelector(".mega-menu"),
  body = document.querySelector("body");

buttonMenu.addEventListener("click", () => {
  iconOpen.classList.toggle("hide");
  iconClose.classList.toggle("hide");
  megaNav.classList.toggle("voladix");
  megaMenu.classList.toggle("changee");
  body.classList.toggle("noscroll");
});

//PRICES
let inputNVIDIA = document.getElementById('inputNVIDIA'),
        inputBNB = document.getElementById('inputBNB');

inputNVIDIA.addEventListener('input', () => {
    inputBNB.value = inputNVIDIA.value * 0.01;
});