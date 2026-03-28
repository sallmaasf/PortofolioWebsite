/* ================= PARTICLE BACKGROUND ================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* ================= OPENING TYPING ================= */

const text = "www.nayza.dev";
let index = 0;
const typingSpeed = 200;
const typingElement = document.getElementById("typing");

function typeWriter() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, typingSpeed);
  }
}

/* ================= SUBTITLE TYPING ================= */

const subtitleText = "Information Technology Education";
let subtitleIndex = 0;

function typeSubtitle() {
  const el = document.getElementById("typing-subtitle");

  if (subtitleIndex < subtitleText.length) {
    el.innerHTML += subtitleText.charAt(subtitleIndex);
    subtitleIndex++;
    setTimeout(typeSubtitle, 70);
  }
}

/* ================= LOADING BAR ================= */

let percent = 0;

const progress = document.querySelector(".progress");
const percentText = document.getElementById("percent");
const opening = document.getElementById("opening");

function startLoading() {
  const loading = setInterval(() => {
    percent++;

    progress.style.width = percent + "%";
    percentText.textContent = percent;

    if (percent >= 100) {
      clearInterval(loading);

      setTimeout(() => {
        opening.style.opacity = "0";
        opening.style.visibility = "hidden";
      }, 500);
    }
  }, 60);
}

/* ================= STAT COUNTER (Scroll Trigger) ================= */
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  const startCounter = (entries, observer) => {
    entries.forEach((entry) => {
      // Jika section stats masuk ke area pandang (viewport)
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const increment = target / 50;

        const update = () => {
          if (current < target) {
            current += increment;
            counter.innerText = Math.ceil(current) + "+";
            setTimeout(update, 30);
          } else {
            counter.innerText = target + "+";
          }
        };

        update();
        // Berhenti mengamati setelah animasi jalan sekali (opsional)
        observer.unobserve(counter); 
      }
    });
  };

  // Settingan sensor scroll
  const observerOptions = {
    threshold: 0.5, // Animasi mulai pas 50% section kelihatan di layar
  };

  const observer = new IntersectionObserver(startCounter, observerOptions);

  // Daftarkan semua elemen stat-number ke observer
  counters.forEach((counter) => observer.observe(counter));
});

/* ================= PORTFOLIO TAB ================= */

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-tab");

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

/* ================= PORTFOLIO STATISTICS ================= */

const projectTotal = document.querySelectorAll(
  "#projects .portfolio-card",
).length;
const certificateTotal = document.querySelectorAll(
  "#certificates .portfolio-card",
).length;
const techTotal = document.querySelectorAll(".tech-skill").length;

function animateCounter(id, target) {
  let element = document.getElementById(id);
  let count = 0;

  const interval = setInterval(() => {
    if (count < target) {
      count++;
      element.innerText = count;
    } else {
      element.innerText = target + "+";
      clearInterval(interval);
    }
  }, 80);
}

let started = false;

window.addEventListener("scroll", () => {
  const section = document.querySelector(".portfolio-stats");
  const position = section?.getBoundingClientRect()?.top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight && !started) {
    animateCounter("projectCount", projectTotal);
    animateCounter("certificateCount", certificateTotal);
    animateCounter("techCount", techTotal);

    started = true;
  }
});

/* ================= START ALL ANIMATION ================= */

window.addEventListener("load", () => {
  typeWriter();
  startLoading();

  setTimeout(() => {
    typeSubtitle();
  }, 1000);
});

/* MUSIC PLAYER */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const musicProgress = document.querySelector(".music-progress-bar");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.innerText = "⏸";
  } else {
    music.pause();
    musicBtn.innerText = "🎵";
  }
});

music.addEventListener("timeupdate", () => {
  const percent = (music.currentTime / music.duration) * 100;
  musicProgress.style.width = percent + "%";

  let m = Math.floor(music.currentTime / 60);
  let s = Math.floor(music.currentTime % 60);

  if (s < 10) s = "0" + s;

  current.innerText = m + ":" + s;
});

music.addEventListener("loadedmetadata", () => {
  let m = Math.floor(music.duration / 60);
  let s = Math.floor(music.duration % 60);

  if (s < 10) s = "0" + s;

  duration.innerText = m + ":" + s;
});

/* ACTIVITIES */
const gallery = document.getElementById("gallery");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

if (next && gallery) {
  next.addEventListener("click", () => {
    gallery.scrollBy({ left: 300, behavior: "smooth" });
  });
}

if (prev && gallery) {
  prev.addEventListener("click", () => {
    gallery.scrollBy({ left: -300, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", function () {

  /* ================= ACTIVITIES (SCROLL) ================= */
  const gallery = document.getElementById("gallery");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");

  if (next && gallery) {
    next.addEventListener("click", () => {
      gallery.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  if (prev && gallery) {
    prev.addEventListener("click", () => {
      gallery.scrollBy({ left: -300, behavior: "smooth" });
    });
  }

  /* ================= AUTO SLIDE ================= */
  if (gallery) {
    setInterval(() => {
      gallery.scrollBy({ left: 300, behavior: "smooth" });
    }, 4000);
  }

/* ================= LIGHTBOX ================= */
  const images = document.querySelectorAll("img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    images.forEach((img) => {
      img.style.cursor = "pointer";

      img.addEventListener("click", function () {
        lightbox.style.display = "flex";
        lightboxImg.src = this.src;
        // KUNCI SCROLL
        document.body.style.overflow = "hidden";
      });
    });

    lightbox.addEventListener("click", function () {
      lightbox.style.display = "none";
      // BUKA SCROLL
      document.body.style.overflow = "auto";
    });
  }

/* ================= PROJECT MODAL ================= */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");
const modalImg = document.getElementById("modalImg"); 
const modalYear = document.getElementById("modalYear"); 
const modalTools = document.getElementById("modalTools"); 
const closeBtn = document.querySelector(".close");

const cards = document.querySelectorAll("#projects .portfolio-card");

// Variable untuk menyimpan kartu yang sedang aktif dibuka
let activeCard = null;

// FUNGSI UNTUK REFRESH GAMBAR (Bisa dipanggil saat klik & saat resize)
function refreshModalImage() {
    if (!activeCard || !modal.classList.contains("active")) return;

    const imgH = activeCard.dataset.img || "";   // Gambar A (Horizontal/Mobile)
    const imgV = activeCard.dataset.imgV || imgH; // Gambar B (Vertikal/Web)

    // Cek lebar layar saat ini secara real-time
    if (window.innerWidth <= 768) {
        // Mode Mobile: Pake Gambar A
        modalImg.src = imgH;
        modalImg.style.aspectRatio = "16 / 9"; 
        modalImg.style.objectFit = "cover";
        modalImg.style.width = "100%";
        modalImg.style.height = "auto";
    } else {
        // Mode Web: Pake Gambar B
        modalImg.src = imgV;
        modalImg.style.aspectRatio = "3 / 4"; 
        modalImg.style.objectFit = "contain"; 
        modalImg.style.width = "auto";
        modalImg.style.maxHeight = "70vh"; // Biar gak melebihi layar desktop
    }
}

// ================= OPEN MODAL =================
cards.forEach(card => {
  card.addEventListener("click", () => {
    activeCard = card; // Catat kartu mana yang diklik
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");

    // 1. Jalankan Logika Pilih Gambar
    refreshModalImage();

    // 2. Isi data teks
    modalTitle.innerText = card.dataset.title || "No Title";
    modalDesc.innerText = card.dataset.desc || "No Description available.";
    modalLink.href = card.dataset.link || "#";
    modalYear.innerText = card.dataset.year || "";

    // 3. LOGIKA TOOLS (SET SEMUA JADI PUTIH)
    modalTools.innerHTML = ""; 
    const toolsString = card.dataset.tools || ""; 

    if (toolsString.trim() !== "") {
        const toolsArray = toolsString.split(",");
        
        toolsArray.forEach(tool => {
            const cleanTool = tool.trim();
            if (!cleanTool) return;

            // JIKA ICON BERUPA LINK (Figma/Simple Icons)
            if (cleanTool.startsWith("http")) {
                const imgIcon = document.createElement("img");
                imgIcon.src = cleanTool;
                imgIcon.classList.add("modal-icon-img"); 
                modalTools.appendChild(imgIcon);
            } 
            // JIKA ICON BERUPA CLASS (Font Awesome / Devicon)
            else {
                const icon = document.createElement("i");
                if (cleanTool.includes("devicon")) {
                    icon.className = `devicon ${cleanTool}`; 
                } else {
                    icon.className = cleanTool;
                }
                modalTools.appendChild(icon);
            }
        });
    }
  });
});

// ================= AUTO REFRESH SAAT RESIZE =================
window.addEventListener("resize", () => {
    if (modal.classList.contains("active")) {
        refreshModalImage();
    }
});

// ================= CLOSE FUNCTION =================
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  document.body.classList.remove("modal-open");
  activeCard = null; // Reset kartu aktif saat ditutup
}

if (closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});


const toggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

toggle.addEventListener("click", () => {
  navbar.classList.toggle("active");

  // ubah icon
  toggle.textContent =
    navbar.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll("#navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    toggle.textContent = "☰";
  });
});

window.addEventListener("click", (e) => {
  if (!toggle.contains(e.target) && !navbar.contains(e.target)) {
    navbar.classList.remove("active");
    toggle.textContent = "☰";
  }
});
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1, // Muncul sedikit saja langsung mulai animasi
    rootMargin: "0px 0px -50px 0px" // Memberi jeda agar animasi tidak terlalu mepet bawah layar
  };

  const revealCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Saat section masuk layar
        entry.target.classList.add("active");
      } else {
        // SAAT SECTION KELUAR LAYAR (Scroll balik)
        // Ini yang bikin efeknya muncul lagi pas di-scroll ulang
        entry.target.classList.remove("active");
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach(el => observer.observe(el));
});