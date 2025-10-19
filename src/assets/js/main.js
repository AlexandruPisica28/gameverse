import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";


import "/src/assets/scss/main.scss"; 
import "./generateProduct.js";
import "./generateHardware.js";

import { displayProducts } from "./generateProduct.js";
import "./validate.js";






(function() {
  "use strict";

// ========================
// NAVBAR COLLAPSE ON RESIZE
// ========================
  window.addEventListener("resize", () => {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (window.innerWidth > 991 && navbarCollapse.classList.contains("show")) {
    new bootstrap.Collapse(navbarCollapse).hide();
  }
});



// ========================
// PRODUCTS JS
// ========================


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

// === Afișează produsele în HTML ===
// function displayProducts(products) {
//   const container = document.getElementById("products-container");
//   if (!container) return; // dacă nu există containerul, ieșim

//   container.innerHTML = "";

//   products.forEach(product => {
//     const card = document.createElement("div");
//     card.classList.add("col-sm-6", "col-md-4", "col-lg-3");

//     card.innerHTML = `
//       <div class="product-card">
//         <img src="${product.image}" alt="${product.title}" class="product-img">
//         <h3 class="product-title">${product.title}</h3>
//         <p class="product-price">$${product.price}</p>
//          <a href="#" class="btn custom-btn see-details">Vezi detalii</a>
//         <button class="btn custom-btn add-to-cart"
//              data-id="${product.id}"
//               data-title="${product.title}"
//              data-price="${product.price}">
//              Adaugă în coș
//             </button>
//            </div>
//       </div>
//     `;

//     container.appendChild(card);
//   });
//    const detailButtons = document.querySelectorAll('.see-details');
//     detailButtons.forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         const title = btn.closest('.product-card').querySelector('.product-title').textContent;
//         const price = btn.closest('.product-card').querySelector('.product-price').textContent;
//         alert(`${title}\n${price}\nDetaliile complete vor fi disponibile în curând!`);
//       });
//     });
// }
// fetchProducts();


// function displayProducts(products) {
//   productsContainer.innerHTML = ""; 

//   products.forEach(product => {
//     const card = document.createElement("div");
//     card.classList.add("col-sm-6", "col-md-4", "col-lg-3");

//     card.innerHTML = `
//       <div class="product-card">
//         <img src="${product.image}" alt="${product.title}" class="product-img">
//         <h3 class="product-title">${product.title}</h3>
//         <p class="product-price">$${product.price}</p>
//         <div class="d-flex justify-content-between align-items-center">
//         <a href="#" class="btn custom-btn see-details">Vezi detalii</a>
//         <button class="btn custom-btn add-to-cart"
//               data-id="${product.id}"
//               data-title="${product.title}"
//               data-price="${product.price}">
//               Adaugă în coș
//             </button>
//             </div>
//       </div>
//     `;

//     productsContainer.appendChild(card);
//   });

    // const detailButtons = document.querySelectorAll('.see-details');
    // detailButtons.forEach(btn => {
    //   btn.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     const title = btn.closest('.product-card').querySelector('.product-title').textContent;
    //     const price = btn.closest('.product-card').querySelector('.product-price').textContent;
    //     alert(`${title}\n${price}\nDetaliile complete vor fi disponibile în curând!`);
    //   });
    // });
// }

// function addProduct(product) {
//   fetchProducts().then(products => {
//     products.push(product);
//     displayProducts(products);
//   });
// }

// function updateProduct(id, newData) {
//   fetchProducts().then(products => {
//     const index = products.findIndex(p => p.id === id);
//     if (index > -1) {
//       products[index] = { ...products[index], ...newData };
//       displayProducts(products);
//     }
//   });
// }

// function deleteProduct(id) {
//   fetchProducts().then(products => {
//     const filtered = products.filter(p => p.id !== id);
//     displayProducts(filtered);
//   });
// }






// ========================
// Functii helper
// ========================
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



// ========================
// Navbar active links
// ========================

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




// ========================
// Dark mode toggle
// ========================

const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// ✅ Verifică tema salvată anterior
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleButton.checked = true; // pentru checkbox
} 

// 🔛 Toggle dark mode la click
toggleButton.addEventListener('change', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});



})()



