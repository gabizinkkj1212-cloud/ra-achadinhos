const favoritesKey = 'ra-achadinhos-favorites';
const favoriteButtons = document.querySelectorAll('.favorite-toggle');

favoriteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = Number(button.dataset.productId || 0);
    const current = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    const next = current.some((item) => Number(item.id) === productId)
      ? current.filter((item) => Number(item.id) !== productId)
      : [...current, { id: productId }];

    localStorage.setItem(favoritesKey, JSON.stringify(next));
    button.textContent = next.some((item) => Number(item.id) === productId) ? 'Favoritado' : 'Adicionar aos favoritos';
  });
});
