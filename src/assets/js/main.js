import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

import "/src/assets/scss/main.scss"; 
import "./generateProduct.js";
import "./generateHardware.js";

import { displayProducts, addProduct, updateProduct, deleteProduct, patchProduct } from "./generateProduct.js";
import "./validate.js";


(function() {
  "use strict";


// NAVBAR COLLPASE ON CLICK
const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
    bsCollapse.hide();
  });
});


// CLOSE MENU BUTTON
const closeMenuBtn = document.querySelector('.btn-close-menu');
if (closeMenuBtn && navbarCollapse) {
  closeMenuBtn.addEventListener('click', () => {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
    bsCollapse.hide();
  });
}




// FETCH PRODUCTS DIN JSON-SERVER
async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:4000/products");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Eroare la încărcarea produselor:", error);
  }

}
fetchProducts();


// SCROLL MAI FIN
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener);
};



// Navbar active links on scroll
 let navbarlinks = select('.custom-links .nav-link', true);

const navbarlinksActive = () => {
  let position = window.scrollY + 200; 
  navbarlinks.forEach(navbarlink => {
    if (!navbarlink.hash) return;
    let section = select(navbarlink.hash);
    if (!section) return;
    if (position >= section.offsetTop && position < (section.offsetTop + section.offsetHeight)) {
      navbarlink.classList.add('active');
    } else {
      navbarlink.classList.remove('active');
    }
  });
};

window.addEventListener('load', navbarlinksActive);
onscroll(document, navbarlinksActive);

navbarlinks.forEach(navbarlink => {
  if (!navbarlink.hash) return;
  navbarlink.addEventListener('click', e => {
    e.preventDefault();
    let section = select(navbarlink.hash);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});



// Dark mode toggle
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



})()




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

