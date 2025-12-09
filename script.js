class MovieApp {
  constructor() {
    this.movies = Array.from(document.querySelectorAll('.card[data-category]'));
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.searchInput = document.querySelector('.search input');
    this.themeBtn = document.getElementById('themeToggle');
    this.signInLink = document.getElementById('signInLink');
    this.logoutBtn = document.getElementById('logoutBtn');

    this.init();
  }

  init() {
    this.loadLoginStatus();
    this.setupLogout();
    this.setupTheme();
    this.setupFilters();
    this.setupSearch();      
    this.setupFavorites(); 
  }

setupSearch() {
    if (!this.searchInput) return;

    this.searchInput.addEventListener('keyup', () => {
      const query = this.searchInput.value.toLowerCase();

      this.movies.forEach(movie => {
        const title = movie.querySelector('.title-sm').textContent.toLowerCase();
        movie.style.display = title.includes(query) ? 'block' : 'none';
      });
    });
  }

//theme
 setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    this.updateThemeButton(savedTheme);

    if (!this.themeBtn) return;

    this.themeBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';

      document.body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      this.updateThemeButton(next);
    });
  }

  updateThemeButton(theme) {
    if (this.themeBtn) {
      this.themeBtn.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
  }

}

// Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const categories = document.querySelectorAll(".category");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active")?.classList.remove("active");
        btn.classList.add("active");

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

// Search
const searchInput = document.querySelector(".search input");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(value) ? "block" : "none";
    });
});

// Favorites
const favButtons = document.querySelectorAll(".fav-btn");

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

function updateFavButtons() {
    favButtons.forEach(btn => {
        let title = btn.parentElement.querySelector("h3").textContent;

        if (favourites.includes(title)) {
            btn.classList.add("active");
            btn.textContent = "❤️";
        } else {
            btn.classList.remove("active");
            btn.textContent = "❤";
        }
    });
}

favButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let title = btn.parentElement.querySelector("h3").textContent;

        if (!favourites.includes(title)) {
            favourites.push(title);
        } else {
            favourites = favourites.filter(item => item !== title);
        }

        localStorage.setItem("favourites", JSON.stringify(favourites));
        updateFavButtons();
    });
});

updateFavButtons();

// Fade effect
window.addEventListener("load", () => {
    document.querySelectorAll(".poster").forEach(img => {
        img.classList.add("show"); 
    });
});

const username = document.querySelector(".username");

username.addEventListener("click", () => {
    const name = prompt("Enter your name:");
    if (name && name.trim() !== "") {
        username.textContent = name;
        localStorage.setItem("username", name);
    }
});

if (localStorage.getItem("username")) {
    username.textContent = localStorage.getItem("username");
}

username.addEventListener("click", () => {
    const newName = prompt("Enter your username:");
    if (newName && newName.trim() !== "") {
        username.textContent = newName;
        localStorage.setItem("username", newName);
    }
});

//log out
const signInLink = document.getElementById("signInLink");
const logoutBtn = document.getElementById("logoutBtn");
if (localStorage.getItem("loggedIn") === "true") {
    signInLink.style.display = "none"; 
    logoutBtn.style.display = "inline-block"; 
} else {
    signInLink.style.display = "inline-block"; 
    logoutBtn.style.display = "none"; 
}

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    alert("You have logged out!");
    window.location.href = "login.html";
});

//oop
document.addEventListener('DOMContentLoaded', () => {
  new MovieApp();
});

//fetch api
function Movie(){

    const [movieList,setMovieList] = useState([])

    const getMovie =()=>{
        fetch("https://api.themoviedb.org/3/discover/movie")
        .then(res => res.json())
        .then(json =>console.log(json.results))
    }

    useEffect(()=>{
    getMovie()
    })

    console.log(movieList)
}

 function addToFavourites(movie) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (!favourites.find(fav => fav.id === movie.id)) {
    favourites.push(movie);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    alert("Added to favourites!");
  }
}

//favourites
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) {
  alert("Please login to view favourites!");
  window.location.href = "login.html";
}

const favContainer = document.getElementById("favMovies");
let Favourites = JSON.parse(localStorage.getItem("favourites")) || [];

if (Favourites.length === 0) {
  favContainer.innerHTML = "<h3>No favourite movies yet </h3>";
} else {
  displayFavourites();
}

function displayFavourites() {
  favContainer.innerHTML = "";

  Favourites.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h4>${movie.title}</h4>
      <p> ${movie.rating}</p>
      <button onclick="removeFavourite(${movie.id})">Remove</button>
    `;

    favContainer.appendChild(card);
  });
}

// Remove Favourite Movie
function removeFavourite(id) {
  favourites = favourites.filter(movie => movie.id !== id);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  displayFavourites();
}

//  Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  alert("Logged out!");
  window.location.href = "login.html";
});
