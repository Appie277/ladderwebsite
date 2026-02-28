// Jaar in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Sticky header shadow + back to top
const header = document.querySelector(".header");
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 10;
  header.classList.toggle("scrolled", scrolled);
  backToTop.classList.toggle("show", window.scrollY > 500);
});

// Back to top click
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile menu toggle
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when clicking a link (mobile)
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// Active nav link on scroll
const sections = ["menu", "gallery", "contact"].map(id => document.getElementById(id));
const links = document.querySelectorAll(".nav-link");

function setActiveLink() {
  const y = window.scrollY + 120;
  let activeId = null;

  for (const sec of sections) {
    if (sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y) {
      activeId = sec.id;
      break;
    }
  }

  links.forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${activeId}`);
  });
}
window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Gallery lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// WhatsApp quick order buttons
// VERVANG dit nummer door jouw echte nummer (zonder 0, met landcode)
const whatsappNumber = "31612345678";

document.querySelectorAll(".order-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.dataset.product || "Product";
    const price = btn.dataset.price || "";
    const msg = encodeURIComponent(
      `Hi! Ik wil graag bestellen:\n- ${product} (${price})\n\nDatum/tijd afhalen:\nAantal:\nExtra wensen:`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
  });
});