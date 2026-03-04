document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector(".hero-video");
    const title = document.querySelector(".hero-title");
    const sub = document.querySelector(".hero-sub");

    let heroActivated = false;

    // 1️⃣ Mostrar solo el video al cargar
    setTimeout(() => {
        video.classList.add("active");
    }, 300);

    // 2️⃣ Bloquear scroll al inicio
    document.body.style.overflow = "hidden";

    function activateHeroText() {

        if (heroActivated) return;
        heroActivated = true;

        title.classList.add("active");
        sub.classList.add("active");

        // desbloquear scroll después de animación
        setTimeout(() => {
            document.body.style.overflow = "auto";
        }, 900);
    }

    // 3️⃣ Detectar primer scroll
    window.addEventListener("wheel", (e) => {

        if (!heroActivated) {
            e.preventDefault();
            activateHeroText();
        }

    }, { passive: false });


    /* ================= EXPERIENCE ================= */

    const cards = document.querySelectorAll(".exp-card");
    const character = document.querySelector(".experience-character");
    const experienceSection = document.querySelector(".experience-section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("visible");
                    }, index * 200);
                });

                if (character) {
                    character.classList.add("visible");
                }
            }
        });
    }, { threshold: 0.4 });

    if (experienceSection) {
        observer.observe(experienceSection);
    }

    /* ================= FUN FACT INTERACTION ================= */

    const quotes = document.querySelectorAll(".quote-card");
    const postit = document.getElementById("postit");

    quotes.forEach(quote => {
        quote.addEventListener("click", () => {

            const note = quote.getAttribute("data-note");

            postit.textContent = note;
            postit.classList.add("active");

        });
    });

// TEXTO TYPEWRITTER
const funSection = document.getElementById("funSection");
let animationStarted = false;

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animationStarted) {
        animationStarted = true;
        startFunSection();
        }
    });
}, { threshold: 0.4 });

observer2.observe(funSection);

function startFunSection() {
    typeWriter();
    }
    
    const introText =
    `I love videogames music and talking so...
    why dont we have a good time while we are here.`;
    
    const typingElement = document.querySelector(".typing");
    const secondary = document.querySelector(".fun-secondary");
    const player = document.querySelector(".music-player");
    const form = document.querySelector(".mini-contact");
    const game = document.getElementById("gameContainer");
    
    let i = 0;
    
    function typeWriter() {
        if (i < introText.length) {
        typingElement.textContent += introText.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
        } else {
        typingElement.style.borderRight = "none";
    
        setTimeout(() => {
            secondary.classList.add("show");
    
            setTimeout(() => {
            player.classList.add("show");
    
            setTimeout(() => {
                game.classList.add("show");
                initFlappy();
    
                setTimeout(() => {
                form.classList.add("show");
                }, 500);
    
            }, 500);
    
            }, 500);
    
        }, 400);
        }
    }

//PLAY BUTTON
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "❚❚";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

function formatTime(time) {
const minutes = Math.floor(time / 60);
const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Duración total
audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
});

// Actualizar progreso
audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Click para avanzar
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

//FLAPPY BIRD JUEGO ----------------------------------------------------------------------------------------------
    function initFlappy() {

        const canvas = document.getElementById("flappyGame");
        const ctx = canvas.getContext("2d");
        canvas.height = 450;
    
        let gameStarted = false;
        let gameOver = false;
        let frame = 0;
        let score = 0;
    
        // Imagen del personaje
        const birdImg = new Image();
        birdImg.src = "Images/GameChar.png";
    
        let bird = {
        x: 60,
        y: 200,
        width: 28,
        height: 28,
        gravity: 0.4,
        lift: -6,
        velocity: 0
        };
    
        let pipes = [];
    
        function drawStartScreen() {
            ctx.textAlign = "center";
            ctx.font = "Jersey 10", "sans-serif";
            
            // Imagen arriba
            ctx.drawImage(
            birdImg,
            canvas.width / 2 - 30,
            canvas.height / 2 - 80,
            60,
            60
            );
            
            ctx.fillStyle = "black";
            ctx.font = "18px Arial";
            ctx.fillText("Click to Start Playing", canvas.width / 2, canvas.height / 2);
            }
    
        function drawBird() {
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        }
    
        function drawPipes() {
        pipes.forEach(pipe => {
    
            // Pilar superior
            ctx.fillStyle = "#1c29d6";
            ctx.strokeStyle = "rgba(255,0,0,0.3)";
            ctx.lineWidth = 1;
    
            ctx.fillRect(pipe.x, 0, 40, pipe.top);
            ctx.strokeRect(pipe.x, 0, 40, pipe.top);
    
            // Pilar inferior
            ctx.fillRect(pipe.x, pipe.bottom, 40, canvas.height);
            ctx.strokeRect(pipe.x, pipe.bottom, 40, canvas.height);
        });
        }
    
        function update() {
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        if (!gameStarted) {
            drawStartScreen();
            return requestAnimationFrame(update);
        }
    
        if (gameOver) {

                ctx.textAlign = "center";
            
                // Imagen arriba
                ctx.drawImage(
                    birdImg,
                    canvas.width / 2 - 30,
                    canvas.height / 2 - 100,
                    60,
                    60
                );
            
                ctx.fillStyle = "black";
                ctx.font = "20px Arial";
                ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20);
            
                ctx.font = "14px Arial";
                ctx.fillText("Click to Restart", canvas.width / 2, canvas.height / 2 + 10);
            
                return requestAnimationFrame(update);
        }
    
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;
    
        if (frame % 90 === 0) {
            let top = Math.random() * 200 + 50;
            let gap = 130;
            pipes.push({
            x: canvas.width,
            top: top,
            bottom: top + gap
            });
        }
    
        pipes.forEach(pipe => {
            pipe.x -= 2;
    
            // Colisión
            if (
            bird.x < pipe.x + 40 &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
            ) {
            gameOver = true;
            }
    
            if (pipe.x + 40 === bird.x) {
            score++;
            }
        });
    
        if (bird.y + bird.height > canvas.height || bird.y < 0) {
            gameOver = true;
        }
    
        drawBird();
        drawPipes();
    
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "left";
        ctx.fillText("Score: " + score, 10, 25);
    
        frame++;
        requestAnimationFrame(update);
        }
    
        function jump() {
        if (!gameStarted) {
            gameStarted = true;
            return;
        }
    
        if (gameOver) {
            // Reset
            gameOver = false;
            pipes = [];
            score = 0;
            frame = 0;
            bird.y = 200;
            bird.velocity = 0;
            return;
        }
    
        bird.velocity = bird.lift;
        }
    
        canvas.addEventListener("click", jump);
        document.addEventListener("keydown", e => {
        if (e.code === "Space") jump();
        });
    
        update();
    }

});

