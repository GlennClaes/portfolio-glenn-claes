<template>
  <body class="index-page">
  <Header />
  <main class="main">
    <HeroView />
    <AboutView />
    <ServicesView />
    <TestimonialsView />
    <PortfolioView />
    <PricingView />
    <ContactView />
  </main>
  <Footer />
 <PreLoader />


  </body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

// Vendor Imports
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "aos/dist/aos.css";
import "swiper/css/bundle";
import "glightbox/dist/css/glightbox.css";
import "@/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/assets/css/main.css";

import AOS from "aos";
import Swiper from "swiper/bundle";
import GLightbox from "glightbox";
import Header from "@/components/Header.vue";
import HeroView from "@/views/HeroView.vue";
import AboutView from "@/views/AboutView.vue";
import ServicesView from "@/views/ServicesView.vue";
import TestimonialsView from "@/views/TestimonialsView.vue";
import PortfolioView from "@/views/PortfolioView.vue";
import PricingView from "@/views/PricingView.vue";
import ContactView from "@/views/ContactView.vue";
import Footer from "@/components/Footer.vue";
import PreLoader from "@/components/PreLoader.vue";

const year = ref(new Date().getFullYear());

onMounted(() => {
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector("#navmenu");
  const navUl = navMenu?.querySelector("ul");
  const headerEl = document.getElementById("header");

  // -------------------------------
  // MOBILE NAV LAYOUT
  // -------------------------------
  const updateMobileNavLayout = () => {
    if (!navMenu || !navUl) return;

    const headerHeight = headerEl?.offsetHeight || 0;

    navMenu.style.position = "fixed";
    navMenu.style.top = `${headerHeight}px`;
    navMenu.style.left = 0;
    navMenu.style.right = 0;
    navMenu.style.bottom = 0;
    navMenu.style.zIndex = "9999";

    navUl.style.maxHeight = `calc(100vh - ${headerHeight}px)`;
    navUl.style.overflowY = "auto";
    navUl.style.webkitOverflowScrolling = "touch";
  };

  updateMobileNavLayout();
  window.addEventListener("resize", updateMobileNavLayout);

  // -------------------------------
  // BODY SCROLL LOCK
  // -------------------------------
  const lockBodyScroll = (enabled) => {
    document.body.classList.toggle("mobile-nav-open", enabled);
  };

  // -------------------------------
  // TOGGLE MOBILE NAV
  // -------------------------------
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isActive = navMenu.classList.toggle("navmenu-active");
      mobileToggle.classList.toggle("bi-list", !isActive);
      mobileToggle.classList.toggle("bi-x", isActive);
      lockBodyScroll(isActive);
    });
  }

  // -------------------------------
  // MOBILE DROPDOWN
  // -------------------------------
  navMenu.querySelectorAll(".dropdown > a").forEach(anchor => {
    anchor.addEventListener("click", e => {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        const li = anchor.closest("li");
        li.classList.toggle("dropdown-active");
      }
    });
  });

  // -------------------------------
  // CLOSE MOBILE NAV ON LINK CLICK
  // -------------------------------
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1200 && navMenu.classList.contains("navmenu-active")) {
        navMenu.classList.remove("navmenu-active");
        mobileToggle.classList.add("bi-list");
        mobileToggle.classList.remove("bi-x");
        lockBodyScroll(false);
      }
    });
  });

  // -------------------------------
  // CLOSE NAV IF CLICK OUTSIDE
  // -------------------------------
  document.addEventListener("click", e => {
    if (!navMenu || !mobileToggle) return;
    const clickedInside = navMenu.contains(e.target) || mobileToggle.contains(e.target);
    if (!clickedInside && navMenu.classList.contains("navmenu-active")) {
      navMenu.classList.remove("navmenu-active");
      mobileToggle.classList.add("bi-list");
      mobileToggle.classList.remove("bi-x");
      lockBodyScroll(false);
    }
  });

  // -------------------------------
  // VENDORS
  // -------------------------------
  AOS.init({ duration: 800, once: true });

  new Swiper(".swiper", {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: "auto",
    pagination: { el: ".swiper-pagination", clickable: true },
  });

  GLightbox({ selector: ".glightbox" });

  const preloader = document.getElementById("preloader");
  if (preloader) window.addEventListener("load", () => preloader.style.display = "none");
});
</script>

<style scoped>
@media (max-width: 1199px) {
  #navmenu > ul {
    display: none;
    flex-direction: column;
    background: #fff;
    width: 100%;
    margin: 0;
    padding: 10px 0;
    gap: 8px;
    max-height: 70vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    border-top: 1px solid #eee;
  }

  #navmenu.navmenu-active > ul {
    display: flex;
  }

  /* Mobile dropdowns */
  .navmenu ul ul {
    display: none;
    flex-direction: column;
    padding-left: 16px;
    gap: 6px;
    margin-top: 4px;
    border-left: 2px solid #ddd;
  }

  .navmenu .dropdown.dropdown-active > ul {
    display: flex;
  }

  .navmenu ul ul ul {
    border-left-style: dashed;
    padding-left: 16px;
  }

  /* Hamburger icon */
  .mobile-nav-toggle {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    font-size: 28px;
    cursor: pointer;
    z-index: 9999;
    color: #111;
  }

  .mobile-nav-toggle.bi-x {
    color: #ff4444;
  }

  body.mobile-nav-open {
    overflow: hidden;
  }
}

</style>
