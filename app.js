document.addEventListener('DOMContentLoaded', () => {
  const categoryList = document.getElementById('categoryList');
  const productGrid = document.getElementById('productGrid');
  const headerSearchBtn = document.getElementById('headerSearchBtn');
  const headerSearch = document.getElementById('headerSearch');

  if (categoryList) {
    categoryList.innerHTML = CATEGORIES
      .map(cat => `<a href="./ofertas.html?category=${cat.slug}" class="category-link">${cat.name}</a>`)
      .join('');
  }

  if (productGrid) {
    productGrid.innerHTML = PRODUCTS.slice(0, 8).map(renderProductCard).join('');
  }

  headerSearchBtn?.addEventListener('click', () => {
    const query = headerSearch?.value || '';
    if (query.trim()) {
      window.location.href = `./ofertas.html?q=${encodeURIComponent(query)}`;
    }
  });

  headerSearch?.addEventListener('keydown', e => {
    if (e.key === 'Enter') headerSearchBtn?.click();
  });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('favorite-toggle')) {
      e.preventDefault();
      toggleFavorite(Number(e.target.dataset.productId));
    }
  });

  updateFavoriteButtons();
});
