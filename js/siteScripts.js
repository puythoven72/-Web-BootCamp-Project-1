  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const carousel = document.querySelector(".img-active");

  hamburger.addEventListener("click", mobileMenu);


  function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");

  }
