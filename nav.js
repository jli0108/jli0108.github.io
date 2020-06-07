const navSlide = () => {
  const navMenuButton = document.querySelector(".overlayMenuButton");
  const nav = document.querySelector(".navList");

  navMenuButton.addEventListener("click", ()=>{
    nav.classList.toggle("navActive");
  })
}

navSlide();
