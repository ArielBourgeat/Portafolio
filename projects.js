/* ===== CURSOR ===== */

const cursor = document.querySelector(".custom-cursor");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest("a, button, .menu")) cursor.classList.add("filled");
    });

    document.addEventListener("mouseout", (e) => {
        const hovered = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest("a, button, .menu");
        if (e.target.closest("a, button, .menu") && !hovered) cursor.classList.remove("filled");
    });
}

/* ===== MENU ===== */

function toggleMenu() {
    const menuOverlay = document.getElementById("menuOverlay");
    if (!menuOverlay) return;
    menuOverlay.classList.toggle("open");
    document.body.classList.toggle("menu-open", menuOverlay.classList.contains("open"));
}

const binaryContainer = document.getElementById("binaryBg");

if (binaryContainer) {
    function createBinaryRain() {
        const digit = document.createElement("span");
        digit.textContent = Math.random() > 0.5 ? "0" : "1";
        digit.style.left = Math.random() * 100 + "%";
        digit.style.animationDuration = 3 + Math.random() * 5 + "s";
        digit.style.opacity = Math.random() * 0.6 + 0.2;
        binaryContainer.appendChild(digit);
        setTimeout(() => digit.remove(), 8000);
    }
    setInterval(createBinaryRain, 150);
}

window.toggleMenu = toggleMenu;

function initMenu() {
    const menuButton = document.getElementById("menuBtn") || document.querySelector(".menu");
    const menuOverlay = document.getElementById("menuOverlay");
    if (!menuButton || !menuOverlay) return;
    menuButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    }, true);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenu);
} else {
    initMenu();
}

/* ===== CLOCK ===== */

const clockEl = document.getElementById("projectsClock");

function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const suffix = hours >= 12 ? "P" : "A";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    clockEl.textContent = `UIO-${hours.toString().padStart(2, "0")}:${minutes}:${seconds} ${suffix}`;
}

updateClock();
setInterval(updateClock, 1000);

/* Current work fills the new categories until the final case studies are ready. */

const CATEGORIES = [
    { id: "case", label: "Case Studies" },
    { id: "visual", label: "Visual Design" },
    { id: "delivered", label: "Delivered Products" }
];

const PROJECTS = [
    {
        id: "app",
        category: "case",
        name: "FITNESS APP",
        year: "2024",
        slot: 1,
        cover: "Images/AppFit1.jpeg",
        images: ["Images/AppFit1.jpeg", "Images/AppFit2.jpeg", "Images/AppFit3.jpeg"],
        copy: [
            "This concept explores a mobile experience that combines workout tracking with habit and task management, keeping everything in a single, minimal interface.",
            "The focus was on clear hierarchy, legible typography and a calm palette that supports daily use without feeling noisy or overwhelming.",
            "Several screen states and flows were designed to visualize onboarding, daily check-ins, and long-term progress tracking."
        ]
    },
    {
        id: "foto",
        category: "case",
        name: "PHOTOGRAPHY",
        year: "2025",
        slot: 0,
        cover: "Images/foto2.png",
        images: ["Images/foto2.png", "Images/Foto1.png", "Images/foto3.png", "Images/foto4.png", "Images/foto5.png", "Images/foto6.png"],
        copy: [
            "Photography has become my way of pausing the fleeting moments of life, observing what often goes unnoticed, and translating experiences into visual stories.",
            "For me, photography is not only about aesthetics but also about awareness. It invites a slower way of looking at the world.",
            "Each photograph is a step in refining a visual language and noticing the quiet details hidden in the ordinary."
        ]
    },
    {
        id: "fitme",
        category: "visual",
        name: "FITME MAGAZINE",
        year: "2025",
        slot: 1,
        cover: "Images/FitMeMagazine.png",
        images: ["Images/FitMeMagazine.png", "Images/Fitme2.jpeg", "Images/fitme3.jpeg", "Images/fitme4.jpeg"],
        copy: [
            "FitMe is an editorial exercise that combines bold type, clean grids and lifestyle imagery to create a contemporary magazine cover for a fitness audience.",
            "The design explores hierarchy between title, supporting headlines and photography, making sure the main figure remains the clear focal point of the layout.",
            "I experimented with different color palettes and typographic weights to keep the cover energetic while still feeling minimal and easy to scan on a shelf."
        ]
    },
    {
        id: "cave",
        category: "visual",
        name: "STYLIZED CAVE",
        year: "2024",
        slot: 0,
        cover: "Images/cave2.jpg",
        images: ["Images/cave2.jpg", "Images/cave3.jpg", "Images/cave4.jpg", "Images/cave5.jpg", "Images/cave6.jpg"],
        copy: [
            "This project is a stylized 3D environment created in a low-poly aesthetic. The focus was to blend warm lighting, playful color palettes, and simple geometry into a cozy cave and town.",
            "I explored lighting setups, composition options, and camera angles to highlight depth and storytelling.",
            "The scene was modeled with modular pieces that could be reused across different shots."
        ]
    },
    {
        id: "horror",
        category: "visual",
        name: "HORROR POSTER",
        year: "2025",
        slot: 3,
        cover: "Images/Poster-Pelicula-de-terror.png",
        images: ["Images/Poster-Pelicula-de-terror.png", "Images/Horror 1.png"],
        copy: [
            "This key art explores a grounded horror mood using strong contrast, tight framing and minimal color.",
            "Typography and composition lead the eye from the title to the focal character, while grain adds a tactile layer.",
            "Several crops, lighting variations and text placements were tested for a poster that works in print and on screen."
        ]
    },
    {
        id: "tbhc",
        category: "visual",
        name: "TBHC",
        year: "2024",
        slot: 2,
        cover: "Images/ariel-bourgeat-tbhc.jpg",
        images: ["Images/ariel-bourgeat-tbhc.jpg"],
        copy: [
            "This illustration mixes graphic shapes, bold lighting and a limited palette to capture the energy of a music-inspired piece.",
            "The focus was on expressive posing and rhythm, using repeating lines to guide the viewer across the artwork.",
            "Several crops and color passes were explored to balance legibility with a strong silhouette."
        ]
    },
    {
        id: "fif",
        category: "delivered",
        name: "FIF WEB",
        year: "2026",
        slot: 0,
        cover: "Images/FundacionFIF.png",
        images: ["Images/FundacionFIF.png"],
        copy: [
            "Worked on developing an educational platform designed to make learning more accessible and engaging for children and teenagers.",
            "The interface keeps the lessons clear, with a structure that can grow as more of the program is added."
        ]
    },
    {
        id: "render",
        category: "delivered",
        name: "RENDER",
        year: "2023",
        slot: 2,
        cover: "Images/ariel-bourgeat-alines-building-1.jpg",
        images: ["Images/ariel-bourgeat-alines-building-1.jpg"],
        copy: [
            "This piece focuses on an isometric building lit at night, combining playful sci-fi details with a clean, graphic presentation.",
            "The illustration explores color blocking, emissive lighting and small story cues hidden in the props.",
            "Multiple angles and crops were tested to find the most readable silhouette."
        ]
    }
];

const collage = document.getElementById("collage");
const categoryNav = document.getElementById("categoryNav");
const projectMark = document.getElementById("projectMark");
const detailView = document.getElementById("detailView");
const detailCopy = document.getElementById("detailCopy");
const detailScroll = document.getElementById("detailScroll");
const detailCat = document.getElementById("detailCat");
const detailMap = document.getElementById("detailMap");
const detailMapScale = document.getElementById("detailMapScale");
const detailMapFrame = document.getElementById("detailMapFrame");

const state = {
    category: "visual",
    project: null
};

function projectById(id) {
    return PROJECTS.find((project) => project.id === id) || null;
}

function categoryLabel(id) {
    const category = CATEGORIES.find((item) => item.id === id);
    return category ? category.label : "";
}

function setMark(project) {
    if (!projectMark || !project) return;
    projectMark.innerHTML = `• ${project.name}<span>${project.year}.</span>`;
}

function renderCategories() {
    if (!categoryNav) return;
    categoryNav.innerHTML = CATEGORIES.map((category) => {
        return `<p class="cat-label" data-cat="${category.id}">${category.label}</p>`;
    }).join("");
}

function updateCategoryIndicator(project) {
    if (!categoryNav) return;
    categoryNav.querySelectorAll(".cat-label").forEach((label) => {
        label.classList.toggle("is-current", !!(project && label.dataset.cat === project.category));
    });
}

const SEQUENCE_IDS = ["cave", "fitme", "render", "horror", "tbhc", "app", "foto", "fif"];
const sequence = SEQUENCE_IDS.map(projectById).filter(Boolean);
const homeIndex = Math.max(0, sequence.findIndex((project) => project.id === "fitme"));
const tiles = [];
const trail = sequence.map(() => ({ x: window.innerWidth * 0.62, y: window.innerHeight * 0.46 }));
const pointer = { x: window.innerWidth * 0.62, y: window.innerHeight * 0.46 };

let settle = 0;
let settleTarget = 0;
let carousel = homeIndex;
let carouselTarget = homeIndex;
let pendingDy = 0;
let dripRaf = 0;
let archiveLoop = false;
let shownId = "";

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function placement(offset) {
    const span = (offset + 1) / 2;
    const x = -2 + span * 72;
    const y = 0 + span * 58;
    const dist = Math.min(1, Math.abs(offset));
    const w = 46 - dist * 10;
    const h = 64 - dist * 26;
    const fade = Math.abs(offset) > 1.35 ? Math.max(0, 1 - (Math.abs(offset) - 1.35) / 0.4) : 1;
    return { x, y, w, h, opacity: fade };
}

function buildTiles() {
    if (!collage) return;
    collage.innerHTML = "";
    tiles.length = 0;
    sequence.forEach((project) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tile";
        button.innerHTML = `<img src="${project.cover}" alt="${project.name}">`;
        button.addEventListener("click", () => {
            const index = sequence.indexOf(project);
            if (settle < 0.9) return;
            if (Math.abs(index - carousel) > 0.7) {
                carouselTarget = index;
                return;
            }
            openProject(project, button);
        });
        collage.appendChild(button);
        tiles.push(button);
    });
}

function renderArchiveFrame() {
    const light = document.body.classList.contains("light-theme");
    let lead = { x: pointer.x, y: pointer.y };

    sequence.forEach((project, index) => {
        const point = trail[index];
        point.x += (lead.x - point.x) * 0.2;
        point.y += (lead.y - point.y) * 0.2;
        lead = point;

        const slot = placement(index - carousel);
        const slotW = (slot.w / 100) * window.innerWidth;
        const slotH = (slot.h / 100) * window.innerHeight;
        const slotX = (slot.x / 100) * window.innerWidth + slotW / 2;
        const slotY = (slot.y / 100) * window.innerHeight + slotH / 2;
        const trailW = Math.min(260, window.innerWidth * 0.2);
        const trailH = trailW * 1.18;
        const mix = settle;
        const w = trailW + (slotW - trailW) * mix;
        const h = trailH + (slotH - trailH) * mix;
        const x = point.x + (slotX - point.x) * mix;
        const y = point.y + (slotY - point.y) * mix;
        const rot = (1 - mix) * ((index % 2 === 0 ? -1 : 1) * (5 + index));
        let opacity = (1 - mix) * (index < 5 ? 1 : 0.35) + mix * slot.opacity;
        if (light) opacity *= 0.62;

        const el = tiles[index];
        el.style.left = (x - w / 2) + "px";
        el.style.top = (y - h / 2) + "px";
        el.style.width = w + "px";
        el.style.height = h + "px";
        el.style.opacity = String(opacity);
        el.style.transform = `rotate(${rot}deg)`;
        el.style.zIndex = mix < 0.45 ? String(30 - index) : String(80 - Math.round(Math.abs(index - carousel) * 6));
        el.style.pointerEvents = mix > 0.88 && slot.opacity > 0.45 ? "auto" : "none";
    });

    const intro = document.getElementById("archiveIntro");
    if (intro) intro.style.opacity = String(Math.max(0, 1 - settle / 0.7));
    if (projectMark && !state.project) projectMark.style.opacity = String(Math.max(0, (settle - 0.5) / 0.5));

    const active = sequence[Math.round(carousel)] || sequence[0];
    if (settle > 0.62 && active && active.id !== shownId) {
        shownId = active.id;
        setMark(active);
        updateCategoryIndicator(active);
    } else if (settle <= 0.62 && shownId) {
        shownId = "";
        updateCategoryIndicator(null);
    }

    settle += (settleTarget - settle) * 0.18;
    carousel += (carouselTarget - carousel) * 0.18;
}

function startArchiveLoop() {
    if (archiveLoop || state.project) return;
    archiveLoop = true;
    const tick = () => {
        renderArchiveFrame();
        if (state.project) {
            archiveLoop = false;
            return;
        }
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

function applyArchiveDelta(dy) {
    if (dy > 0) {
        if (settleTarget < 1) settleTarget = clamp(settleTarget + dy / 480, 0, 1);
        else carouselTarget = clamp(carouselTarget + dy / 520, 0, sequence.length - 1);
        return;
    }

    if (carouselTarget > 0.001 || carousel > 0.08) {
        carouselTarget = clamp(carouselTarget + dy / 520, 0, sequence.length - 1);
        return;
    }

    settleTarget = clamp(settleTarget + dy / 480, 0, 1);
}

function startArchiveDrip() {
    if (dripRaf) return;
    const loop = () => {
        if (state.project || Math.abs(pendingDy) < 0.6) {
            pendingDy = 0;
            dripRaf = 0;
            return;
        }
        const release = Math.max(-22, Math.min(22, pendingDy * 0.18));
        pendingDy -= release;
        applyArchiveDelta(release);
        dripRaf = requestAnimationFrame(loop);
    };
    dripRaf = requestAnimationFrame(loop);
}

window.addEventListener("mousemove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
});

window.addEventListener("wheel", (event) => {
    if (state.project || document.body.classList.contains("menu-open") || event.ctrlKey) return;
    event.preventDefault();
    let dy = event.deltaY;
    if (event.deltaMode === 1) dy *= 16;
    else if (event.deltaMode === 2) dy *= window.innerHeight;
    dy = clamp(dy, -140, 140);
    if (Math.abs(dy) < 42) applyArchiveDelta(dy);
    else {
        pendingDy += dy;
        startArchiveDrip();
    }
}, { passive: false });

function fillImages(container, images, alt) {
    container.innerHTML = "";
    images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        container.appendChild(img);
    });
}

function fitMap() {
    if (!detailMap || !detailMapScale) return;
    detailMapScale.style.transform = "none";
    detailMapScale.style.width = "100%";
    const natural = detailMapScale.scrollHeight;
    if (!natural) return;
    const scale = detailMap.clientHeight / natural;
    detailMapScale.style.width = (detailMap.clientWidth / scale) + "px";
    detailMapScale.style.transform = `scale(${scale})`;
    syncFrame();
}

function syncFrame() {
    if (!detailScroll || !detailMap || !detailMapFrame) return;
    const view = detailScroll.clientHeight;
    const total = detailScroll.scrollHeight;
    const mapH = detailMap.clientHeight;
    if (!view || !total || !mapH) return;
    const frameH = Math.max(28, (view / total) * mapH);
    const travel = Math.max(0, mapH - frameH);
    const maxScroll = Math.max(1, total - view);
    const progress = detailScroll.scrollTop / maxScroll;
    detailMapFrame.style.height = frameH + "px";
    detailMapFrame.style.transform = `translateY(${progress * travel}px)`;
}

function showDetail(project) {
    state.project = project;
    state.category = project.category;
    updateCategoryIndicator(project);
    setMark(project);
    if (projectMark) projectMark.style.opacity = "1";
    detailCat.textContent = categoryLabel(project.category);
    detailCopy.innerHTML = project.copy.map((paragraph) => `<p>${paragraph}</p>`).join("")
        + `<a class="detail-back" href="projects.html">← PROJECT ARCHIVE</a>`;
    detailCopy.querySelector(".detail-back").addEventListener("click", (event) => {
        event.preventDefault();
        closeProject();
    });
    fillImages(detailScroll, project.images, project.name);
    fillImages(detailMapScale, project.images, "");
    detailScroll.scrollTop = 0;
    document.body.classList.add("is-detail");
    detailView.hidden = false;
    window.setTimeout(fitMap, 40);
    detailScroll.querySelectorAll("img").forEach((img) => {
        if (!img.complete) img.addEventListener("load", fitMap, { once: true });
    });
}

function openProject(project, source) {
    const fromImg = source.querySelector("img");
    const from = fromImg.getBoundingClientRect();
    showDetail(project);
    history.pushState({ project: project.id }, "", "#" + project.id);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const first = detailScroll.querySelector("img");

    const land = () => {
        const stage = document.querySelector(".detail-stage").getBoundingClientRect();
        const shown = first.getBoundingClientRect();
        const dest = {
            left: stage.left,
            top: stage.top,
            width: stage.width,
            height: Math.min(stage.height, Math.max(shown.height, 1))
        };

        if (reduce) {
            document.body.classList.add("is-settled");
            return;
        }

        const flyer = document.createElement("img");
        flyer.className = "flyer";
        flyer.src = project.cover;
        flyer.alt = "";
        flyer.style.left = from.left + "px";
        flyer.style.top = from.top + "px";
        flyer.style.width = from.width + "px";
        flyer.style.height = from.height + "px";
        document.body.appendChild(flyer);
        first.style.visibility = "hidden";

        requestAnimationFrame(() => {
            flyer.style.transition = "left 0.72s cubic-bezier(.77,0,.18,1), top 0.72s cubic-bezier(.77,0,.18,1), width 0.72s cubic-bezier(.77,0,.18,1), height 0.72s cubic-bezier(.77,0,.18,1)";
            flyer.style.left = dest.left + "px";
            flyer.style.top = dest.top + "px";
            flyer.style.width = dest.width + "px";
            flyer.style.height = dest.height + "px";
            document.body.classList.add("is-settled");
        });

        source.style.visibility = "hidden";
        const finish = () => {
            if (!flyer.isConnected) return;
            first.style.visibility = "";
            flyer.remove();
        };
        flyer.addEventListener("transitionend", finish, { once: true });
        window.setTimeout(finish, 900);
    };

    if (first && first.complete && first.naturalWidth) land();
    else if (first) first.addEventListener("load", land, { once: true });
    else land();
}

function clearDetail() {
    state.project = null;
    document.body.classList.remove("is-detail", "is-settled");
    detailView.hidden = true;
    detailScroll.innerHTML = "";
    detailMapScale.innerHTML = "";
    document.querySelectorAll(".flyer").forEach((flyer) => flyer.remove());
    tiles.forEach((tile) => {
        tile.style.visibility = "";
    });
    startArchiveLoop();
}

function closeProject() {
    clearDetail();
    if (location.hash) history.pushState({}, "", "projects.html");
}

if (detailScroll) {
    detailScroll.addEventListener("scroll", syncFrame, { passive: true });
}

if (detailView) {
    detailView.addEventListener("wheel", (event) => {
        if (!state.project || !detailScroll) return;
        detailScroll.scrollTop += event.deltaY;
        event.preventDefault();
    }, { passive: false });
}

if (detailMap) {
    detailMap.addEventListener("click", (event) => {
        if (!detailScroll) return;
        const rect = detailMap.getBoundingClientRect();
        const ratio = (event.clientY - rect.top) / rect.height;
        const maxScroll = detailScroll.scrollHeight - detailScroll.clientHeight;
        detailScroll.scrollTop = ratio * maxScroll;
    });
}

window.addEventListener("resize", () => {
    if (state.project) fitMap();
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.project) closeProject();
});

window.addEventListener("popstate", () => {
    const id = location.hash.replace("#", "");
    const project = projectById(id);
    if (project) {
        showDetail(project);
        document.body.classList.add("is-settled");
    } else if (state.project) {
        clearDetail();
    }
});

const themeButtons = document.querySelectorAll(".theme-toggle-btn");

function applyTheme(theme) {
    document.body.classList.toggle("light-theme", theme === "light");
    themeButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.theme === theme);
    });
    try { sessionStorage.setItem("projects-theme", theme); } catch (err) { /* ignore */ }
}

themeButtons.forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.theme));
});

try {
    const saved = sessionStorage.getItem("projects-theme");
    if (saved === "light" || saved === "dark") applyTheme(saved);
} catch (err) { /* ignore */ }

renderCategories();
buildTiles();

const initial = projectById(location.hash.replace("#", ""));
if (initial) {
    const index = sequence.findIndex((project) => project.id === initial.id);
    if (index >= 0) {
        carousel = index;
        carouselTarget = index;
    }
    settle = 1;
    settleTarget = 1;
    showDetail(initial);
    document.body.classList.add("is-settled");
} else {
    startArchiveLoop();
}
