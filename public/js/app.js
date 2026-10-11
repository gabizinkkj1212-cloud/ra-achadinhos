import { getProducts, searchProducts, getCategories, getProductBySlug, registerClick } from './api.js';
import { renderProductCard, renderEmptyState } from './ui.js';

const searchInput = document.querySelector('[data-search-input]');
const searchButton = document.querySelector('[data-search-button]');
const resultContainer = document.querySelector('[data-product-grid]');
const categoryList = document.querySelector('[data-category-list]');
const heroSearch = document.querySelector('[data-hero-search]');

const renderProducts = (products) => {
  if (!resultContainer) return;
  if (!products || !products.length) {
    resultContainer.innerHTML = renderEmptyState('Ainda não há produtos disponíveis para esta busca.');
    return;
  }
  resultContainer.innerHTML = products.map((product) => renderProductCard(product)).join('');
};

const loadHomepage = async () => {
  try {
    const response = await getProducts({ limit: 8 });
    renderProducts(response.data || []);

    const categories = await getCategories();
    if (categoryList) {
      categoryList.innerHTML = categories.map((category) => `
        <a href="/categorias?slug=${category.slug}" class="category-link">${category.name}</a>
      `).join('');
    }
  } catch (error) {
    if (resultContainer) {
      resultContainer.innerHTML = renderEmptyState(error.message || 'Não foi possível carregar os produtos neste momento.');
    }
  }
};

const handleSearch = async () => {
  const keyword = (searchInput?.value || heroSearch?.value || '').trim();
  if (!keyword) {
    loadHomepage();
    return;
  }

  try {
    const response = await searchProducts(keyword);
    renderProducts(response.data || []);
  } catch (error) {
    if (resultContainer) {
      resultContainer.innerHTML = renderEmptyState(error.message || 'Erro ao pesquisar.');
    }
  }
};

searchButton?.addEventListener('click', handleSearch);
searchInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') handleSearch();
});
heroSearch?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const query = heroSearch.value.trim();
    if (query) {
      window.location.href = `/ofertas?q=${encodeURIComponent(query)}`;
    }
  }
});

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-go-link]');
  if (!button) return;
  event.preventDefault();
  const productId = button.dataset.goLink;
  try {
    await registerClick({ productId, source: 'site', medium: 'web', campaign: 'home' });
    window.location.href = `/go/${productId}`;
  } catch (error) {
    console.warn(error);
    window.location.href = `/go/${productId}`;
  }
});

loadHomepage();
