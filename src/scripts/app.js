const userName1 = 'Diana';
const userName2 = 'Marianna';

/* burger-menu */

const burgerBtn = document.querySelector(".burger-menu");
const listHidden = document.querySelector(".header__list--hiden")

document.addEventListener("click", function(e) {
    if (!listHidden.contains(e.target) && !burgerBtn.contains(e.target)) {
      burgerBtn.classList.remove("open");
      listHidden.style.display = "none";
    }
  });
  
  burgerBtn.addEventListener("click", togleClassActive);
  
  function togleClassActive(){
      burgerBtn.classList.toggle("open");
      if(burgerBtn.classList.contains("open")){
          listHidden.style.display ="block";
      }
      else{
          listHidden.style.display ="none";
      }
  }