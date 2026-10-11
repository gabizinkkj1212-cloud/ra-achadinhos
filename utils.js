function formatPrice(price) {
  return `R$ ${Number(price || 0).toFixed(2).replace('.', ',')}`;
}

function normalize(str) {
  return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-card__image-wrap">
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
        <button class="favorite-toggle" data-product-id="${product.id}" aria-label="Adicionar aos favoritos">♡</button>
      </div>
      <div class="product-card__body">
        <span class="tag tag--muted">${product.store || 'Loja'}</span>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="product-card__meta">
          <span class="price">${formatPrice(product.price)}</span>
          <span class="discount">-${product.discount || 0}%</span>
        </div>
        <div class="product-card__actions">
          <a href="./produto.html?slug=${product.slug}" class="button button--secondary">Ver detalhes</a>
          <a href="${product.affiliateUrl}" target="_blank" class="button button--primary">Ver na loja</a>
        </div>
      </div>
    </article>
  `;
}

function renderEmptyState(message = 'Nenhum produto encontrado.') {
  return `
    <div class="empty-state">
      <h3>Sem resultados</h3>
      <p>${message}</p>
    </div>
  `;
}

function searchProducts(query = '', category = '', sort = 'relevance') {
  let results = PRODUCTS;

  if (query) {
    const q = normalize(query);
    results = results.filter(p =>
      normalize(p.title).includes(q) ||
      normalize(p.description).includes(q) ||
      normalize(p.brand || '').includes(q) ||
      normalize(p.category || '').includes(q)
    );
  }

  if (category) {
    const c = normalize(category);
    results = results.filter(p => normalize(p.category).includes(c));
  }

  if (sort === 'lowest_price') results.sort((a, b) => a.price - b.price);
  if (sort === 'highest_price') results.sort((a, b) => b.price - a.price);

  return results;
}

function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

function getCategoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug);
}

function toggleFavorite(productId) {
  let favorites = JSON.parse(localStorage.getItem('ra-favorites') || '[]');
  const exists = favorites.some(id => id === productId);
  
  if (exists) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }
  
  localStorage.setItem('ra-favorites', JSON.stringify(favorites));
  updateFavoriteButtons();
}

function isFavorite(productId) {
  const favorites = JSON.parse(localStorage.getItem('ra-favorites') || '[]');
  return favorites.includes(productId);
}

function updateFavoriteButtons() {
  document.querySelectorAll('.favorite-toggle').forEach(btn => {
    const id = Number(btn.dataset.productId);
    btn.textContent = isFavorite(id) ? '♥' : '♡';
  });
}

function goToOffers() {
  const query = document.getElementById('heroSearch')?.value || '';
  if (query.trim()) {
    window.location.href = `./ofertas.html?q=${encodeURIComponent(query)}`;
  } else {
    window.location.href = './ofertas.html';
  }
}
