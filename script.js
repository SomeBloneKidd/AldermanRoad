// ================= PARTICLES =================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const amount = 50;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < amount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 0.7 + 0.1
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.y -= p.speed;

        if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(247,141,21,0.35)";
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();

// ================= NAVBAR SCROLL =================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ================= SECTION FADE IN =================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// ================= ACTIVE NAV LINK =================

const navLinksAll = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ================= SHOWS =================

const shows = [
    { name: "Sound Corner Festival", date: "May 22" }
];

const container = document.getElementById("showList");

if (container) {
    shows.forEach(show => {
        const div = document.createElement("div");
        div.className = "show-item";
        div.innerHTML = `<span>${show.name}</span><span>${show.date}</span>`;
        container.appendChild(div);
    });
}

// ================= MOBILE NAV =================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove("active");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        navLinks.classList.remove("active");
    }
});



