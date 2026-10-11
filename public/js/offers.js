import { getCategories, getProducts, searchProducts } from './api.js';
import { renderProductCard, renderEmptyState } from './ui.js';

const params = new URLSearchParams(window.location.search);
const productGrid = document.querySelector('[data-offer-grid]');
const summaryText = document.querySelector('[data-offers-summary]');
const categoryFilter = document.querySelector('[data-filter-category]');
const priceRange = document.querySelector('[data-filter-price]');
const storeFilter = document.querySelector('[data-filter-store]');
const sortFilter = document.querySelector('[data-filter-sort]');
const searchInput = document.querySelector('[data-offers-search]');
const q = params.get('q') || '';

const render = (products) => {
  if (!productGrid) return;
  if (!products.length) {
    productGrid.innerHTML = renderEmptyState('Nenhuma oferta encontrada com os filtros atuais.');
    return;
  }

  productGrid.innerHTML = products.map((product) => renderProductCard(product)).join('');
};

const loadOffers = async () => {
  try {
    const categories = await getCategories();
    if (categoryFilter) {
      categoryFilter.innerHTML = `<option value="">Todas as categorias</option>${categories.map((category) => `<option value="${category.slug}">${category.name}</option>`).join('')}`;
      const selected = params.get('category');
      if (selected) categoryFilter.value = selected;
    }

    const response = await getProducts({
      q,
      category: params.get('category') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      store: params.get('store') || '',
      sort: params.get('sort') || 'relevance',
      page: 1,
      limit: 12
    });

    render(response.data || []);
    if (summaryText) {
      summaryText.textContent = `${response.total || 0} ofertas encontradas`;
    }
  } catch (error) {
    if (productGrid) {
      productGrid.innerHTML = renderEmptyState(error.message || 'Não foi possível carregar as ofertas.');
    }
  }
};

const updateFilters = () => {
  const next = new URLSearchParams();
  if (searchInput && searchInput.value) next.set('q', searchInput.value);
  if (categoryFilter && categoryFilter.value) next.set('category', categoryFilter.value);
  if (priceRange && priceRange.value) next.set('maxPrice', priceRange.value);
  if (storeFilter && storeFilter.value) next.set('store', storeFilter.value);
  if (sortFilter && sortFilter.value) next.set('sort', sortFilter.value);
  window.history.replaceState({}, '', `${window.location.pathname}?${next.toString()}`);
  loadOffers();
};

searchInput?.addEventListener('input', async () => {
  if (searchInput.value.length < 2) return;
  const results = await searchProducts(searchInput.value);
  render(results.data || []);
});

categoryFilter?.addEventListener('change', updateFilters);
priceRange?.addEventListener('change', updateFilters);
storeFilter?.addEventListener('change', updateFilters);
sortFilter?.addEventListener('change', updateFilters);

if (searchInput) searchInput.value = q;

loadOffers();
