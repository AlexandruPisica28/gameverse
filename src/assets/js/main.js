// IMPORTURI
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

import "/src/assets/scss/main.scss"; 
import "./generateProduct.js";
import "./generateHardware.js";

import { displayProducts } from "./generateProduct.js";
import "./validate.js";

(function() {
  "use strict";


  // NAVBAR: închidere automată la click pe link in responsive  
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    });
  });

  
  // NAVBAR BUTTON CLOSE
  const closeMenuBtn = document.querySelector('.btn-close-menu');
  if (closeMenuBtn && navbarCollapse) {
    closeMenuBtn.addEventListener('click', () => {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    });
  }

 
  // FETCH PRODUCTS
  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:4000/products");
      if (!response.ok) throw new Error("Eroare la fetch");
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error("Eroare la încărcarea produselor:", error);
    }
  }

  fetchProducts();


  // SCROLL ACTIVE NAVBAR
  const navbarLinks = document.querySelectorAll('.custom-links .nav-link');

  const navbarlinksActive = () => {
    const position = window.scrollY + 200; 
    navbarLinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      const section = document.querySelector(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position < (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };

  
  window.addEventListener('scroll', navbarlinksActive, { passive: true });
  window.addEventListener('load', navbarlinksActive);


  navbarLinks.forEach(navbarlink => {
    if (!navbarlink.hash) return;
    navbarlink.addEventListener('click', e => {
      e.preventDefault();
      const section = document.querySelector(navbarlink.hash);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // DARK MODE
  
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.checked = true;
  }

  toggleButton.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) { 
      localStorage.setItem('theme', 'dark');
    } else {
       localStorage.setItem('theme', 'light'); 
      } 
    });

})();




// DELETE
// deleteProduct("817f");
// deleteProduct("d483");

// POST
// addProduct({
//   title: "Noul Produs",
//   price: 199.99,
//   image: "https://example.com/nou_produs.jpg",
//   description: "Descrierea noului produs."
// });

// PUT
// updateProduct("817f", {
//   title: "Produs Actualizat",
//   price: 149.99,
//   image: "https://example.com/produs_actualizat.jpg",
//   description: "Descrierea produsului actualizat."
// });

// PATCH
// patchProduct("d483", {
//   price: 129.99
// });

// GET
// getProducts().then(products => console.log(products));

// patchProduct("5c8a", {
//   price: 
// });

