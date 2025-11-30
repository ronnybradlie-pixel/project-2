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

class FlickerApp {
    constructor() {
        this.filterButtons = document.querySelectorAll(".filter-btn");
        this.movieCards = document.querySelectorAll(".card");
        this.searchInput = document.querySelector(".search input");
        this.themeToggle = document.getElementById("themeToggle");

        this.favourites = JSON.parse(localStorage.getItem("favourites")) || [];
        this.currentUser = localStorage.getItem("loggedUser") || null;

        // TMDb
        this.TMDB_KEY = "e01f595b687006edbd50744f4c6073bd";
        this.TMDB_BASE = "https://api.themoviedb.org/3";
        this.TMDB_IMG = "https://image.tmdb.org/t/p/w500";

        this.init();
    }

    init() {
        this.loadTheme();
        this.setupFilters();
        this.setupSearch();
        this.setupThemeToggle();
        this.setupFavouritesButtons();
        this.fadeInPosters();
    }

     //search
    setupSearch() {
        this.searchInput.addEventListener("input", () => {
            const query = this.searchInput.value.trim();

            if (query.length < 2) return;

            this.searchTMDB(query);
        });
    }

    async searchTMDB(query) {
        const url = `${this.TMDB_BASE}/search/movie?api_key=${e01f595b687006edbd50744f4c6073bd}&query=${encodeURIComponent(query)}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            this.displaySearchResults(data.results);

        } catch (err) {
            console.error("TMDb Search Error:", err);
        }
    }

    displaySearchResults(results) {
        const main = document.querySelector("main");
        main.innerHTML = ""; 

        if (!results.length) {
            main.innerHTML = "<h2>No results found...</h2>";
            return;
        }

        const container = document.createElement("div");
        container.classList.add("grid");

        results.forEach(movie => {

            const img = movie.poster_path
                ? this.TMDB_IMG + movie.poster_path
                : "noimage.jpg";

            const card = document.createElement("div");
            card.className = "card";
            card.dataset.category = "search";

            card.innerHTML = `
                <img class="poster fade" src="${img}">
                <h3 class="title-sm">${movie.title}</h3>
                <div class="meta-row">
                    <span class="pill">${movie.vote_average.toFixed(1)}</span>
                    <span class="muted">${movie.release_date?.slice(0, 4) || "N/A"}</span>
                </div>
                <button class="fav-btn" data-title="${movie.title}">❤</button>
            `;

            container.appendChild(card);
        });

        main.appendChild(container);
        this.setupFavouritesButtons();
        this.fadeInPosters();
    }

    setupFavouritesButtons() {
        document.querySelectorAll(".fav-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const title = btn.dataset.title ||
                    btn.parentElement.querySelector(".title-sm").textContent;

                if (!this.favourites.includes(title)) {
                    this.favourites.push(title);
                    btn.classList.add("liked");
                } else {
                    this.favourites = this.favourites.filter(t => t !== title);
                    btn.classList.remove("liked");
                }

                localStorage.setItem("favourites", JSON.stringify(this.favourites));
            });
        });
    }

    //this is for authentication
class UserAuth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("users")) || [];
        this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    }

    signup(username, email, password) {
        const existing = this.users.find(u => u.email === email);
        if (existing) return { success: false, message: "Email already registered!" };

        const newUser = { username, email, password };
        this.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(this.users));

        localStorage.setItem("currentUser", JSON.stringify(newUser));

        return { success: true };
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) return { success: false, message: "Invalid email or password" };

        localStorage.setItem("currentUser", JSON.stringify(user));

        return { success: true };
    }
}


const auth = new UserAuth();

const form = document.getElementById("authForm");  
const toggleText = document.getElementById("toggleText");
let isLogin = true;

function toggleMode() {
    isLogin = !isLogin;

    document.getElementById("usernameField").style.display = isLogin ? "none" : "block";
    document.getElementById("submitBtn").innerText = isLogin ? "Login" : "Sign Up";
    toggleText.innerHTML = isLogin
        ? `Don't have an account? <span onclick="toggleMode()" class="link">Sign Up</span>`
        : `Already have an account? <span onclick="toggleMode()" class="link">Login</span>`;
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username")?.value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let result;

    if (isLogin) {
        result = auth.login(email, password);
    } else {
        result = auth.signup(username, email, password);
    }

    if (!result.success) {
        alert(result.message);
        return;
    }

    window.location.href = "index.html";
});


    //theme
    setupThemeToggle() {
        this.themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            const mode = document.body.classList.contains("dark")
                ? "Dark Mode"
                : "Light Mode";

            this.themeToggle.textContent = mode;

            localStorage.setItem("theme", mode);
        });
    }

    loadTheme() {
        const saved = localStorage.getItem("theme");

        if (saved === "Dark Mode") {
            document.body.classList.add("dark");
            this.themeToggle.textContent = "Dark Mode";
        }
    }

    fadeInPosters() {
        document.querySelectorAll(".fade").forEach(img => {
            img.onload = () => img.classList.add("loaded");
        });
    }

    //log
    loginUser(username) {
        localStorage.setItem("loggedUser", username);
        this.currentUser = username;
    }

    logoutUser() {
        localStorage.removeItem("loggedUser");
        this.currentUser = null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new FlickerApp();
});

initHeader() {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    let nav = document.querySelector("nav ul");
    let signinLi = Array.from(nav.querySelectorAll("li")).find(li => {
      const a = li.querySelector("a");
      return a && (a.getAttribute("href") === "signin.html" || a.textContent.trim().toLowerCase().includes("sign in"));
    });

    if (loggedIn) {
      const username = localStorage.getItem("username") || "User";
      const profileLi = document.createElement("li");
      profileLi.innerHTML = `<a href="#" id="profileLink">${username}</a> <button id="logoutBtn" class="tiny-ghost">Sign Out</button>`;
      if (signinLi) signinLi.replaceWith(profileLi);
      else nav.appendChild(profileLi);

      document.getElementById("logoutBtn")?.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        window.location.href = "signin.html";
      });
    } else {
      if (!signinLi) {
        const li = document.createElement("li");
        li.innerHTML = `<a href="signin.html">Sign In</a>`;
        nav.appendChild(li);
      }
    }
  }

  renderSections(movies) {
    const groups = { action: [], drama: [], comedy: [], other: [] };
    movies.forEach(m => {
      const cat = (m.category || "other").toLowerCase();
      if (groups[cat]) groups[cat].push(m); else groups.other.push(m);
    });

    this.main.innerHTML = ""; 
    Object.keys(groups).forEach(cat => {
      if (groups[cat].length === 0) return;
      const section = document.createElement("section");
      section.className = "category";
      section.dataset.category = cat;
      section.innerHTML = `<h4>${cat[0].toUpperCase() + cat.slice(1)}</h4><div class="grid"></div>`;
      const grid = section.querySelector(".grid");
      groups[cat].forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.category = movie.category || "other";
        card.dataset.id = movie.id;
        card.innerHTML = `
          <img class="poster" src="${movie.poster || 'placeholder.png'}" alt="${escapeHtml(movie.title)}">
          <h3 class="title-sm">${escapeHtml(movie.title)}</h3>
          <div class="meta-row"><span class="pill">${movie.rating ?? ''}</span><span class="muted">${movie.year ? movie.year + ' • ' : ''}${movie.category ?? ''}</span></div>
          <button class="fav-btn" data-id="${movie.id}">${this.library.isFavourite(movie.id) ? '❤️' : '❤'}</button>
        `;
        grid.appendChild(card);
      });
      this.main.appendChild(section);
    });

    this.attachFavHandlers();
    this.fadeInPosters();
  }

  attachFavHandlers() {
    this.main.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = btn.dataset.id;
        this.library.toggleFavourite(id);
        btn.textContent = this.library.isFavourite(id) ? "❤️" : "❤";
      });
    });
  }

  fadeInPosters() {
    document.querySelectorAll(".poster").forEach(img => {
      img.style.opacity = 0;
      img.onload = () => img.style.transition = "opacity .4s ease";
      setTimeout(() => img.style.opacity = 1, 120);
    });
  }

  applyFilter(filter) {
    document.querySelectorAll("main .category").forEach(section => {
      section.style.display = (filter === "all" || section.dataset.category === filter) ? "block" : "none";
    });
  }

  wireFilterButtons() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        this.filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        this.applyFilter(filter);
      });
    });
  }

  wireSearch(library) {
    this.searchInput.addEventListener("input", async (e) => {
      const q = e.target.value.trim();
      if (!q) {
        this.renderSections(library.movies);
        return;
     }})
   }



