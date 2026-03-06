/* ===== CURSOR ===== */

const cursor = document.querySelector(".custom-cursor");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, .menu").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("filled");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("filled");
        });
    });
}

/* ===== MENU ===== */

function toggleMenu() {
    const menuOverlay = document.getElementById("menuOverlay");
    if (!menuOverlay) return;
    
    menuOverlay.classList.toggle("open");
    
    if (menuOverlay.classList.contains("open")) {
        document.body.classList.add("menu-open");
    } else {
        document.body.classList.remove("menu-open");
    }
}

const binaryContainer = document.getElementById("binaryBg");

if (binaryContainer) {
    function createBinaryRain() {
        const digit = document.createElement("span");
        digit.textContent = Math.random() > 0.5 ? "0" : "1";

        // Números solo dentro del lado derecho (contenedor binaryBg)
        digit.style.left = Math.random() * 100 + "%";

        digit.style.animationDuration = 3 + Math.random() * 5 + "s";
        digit.style.opacity = Math.random() * 0.6 + 0.2;

        binaryContainer.appendChild(digit);

        setTimeout(() => {
            digit.remove();
        }, 8000);
    }

    setInterval(createBinaryRain, 150);
}

window.toggleMenu = toggleMenu;

function initMenu() {
    const menuButton = document.getElementById("menuBtn") || document.querySelector(".menu");
    const menuClose = document.querySelector(".menu-close");
    const menuOverlay = document.getElementById("menuOverlay");

    if (menuButton && menuOverlay) {
        menuButton.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        }, true);
    }

    if (menuClose && menuOverlay) {
        menuClose.addEventListener("click", function (e) {
            e.preventDefault();
            toggleMenu();
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenu);
} else {
    initMenu();
}


const cards = Array.from(document.querySelectorAll(".project-card"));
const projectTitleEl = document.getElementById("projectTitle");

let activeIndex = 0;
let isAnimating = false;

function setProjectTitle(text) {
    if (!projectTitleEl) return;

    projectTitleEl.classList.add("animating");

    setTimeout(() => {
        projectTitleEl.textContent = text;
        projectTitleEl.classList.remove("animating");
    }, 250);
}

function positionCards() {
    const total = cards.length;
    if (total === 0) return;

    cards.forEach((card, index) => {
        let offset = index - activeIndex;

        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const baseY = 500;
        const y = offset * baseY;
        const x = -Math.abs(offset) * 40;

        const scale = offset === 0 ? 1 : 0.8;
        const opacity = offset === 0 ? 1 : 0.4;

        card.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        card.style.zIndex = String(100 - Math.abs(offset));
        card.style.opacity = opacity;

        card.classList.toggle("is-active", offset === 0);
    });

    const title = cards[activeIndex].dataset.title || "";
    setProjectTitle(title);
}

if (cards.length > 0) {
    positionCards();
}

window.addEventListener(
    "wheel",
    (e) => {
        if (cards.length === 0) return;
        if (isAnimating) return;

        e.preventDefault();

        if (e.deltaY > 0) {
            activeIndex = (activeIndex + 1) % cards.length;
        } else if (e.deltaY < 0) {
            activeIndex = (activeIndex - 1 + cards.length) % cards.length;
        } else {
            return;
        }

        isAnimating = true;
        positionCards();

        setTimeout(() => {
            isAnimating = false;
        }, 650);
    },
    { passive: false }
);


const clockEl = document.getElementById("projectsClock");

function updateClock() {
    if (!clockEl) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) hours = 12;

    const hoursStr = hours.toString().padStart(2, "0");

    clockEl.textContent = `UIO-${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

updateClock();
setInterval(updateClock, 1000);


const themeButtons = document.querySelectorAll(".theme-toggle-btn");

themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;

        document.body.classList.toggle("light-theme", theme === "light");

        themeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});