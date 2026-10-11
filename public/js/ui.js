const productCardTemplate = (product) => `
  <article class="product-card" data-product-id="${product.id}">
    <div class="product-card__image-wrap">
      <img src="${product.main_image_url}" alt="${product.title}" loading="lazy" />
      <button class="favorite-toggle" data-product-id="${product.id}" aria-label="Adicionar aos favoritos">♡</button>
    </div>
    <div class="product-card__body">
      <span class="tag tag--muted">${product.store || 'Loja'}</span>
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <div class="product-card__meta">
        <span class="price">R$ ${Number(product.price || 0).toFixed(2).replace('.', ',')}</span>
        <span class="discount">-${product.discount_percent || 0}%</span>
      </div>
      <div class="product-card__actions">
        <a href="/produto?slug=${product.slug}" class="button button--secondary">Ver detalhes</a>
        <a href="/go/${product.id}" class="button button--primary" data-go-link="${product.id}">Ver na loja</a>
      </div>
    </div>
  </article>
`;

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0));
}

export function renderProductCard(product) {
  return productCardTemplate(product);
}

export function renderEmptyState(message = 'Nenhum produto encontrado.') {
  return `
    <div class="empty-state">
      <h3>Sem resultados</h3>
      <p>${message}</p>
    </div>
  `;
}

export function renderCategoryPill(category) {
  return `
    <a href="/categorias?slug=${category.slug}" class="category-pill">
      <span>${category.name}</span>
    </a>
  `;
}

export function renderPriceRangeLabel(product) {
  if (!product.previous_price || Number(product.previous_price) <= Number(product.price)) {
    return 'Oferta especial';
  }
  return `${Math.round(((Number(product.previous_price) - Number(product.price)) / Number(product.previous_price)) * 100)}% de desconto`;
}
