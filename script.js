// filter
const filterButtons =document.querySelectorAll(".filter-btn")
const movieCards =document.querySelectorAll(".card")

filterButtons.forEach(button =>{
 btn.addEventListener("click", () => {
 document.querySelector(".filter-btn.active")?.classList.remove("active");
 button.classList.add("active");

   const filter = btn.dataset.filter;

    categories.forEach(cat => {
     if (filter === "all") {
       cat.style.display = "block";
       } else {
      cat.style.display = 
      cat.querySelector(".card")?.dataset.category === filter 
       ? "block" 
       : "none";
           }
        });
    });
});

//

