const API_URL = 'http://localhost:4000/products';


// GET
async function getProducts() {
  const res = await fetch(API_URL);
  return await res.json();
}

// POST
async function addProduct(product) {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  return res.json();
}

// PUT
async function updateProduct(id, newData) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  });
  return res.json();
}

// PATCH
async function patchProduct(id, data) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// DELETE
async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

function displayProducts(products) {
  const productsContainer = document.getElementById("products-container");
  if (!productsContainer) {
    console.warn("Containerul 'products-container' nu există în pagină.");
    return;
  }

  productsContainer.innerHTML = ""; 

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("col-sm-6", "col-md-4", "col-lg-3");

    card.innerHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}" class="product-img">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price}</p>
        <div class="d-flex justify-content-between align-items-center">
          <a href="#" class="btn custom-btn see-details">Vezi detalii</a>
          <button class="btn custom-btn add-to-cart"
            data-id="${product.id}"
            data-title="${product.title}"
            data-price="${product.price}">
            Adaugă în coș
          </button>
        </div>
      </div>
    `;

    productsContainer.appendChild(card);
    
  });

  

  // Event pentru butonul Vezi Detalii
  const detailButtons = document.querySelectorAll('.see-details');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.closest('.product-card').querySelector('.product-title').textContent;
      const price = btn.closest('.product-card').querySelector('.product-price').textContent;
      alert(`${title}\n${price}\nDetaliile complete vor fi disponibile în curând!`);
    });
  });
}


export { getProducts, addProduct, updateProduct, patchProduct, deleteProduct, displayProducts };




