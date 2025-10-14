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
          <a href="#" class="btn custom-btn">Vezi detalii</a>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error(err));
