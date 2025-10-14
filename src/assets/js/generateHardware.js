// Hardware
fetch('/src/assets/data/products-hardware.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('hardware-container');
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('col-sm-6','col-md-4','col-lg-3');

      card.innerHTML = `
        <div class="product-card">
          <img src="${item.image}" alt="${item.title}" class="product-img">
          <h3 class="product-title">${item.title}</h3>
          <p class="product-price">$${item.price}</p>
          <div class="d-flex justify-content-between align-items-center">
            <a href="#" class="btn custom-btn">Vezi detalii</a>
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

    // Adaugă funcționalitate butonului după ce cardurile sunt create
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const product = {
          id: btn.dataset.id,
          title: btn.dataset.title,
          price: parseFloat(btn.dataset.price)
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${product.title} a fost adăugat în coș!`);
      });
    });
  })
  .catch(err => console.error(err));
