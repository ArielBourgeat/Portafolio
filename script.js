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

const nameElement = document.querySelector(".name");

const fonts = [
  "'Playfair Display', serif",
  "'Space Grotesk', sans-serif",
  "'Oswald', sans-serif",
  "'Montserrat', sans-serif",
  "'Bebas Neue', sans-serif"
];

let currentFont = 0;

setInterval(() => {
    nameElement.style.opacity = "0";
  
    setTimeout(() => {
      currentFont = (currentFont + 1) % fonts.length;
      nameElement.style.fontFamily = fonts[currentFont];
      nameElement.style.opacity = "1";
    }, 200);
  
  }, 3000);

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

    
    /* ===== CINEMATIC INTRO CONTROL ===== */

const intro = document.getElementById("introOverlay");

// Solo ejecutar si es primera visita en sesión
if (!sessionStorage.getItem("introPlayed")) {

    // Bloquear scroll mientras intro está activa
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        intro.classList.add("exit");

        // Restaurar scroll
        document.body.style.overflow = "";

        setTimeout(() => {
            intro.remove();
        }, 1000);

    }, 3000);

    sessionStorage.setItem("introPlayed", "true");

} else {
    // Si ya se reprodujo, eliminar inmediatamente
    if (intro) intro.remove();
}

/* ===== FOOTER ANIMATION ===== */

const footer = document.getElementById("footerHome");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.classList.add("animate");
        }
    });
}, { threshold: 0.4 });

observer.observe(footer);

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

setInterval(createBubble, 300);

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

observer2.observe(newsletter);

});