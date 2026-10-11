import { renderEmptyState, renderProductCard } from './ui.js';

const favoritesKey = 'ra-achadinhos-favorites';
const grid = document.querySelector('[data-favorites-grid]');

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(favoritesKey) || '[]');
  } catch {
    return [];
  }
};

const setFavorites = (items) => localStorage.setItem(favoritesKey, JSON.stringify(items));

const renderFavorites = () => {
  const favorites = getFavorites();
  if (!grid) return;
  if (!favorites.length) {
    grid.innerHTML = renderEmptyState('Você ainda não adicionou produtos aos favoritos.');
    return;
  }

  grid.innerHTML = favorites.map((product) => renderProductCard(product)).join('');
};

document.addEventListener('click', (event) => {
  const favoriteToggle = event.target.closest('.favorite-toggle');
  if (!favoriteToggle) return;

  const productId = Number(favoriteToggle.dataset.productId);
  const favorites = getFavorites();
  const exists = favorites.some((product) => Number(product.id) === productId);

  if (exists) {
    setFavorites(favorites.filter((product) => Number(product.id) !== productId));
  } else {
    const card = event.target.closest('.product-card');
    const product = card ? {
      id: productId,
      title: card.querySelector('h3')?.textContent || 'Produto',
      description: card.querySelector('p')?.textContent || '',
      price: Number(card.querySelector('.price')?.textContent.replace(/[R$\s.]/g, '').replace(',', '.') || 0),
      slug: card.querySelector('a')?.href || '#',
      main_image_url: card.querySelector('img')?.src || '',
      store: 'Shopee',
      discount_percent: 0
    } : null;

    if (product) {
      setFavorites([...favorites, product]);
    }
  }

  renderFavorites();
});

renderFavorites();
