function toggleMenu() {
    const menuOverlay = document.getElementById("menuOverlay");
    if (!menuOverlay) return;
    
    menuOverlay.classList.toggle("open");
    
    // Agregar/quitar clase al body para cambiar el cursor
    if (menuOverlay.classList.contains("open")) {
        document.body.classList.add("menu-open");
    } else {
        document.body.classList.remove("menu-open");
    }
}

const fonts = [
  "'Playfair Display', serif",
  "'Space Grotesk', sans-serif",
  "'Oswald', sans-serif",
  "'Montserrat', sans-serif",
  "'Bebas Neue', sans-serif"
];

let currentFont = 0;
let nameCycleStarted = false;

function startNameCycle() {
    const nameElement = document.querySelector(".name");
    if (!nameElement || nameCycleStarted) return;
    nameCycleStarted = true;

    setInterval(() => {
        nameElement.style.opacity = "0";

        setTimeout(() => {
            currentFont = (currentFont + 1) % fonts.length;
            nameElement.style.fontFamily = fonts[currentFont];
            nameElement.style.opacity = "1";
        }, 200);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    // Cursor personalizado
    const cursor = document.querySelector(".custom-cursor");
    if (cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        function updateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            cursor.style.left = cursorX + "px";
            cursor.style.top = cursorY + "px";
            requestAnimationFrame(updateCursor);
        }

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Detectar elementos interactivos
        const interactiveElements = document.querySelectorAll("a, button, .menu, .scroll-down-btn, .view-work-btn, .get-in-touch, .pill, .work-item, .menu-links a, .menu-close");
        
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                cursor.classList.add("filled");
            });
            el.addEventListener("mouseleave", () => {
                cursor.classList.remove("filled");
            });
        });

        updateCursor();
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

    // Ojos que siguen al mouse en la sección de contacto
    const character = document.querySelector(".contact-character");
    const eyes = character ? character.querySelectorAll(".contact-eye") : null;

    if (character && eyes && eyes.length) {
        const maxOffset = 6;

        function handleMouseMove(event) {
            const rect = character.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = event.clientX - cx;
            const dy = event.clientY - cy;
            const dist = Math.hypot(dx, dy) || 1;
            const ratio = maxOffset / dist;

            const tx = dx * ratio;
            const ty = dy * ratio;

            eyes.forEach((eye) => {
                eye.style.setProperty("--eye-translate-x", `${tx}px`);
                eye.style.setProperty("--eye-translate-y", `${ty}px`);
            });
        }

        window.addEventListener("mousemove", handleMouseMove);

        const hoverTargets = document.querySelectorAll(".contact-links a, .get-in-touch");
        hoverTargets.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                character.classList.add("eyes-excited");
            });
            el.addEventListener("mouseleave", () => {
                character.classList.remove("eyes-excited");
            });
        });
    }

    
    initLanding();

/* ===== FOOTER ANIMATION ===== */

const footer = document.getElementById("footerHome");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.classList.add("animate");
        }
    });
}, { threshold: 0.4 });

if (footer) observer.observe(footer);

/* Burbujas dinámicas */

const bubbleContainer = document.querySelector(".footer-bubbles");

function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 20 + 8;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = 4 + Math.random() * 4 + "s";

    bubbleContainer.appendChild(bubble);

    bubble.addEventListener("click", () => {
        bubble.style.animation = "pop 0.4s forwards";
    });

    setTimeout(() => {
        bubble.remove();
    }, 8000);
}

if (bubbleContainer) setInterval(createBubble, 300);

/* ===== NEWSLETTER ANIMATION ===== */

const newsletter = document.querySelector(".newsletter-section");
const words = document.querySelectorAll(".newsletter-title span");
const line = document.querySelector(".newsletter-line");

const observer2 = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {

        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.transition = "0.8s cubic-bezier(.77,0,.18,1)";
                word.style.transform = "translateX(0)";
                word.style.opacity = "1";
            }, index * 250);
        });

        setTimeout(() => {
            line.style.transition = "0.8s cubic-bezier(.77,0,.18,1)";
            line.style.transform = "scaleX(1)";
        }, 600);

        observer2.disconnect();
    }
}, { threshold: 0.4 });

if (newsletter && line) observer2.observe(newsletter);

});

function initLanding() {
    const landing = document.getElementById("landing");

    if (!landing) {
        startNameCycle();
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroRight = document.querySelector(".hero-right");

    if (reduceMotion || !heroRight) {
        endLanding(landing);
        return;
    }

    const typed = document.getElementById("landingTyped");
    const logo = document.getElementById("landingLogo");
    const stack = document.getElementById("landingStack");
    const center = document.getElementById("landingCenter");
    const quote = document.getElementById("landingQuote");
    const quoteText = document.getElementById("landingQuoteText");
    const scrim = document.getElementById("landingScrim");
    const kicker = document.querySelector(".landing-kicker");
    const sideLeft = document.querySelector(".landing-side-left");
    const sideRight = document.querySelector(".landing-side-right");
    const nameEl = document.querySelector(".name");

    const cardsData = [
        { src: "Images/FitMeMagazine.png", rot: -6, x: -12, y: 8 },
        { src: "Images/Poster-Pelicula-de-terror.png", rot: 5, x: 10, y: -6 },
        { src: "Images/ariel-bourgeat-textured.jpg", rot: -8, x: -8, y: 12 },
        { src: "Images/ariel-bourgeat-tbhc.jpg", rot: 7, x: 12, y: 4 },
        { src: "Images/foto2.png", rot: -5, x: -14, y: -4 },
        { src: "Images/cave2.jpg", rot: 9, x: 6, y: 10 },
        { src: "Images/Fitme2.jpeg", rot: -14, x: 0, y: 0 }
    ];

    const cardEls = cardsData.map((card, index) => {
        const img = document.createElement("img");
        img.className = "stack-card";
        img.src = card.src;
        img.alt = "";
        img.draggable = false;
        img.style.zIndex = String(index + 1);
        stack.appendChild(img);
        return img;
    });

    if (nameEl && nameEl.dataset.split !== "1") {
        const parts = nameEl.textContent.split(/(\s+)/);
        nameEl.textContent = "";
        parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
                nameEl.appendChild(document.createTextNode(part));
                return;
            }

            const word = document.createElement("span");
            word.className = "name-word";
            [...part].forEach((ch) => {
                const span = document.createElement("span");
                span.className = "name-char";
                span.textContent = ch;
                word.appendChild(span);
            });
            nameEl.appendChild(word);
        });
        nameEl.dataset.split = "1";
    }

    const phrases = [
        "Interactive Media Designer.",
        "UI/UX & Front-End Developer.",
        "Web Design.",
        "Creative Technology."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typeTimer = 0;
    let imageCount = 0;
    let tail = 0;
    let busy = false;
    let queued = 0;
    let wheelAcc = 0;
    let finished = false;
    let kineticOn = false;
    let touchY = null;

    function clamp(v, a, b) {
        return Math.max(a, Math.min(b, v));
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function lerpRect(a, b, t) {
        return {
            top: lerp(a.top, b.top, t),
            left: lerp(a.left, b.left, t),
            width: lerp(a.width, b.width, t),
            height: lerp(a.height, b.height, t),
            radius: lerp(a.radius, b.radius, t)
        };
    }

    function typeTick() {
        const phrase = phrases[phraseIndex];

        if (!deleting) {
            charIndex += 1;
            typed.textContent = phrase.slice(0, charIndex);

            if (charIndex >= phrase.length) {
                typeTimer = setTimeout(() => {
                    deleting = true;
                    typeTick();
                }, 1700);
                return;
            }

            typeTimer = setTimeout(typeTick, 48);
            return;
        }

        charIndex -= 1;
        typed.textContent = phrase.slice(0, Math.max(charIndex, 0));

        if (charIndex <= 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeTimer = setTimeout(typeTick, 280);
            return;
        }

        typeTimer = setTimeout(typeTick, 26);
    }

    function clearKinetic() {
        document.querySelectorAll(".name-char, .role, .intro-text > *, .intro-right, .nav").forEach((el) => {
            el.style.opacity = "";
            el.style.transform = "";
            el.style.pointerEvents = "";
        });
    }

    function applyKinetic(t) {
        document.querySelectorAll(".name-char").forEach((span, i) => {
            const local = easeOut(clamp((t - 0.2 - i * 0.018) / 0.4, 0, 1));
            span.style.opacity = String(local);
            span.style.transform = `translateY(${(1 - local) * 110}%)`;
        });

        const role = document.querySelector(".role");
        if (role) {
            const roleT = easeOut(clamp((t - 0.34) / 0.32, 0, 1));
            role.style.opacity = String(roleT);
            role.style.transform = `translateY(${(1 - roleT) * 18}px)`;
        }

        const bits = [...document.querySelectorAll(".intro-text > *"), document.querySelector(".intro-right")];
        bits.forEach((el, i) => {
            if (!el) return;
            const local = easeOut(clamp((t - 0.22 - i * 0.07) / 0.34, 0, 1));
            el.style.opacity = String(local);
            el.style.transform = `translateY(${(1 - local) * 32}px)`;
        });

        const nav = document.querySelector(".nav");
        if (nav) {
            const navT = easeOut(clamp(t / 0.38, 0, 1));
            nav.style.opacity = String(navT);
            nav.style.pointerEvents = navT > 0.92 ? "auto" : "none";
        }
    }

    function getStartRect() {
        const c = center.getBoundingClientRect();
        const width = c.width;
        const height = width * 0.64;
        return {
            top: c.top + c.height / 2 - height / 2,
            left: c.left,
            width,
            height,
            radius: 24
        };
    }

    function getFullRect() {
        const mx = Math.max(28, window.innerWidth * 0.035);
        const my = Math.max(22, window.innerHeight * 0.04);
        return {
            top: my,
            left: mx,
            width: window.innerWidth - mx * 2,
            height: window.innerHeight - my * 2,
            radius: 32
        };
    }

    function getHeroRect() {
        const r = heroRight.getBoundingClientRect();
        return {
            top: r.top,
            left: r.left,
            width: r.width,
            height: r.height,
            radius: 0
        };
    }

    function render() {
        const showLogo = imageCount === 0 && tail <= 0;
        logo.style.opacity = showLogo ? "1" : "0";
        logo.style.transform = showLogo ? "scale(1)" : "scale(0.94)";

        const nameFade = Math.max(0, 1 - tail / 0.12);
        sideLeft.style.opacity = String(nameFade);
        sideRight.style.opacity = String(nameFade);
        sideLeft.style.transform = `translateX(${(1 - nameFade) * -28}px)`;
        sideRight.style.transform = `translateX(${(1 - nameFade) * 28}px)`;

        const kickerFade = Math.max(0, 1 - tail / 0.1);
        kicker.style.opacity = String(kickerFade);

        cardEls.forEach((card, index) => {
            const visible = index < imageCount;
            const data = cardsData[index];
            card.style.opacity = visible ? "1" : "0";
            card.style.transform = visible
                ? `translate(calc(-50% + ${data.x}px), calc(-50% + ${data.y}px)) rotate(${data.rot}deg) scale(1)`
                : "translate(-50%, -50%) rotate(0deg) scale(0.92)";
        });

        stack.style.opacity = String(Math.max(0, 1 - tail / 0.2));
        stack.style.transform = `scale(${1 - Math.min(tail, 0.45) * 0.06})`;

        const growEnd = 0.22;
        const holdEnd = 0.40;
        const settleEnd = 0.74;
        const expandT = clamp(tail / growEnd, 0, 1);
        const settleT = clamp((tail - holdEnd) / (settleEnd - holdEnd), 0, 1);
        const revealT = clamp((tail - settleEnd) / (1 - settleEnd), 0, 1);
        const fullRect = getFullRect();
        const frame = tail >= holdEnd
            ? lerpRect(fullRect, getHeroRect(), easeInOut(settleT))
            : lerpRect(getStartRect(), fullRect, easeInOut(expandT));

        quote.style.top = frame.top + "px";
        quote.style.left = frame.left + "px";
        quote.style.width = frame.width + "px";
        quote.style.height = frame.height + "px";
        quote.style.borderRadius = frame.radius + "px";
        quote.style.opacity = tail > 0.01 ? "1" : "0";

        const shadowStrength = settleT > 0.72 ? 1 - (settleT - 0.72) / 0.28 : 1;
        quote.style.boxShadow = tail > 0.01
            ? `0 24px 70px rgba(0,0,0,${(0.16 * shadowStrength).toFixed(3)})`
            : "none";

        scrim.style.opacity = String(0.28 * (1 - settleT));

        const heroFont = parseFloat(getComputedStyle(document.querySelector(".hero-quote")).fontSize) || 28;
        const fullFont = Math.min(42, Math.max(28, window.innerWidth * 0.026));
        const fontSize = settleT > 0
            ? lerp(fullFont, heroFont, easeInOut(settleT))
            : lerp(18, fullFont, expandT);
        const maxW = settleT > 0 ? lerp(640, 420, easeInOut(settleT)) : lerp(300, 640, expandT);
        const textIn = tail < growEnd ? clamp((expandT - 0.45) / 0.28, 0, 1) : 1;

        quoteText.style.opacity = String(textIn);
        quoteText.style.fontSize = fontSize + "px";
        quoteText.style.maxWidth = maxW + "px";

        if (revealT > 0) {
            landing.style.background = "transparent";
            landing.style.zIndex = "4";
            kineticOn = true;
            applyKinetic(revealT);
        } else {
            landing.style.background = "#fff";
            landing.style.zIndex = "1800";
            if (kineticOn) {
                clearKinetic();
                kineticOn = false;
            }
        }
    }

    let renderQueued = false;

    function scheduleRender() {
        if (renderQueued || finished) return;
        renderQueued = true;
        requestAnimationFrame(() => {
            renderQueued = false;
            if (!finished) render();
        });
    }

    function stepImages(dir) {
        if (finished) return;

        if (dir > 0 && imageCount >= cardsData.length) {
            tail = Math.max(tail, 0.06);
            scheduleRender();
            return;
        }

        const next = imageCount + dir;
        if (next < 0 || next > cardsData.length) return;

        busy = true;
        imageCount = next;
        scheduleRender();

        setTimeout(() => {
            busy = false;
            const pending = queued;
            queued = 0;
            if (pending) stepImages(pending);
        }, 480);
    }

    function handleDelta(dy) {
        if (finished || Math.abs(dy) < 0.4) return;

        if (imageCount < cardsData.length && tail <= 0) {
            if (busy) {
                queued = dy > 0 ? 1 : -1;
                return;
            }

            wheelAcc += dy;
            if (wheelAcc >= 64) {
                wheelAcc = 0;
                stepImages(1);
            } else if (wheelAcc <= -64) {
                wheelAcc = 0;
                stepImages(-1);
            }
            return;
        }

        if (busy) {
            if (tail <= 0) queued = dy > 0 ? 1 : -1;
            return;
        }

        const prev = tail;
        tail = clamp(tail + dy / 1750, 0, 1);

        if (tail <= 0 && dy < 0 && prev <= 0.001) {
            tail = 0;
            wheelAcc = 0;
            stepImages(-1);
            return;
        }

        if (tail >= 0.995) {
            tail = 1;
            render();
            finish();
            return;
        }

        scheduleRender();
    }

    function normalizeDelta(e) {
        let dy = e.deltaY;
        if (e.deltaMode === 1) dy *= 32;
        else if (e.deltaMode === 2) dy *= window.innerHeight;
        return Math.max(-110, Math.min(110, dy));
    }

    function onWheel(e) {
        if (finished || e.ctrlKey) return;
        e.preventDefault();
        handleDelta(normalizeDelta(e));
    }

    function onTouchStart(e) {
        if (finished) return;
        touchY = e.touches[0].clientY;
    }

    function onTouchMove(e) {
        if (finished || touchY == null) return;
        e.preventDefault();
        const y = e.touches[0].clientY;
        handleDelta(touchY - y);
        touchY = y;
    }

    function onKey(e) {
        if (finished) return;
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
            e.preventDefault();
            handleDelta(100);
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
            e.preventDefault();
            handleDelta(-100);
        }
    }

    function onResize() {
        if (!finished) scheduleRender();
    }

    function finish() {
        if (finished) return;
        finished = true;
        clearTimeout(typeTimer);
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", onResize);
        endLanding(landing);
    }

    typeTick();
    render();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
}

function endLanding(landing) {
    document.documentElement.classList.remove("landing-active");
    document.body.classList.remove("landing-active");
    document.querySelectorAll(".name-char, .role, .intro-text > *, .intro-right, .nav, .hero-quote").forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
        el.style.pointerEvents = "";
    });
    if (landing) landing.remove();
    startNameCycle();
}