// === Funcție care actualizează suma totală din coș ===
function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cart-count').textContent = total.toFixed(2);
}

// === Fetch produse ===
fetch('http://localhost:4000/hardware')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('hardware-container');

    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');

      card.innerHTML = `
        <div class="product-card">
          <img src="${item.image}" alt="${item.title}" class="product-img">
          <h3 class="product-title">${item.title}</h3>
          <p class="product-price">$${item.price}</p>
          <div class="d-flex justify-content-between align-items-center">
            <a href="#" class="btn custom-btn see-details">Vezi detalii</a>
            <button class="btn custom-btn add-to-cart"
              data-id="${item.id}"
              data-title="${item.title}"
              data-price="${item.price}">
              Adaugă în coș
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // === Butoane "Adaugă în coș" ===
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const product = {
          id: btn.dataset.id,
          title: btn.dataset.title,
          price: parseFloat(btn.dataset.price)
        };

        // Salvăm în localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        // Actualizăm totalul
        updateCartTotal();

        // Mic feedback
        alert(`${product.title} a fost adăugat în coș!`);
      });
    });

    // === Butoane "Vezi detalii" ===
const detailButtons = document.querySelectorAll('.see-details');
detailButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const title = btn.closest('.product-card').querySelector('.product-title').textContent;
    const price = btn.closest('.product-card').querySelector('.product-price').textContent;
    alert(`${title}\n${price}\nDetaliile complete vor fi disponibile în curând!`);
  }, { once: true }); 
});


    // === Afișăm totalul la încărcarea paginii ===
    updateCartTotal();

    // ===============================
// 🛒 Cart System with LocalStorage
// ===============================

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();

// Event delegation for "Adaugă în coș" buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    e.preventDefault();

    const id = e.target.dataset.id;
    const title = e.target.dataset.title;
    const price = parseFloat(e.target.dataset.price);

    cart.push({ id, title, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }
});

// Reset cart button
document.getElementById('reset-cart').addEventListener('click', () => {
  cart = [];
  localStorage.removeItem('cart');
  updateCartDisplay();
});

// Update cart count + total price
function updateCartDisplay() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cart-count').textContent = total.toFixed(2);
}

  })
  .catch(err => console.error(err));
  
