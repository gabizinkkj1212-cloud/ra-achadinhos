import { getProductBySlug } from './api.js';
import { formatCurrency, renderEmptyState } from './ui.js';

const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const productRoot = document.querySelector('[data-product-detail]');

const renderProduct = async () => {
  if (!productRoot) return;
  if (!slug) {
    productRoot.innerHTML = renderEmptyState('Produto não informado.');
    return;
  }

  try {
    const product = await getProductBySlug(slug);
    if (!product) {
      productRoot.innerHTML = renderEmptyState('Produto não encontrado.');
      return;
    }

    productRoot.innerHTML = `
      <div class="product-detail">
        <div class="product-detail__image">
          <img src="${product.main_image_url}" alt="${product.title}" />
        </div>
        <div class="product-detail__content">
          <span class="tag">${product.store || 'Shopee'}</span>
          <h1>${product.title}</h1>
          <p class="product-detail__brand">Marca: ${product.brand || 'Marca não informada'}</p>
          <p class="product-detail__description">${product.description}</p>
          <div class="product-detail__price-wrap">
            <span class="price-big">${formatCurrency(product.price)}</span>
            ${product.previous_price ? `<span class="price-before">${formatCurrency(product.previous_price)}</span>` : ''}
          </div>
          <div class="product-detail__actions">
            <a href="/go/${product.id}" class="button button--primary">Ver na loja</a>
            <button class="button button--secondary favorite-toggle" data-product-id="${product.id}">Adicionar aos favoritos</button>
          </div>
          <ul class="product-detail__meta">
            <li><strong>Categoria:</strong> ${product.category || 'Sem categoria'}</li>
            <li><strong>Disponibilidade:</strong> ${product.availability_status || 'Verifique na loja'}</li>
            <li><strong>Atualização:</strong> ${new Date(product.updated_at || product.created_at).toLocaleString('pt-BR')}</li>
          </ul>
        </div>
      </div>
    `;
  } catch (error) {
    productRoot.innerHTML = renderEmptyState(error.message || 'Não foi possível carregar o produto.');
  }
};

renderProduct();
