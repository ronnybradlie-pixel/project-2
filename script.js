// Theme toggle
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Dark Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "Light Mode";
        localStorage.setItem("theme", "light");
    }
});

//theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Dark Mode";
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
