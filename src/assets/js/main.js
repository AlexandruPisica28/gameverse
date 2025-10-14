import "/src/assets/scss/main.scss"; 
import "./generateProduct.js";
import "./generateHardware.js";
import "./Footer.js"

(function() {
  "use strict";



// ========================
// PRODUCTS JS
// ========================

// Containerul unde se vor afișa cardurile
const productsContainer = document.getElementById("products-container");

// 1️⃣ GET: citim produsele din JSON local
async function fetchProducts() {
  try {
    const response = await fetch("/assets/data/products.json"); // ajustează calea dacă e nevoie
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Eroare la încărcarea produselor:", error);
  }
}

// 2️⃣ Funcție pentru afișarea produselor în HTML
function displayProducts(products) {
  productsContainer.innerHTML = ""; // curățăm containerul

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("col-sm-6", "col-md-4", "col-lg-3");

    card.innerHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}" class="product-img">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price}</p>
        <a href="#" class="btn custom-btn">Vezi detalii</a>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

// 3️⃣ POST: adaugă un produs nou în memorie (simulat)
function addProduct(product) {
  fetchProducts().then(products => {
    products.push(product);
    displayProducts(products);
  });
}

// 4️⃣ PUT: modifică un produs existent (simulat)
function updateProduct(id, newData) {
  fetchProducts().then(products => {
    const index = products.findIndex(p => p.id === id);
    if (index > -1) {
      products[index] = { ...products[index], ...newData };
      displayProducts(products);
    }
  });
}

// 5️⃣ DELETE: șterge un produs (simulat)
function deleteProduct(id) {
  fetchProducts().then(products => {
    const filtered = products.filter(p => p.id !== id);
    displayProducts(filtered);
  });
}

// 🔹 Inițializare
fetchProducts();





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
  let position = window.scrollY + 200; // offset pentru header fix
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
        top: section.offsetTop - 80, // ajustează offset-ul după înălțimea navbarului
        behavior: 'smooth'
      });
    }
  });
});


// Coș simplu cu localStorage
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = {
      id: button.dataset.id,
      title: button.dataset.title,
      price: parseFloat(button.dataset.price)
    };

    // Ia coșul existent din localStorage sau creează unul nou
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adaugă produsul în coș
    cart.push(product);

    // Salvează în localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mesaj rapid
    alert(`${product.title} a fost adăugat în coș!`);
  });
});


// ========================
// Dark mode toggle
// ========================


 



  // ========================
// Validare formular
// ========================

  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

})()