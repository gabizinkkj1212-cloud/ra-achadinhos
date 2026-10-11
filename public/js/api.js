const API_BASE = '/api';

export async function fetchJson(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || 'Erro ao consultar a API.');
  }

  return response.json();
}

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetchJson(`/products${query ? `?${query}` : ''}`);
  return response;
}

export async function getCategories() {
  const response = await fetchJson('/categories');
  return response.data || [];
}

export async function searchProducts(query) {
  const response = await fetchJson(`/search?q=${encodeURIComponent(query)}`);
  return response;
}

export async function getProductBySlug(slug) {
  const response = await fetchJson(`/products/${encodeURIComponent(slug)}`);
  return response.data || response.product || null;
}

export async function getOffers(params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetchJson(`/offers${query ? `?${query}` : ''}`);
  return response;
}

export async function registerClick(payload) {
  return fetchJson('/events/click', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
