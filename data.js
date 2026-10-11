/**
 * RA Achadinhos - Catálogo de Produtos
 * 
 * Esta camada gerencia os dados de produtos e categorias.
 * Estrutura preparada para integração com APIs de proveedores.
 * Dados atualmente em formato de demonstração.
 */

const CATEGORIES = [
  {
    id: 1,
    name: 'Eletrônicos',
    slug: 'eletronicos',
    description: 'Aparelhos e gadgets para o dia a dia.',
    icon: '📱'
  },
  {
    id: 2,
    name: 'Informática e Acessórios',
    slug: 'informatica-e-acessorios',
    description: 'Periféricos e acessórios digitais.',
    icon: '⌨️'
  },
  {
    id: 3,
    name: 'Games',
    slug: 'games',
    description: 'Acessórios e itens para gamers.',
    icon: '🎮'
  },
  {
    id: 4,
    name: 'Casa e Organização',
    slug: 'casa-e-organizacao',
    description: 'Organização e conforto para casa.',
    icon: '🏠'
  },
  {
    id: 5,
    name: 'Cozinha',
    slug: 'cozinha',
    description: 'Itens para praticidade culinária.',
    icon: '🍳'
  },
  {
    id: 6,
    name: 'Beleza e Cuidados',
    slug: 'beleza-e-cuidados-pessoais',
    description: 'Higiene e autocuidado.',
    icon: '💄'
  },
  {
    id: 7,
    name: 'Moda e Acessórios',
    slug: 'moda-e-acessorios',
    description: 'Itens para estilo pessoal.',
    icon: '👜'
  },
  {
    id: 8,
    name: 'Esportes',
    slug: 'esportes',
    description: 'Itens para treino e atividade.',
    icon: '🏋️'
  },
  {
    id: 9,
    name: 'Ferramentas',
    slug: 'ferramentas',
    description: 'Ferramentas práticas.',
    icon: '🔧'
  },
  {
    id: 10,
    name: 'Celular e Acessórios',
    slug: 'acessorios-para-celular',
    description: 'Acessórios para smartphones.',
    icon: '📞'
  }
];

const PRODUCTS = [
  {
    id: 1,
    slug: 'mini-alto-falante-bluetooth-ra-audio',
    title: 'Mini Alto-Falante Bluetooth Portátil',
    description: 'Som claro e imersivo, bateria de longa duração. Perfeito para levar em viagens.',
    brand: 'RA Audio',
    category: 'eletronicos',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=60',
    price: 129.90,
    previousPrice: 189.90,
    discount: 32,
    store: 'Shopee',
    rating: 4.7,
    ratingCount: 2341,
    affiliate_url: 'https://shopee.com.br/product/demo-1',
    affiliateUrl: 'https://shopee.com.br/product/demo-1',
    availability: 'em_estoque',
    tags: ['nova', 'promocao'],
    featured: true,
    created_at: '2026-10-10T15:30:00Z'
  },
  {
    id: 2,
    slug: 'teclado-sem-fio-mecanico-ra-key',
    title: 'Teclado Sem Fio Mecânico RGB',
    description: 'Teclas responsivas, confortável para digitação prolongada. Design moderno com iluminação.',
    brand: 'RA Key',
    category: 'informatica-e-acessorios',
    image: 'https://images.unsplash.com/photo-1587829191301-5b5d7a5b7c5d?auto=format&fit=crop&w=500&q=60',
    price: 249.90,
    previousPrice: 349.90,
    discount: 28,
    store: 'Shopee',
    rating: 4.8,
    ratingCount: 1876,
    affiliate_url: 'https://shopee.com.br/product/demo-2',
    affiliateUrl: 'https://shopee.com.br/product/demo-2',
    availability: 'em_estoque',
    tags: ['destaque', 'promocao'],
    featured: true,
    created_at: '2026-10-10T14:20:00Z'
  },
  {
    id: 3,
    slug: 'controle-sem-fio-gamer-playra',
    title: 'Controle Sem Fio para Console',
    description: 'Resposta rápida, boa ergonomia. Compatível com múltiplas plataformas.',
    brand: 'PlayRA',
    category: 'games',
    image: 'https://images.unsplash.com/photo-1541807227589-0f2fcbe007ad?auto=format&fit=crop&w=500&q=60',
    price: 199.90,
    previousPrice: 249.90,
    discount: 20,
    store: 'Shopee',
    rating: 4.6,
    ratingCount: 1543,
    affiliate_url: 'https://shopee.com.br/product/demo-3',
    affiliateUrl: 'https://shopee.com.br/product/demo-3',
    availability: 'em_estoque',
    tags: ['novo', 'destaque'],
    featured: true,
    created_at: '2026-10-09T10:45:00Z'
  },
  {
    id: 4,
    slug: 'organizador-escova-banheiro-casa-ra',
    title: 'Organizador de Escova para Banheiro',
    description: 'Estrutura prática e elegante. Mantém tudo organizado e acessível.',
    brand: 'Casa RA',
    category: 'casa-e-organizacao',
    image: 'https://images.unsplash.com/photo-1578022749652-0f3fc6267435?auto=format&fit=crop&w=500&q=60',
    price: 89.90,
    previousPrice: 139.90,
    discount: 36,
    store: 'Shopee',
    rating: 4.5,
    ratingCount: 892,
    affiliate_url: 'https://shopee.com.br/product/demo-4',
    affiliateUrl: 'https://shopee.com.br/product/demo-4',
    availability: 'em_estoque',
    tags: ['promocao'],
    featured: false,
    created_at: '2026-10-08T16:15:00Z'
  },
  {
    id: 5,
    slug: 'kit-jarra-copos-vidro-ra-home',
    title: 'Kit Jarra e Copos de Vidro Premium',
    description: 'Aparência sofisticada. Ideal para mesas de jantar e eventos.',
    brand: 'RA Home',
    category: 'cozinha',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=500&q=60',
    price: 159.90,
    previousPrice: 219.90,
    discount: 27,
    store: 'Shopee',
    rating: 4.9,
    ratingCount: 3102,
    affiliate_url: 'https://shopee.com.br/product/demo-5',
    affiliateUrl: 'https://shopee.com.br/product/demo-5',
    availability: 'em_estoque',
    tags: ['novo', 'destaque', 'promocao'],
    featured: true,
    created_at: '2026-10-07T12:00:00Z'
  },
  {
    id: 6,
    slug: 'kit-cuidados-pele-glow-ra',
    title: 'Kit de Cuidados com a Pele Premium',
    description: 'Hidratação leve e eficaz. Indicado para todos os tipos de pele.',
    brand: 'Glow RA',
    category: 'beleza-e-cuidados-pessoais',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=60',
    price: 139.90,
    previousPrice: 185.90,
    discount: 25,
    store: 'Shopee',
    rating: 4.7,
    ratingCount: 2156,
    affiliate_url: 'https://shopee.com.br/product/demo-6',
    affiliateUrl: 'https://shopee.com.br/product/demo-6',
    availability: 'em_estoque',
    tags: ['promocao'],
    featured: false,
    created_at: '2026-10-06T09:30:00Z'
  },
  {
    id: 7,
    slug: 'mochila-urbana-leve-tra-style',
    title: 'Mochila Urbana Leve com Compartimentos',
    description: 'Compartimentos práticos e inteligentes. Ideal para dia a dia.',
    brand: 'TRA Style',
    category: 'moda-e-acessorios',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=60',
    price: 169.90,
    previousPrice: 219.90,
    discount: 23,
    store: 'Shopee',
    rating: 4.6,
    ratingCount: 1234,
    affiliate_url: 'https://shopee.com.br/product/demo-7',
    affiliateUrl: 'https://shopee.com.br/product/demo-7',
    availability: 'em_estoque',
    tags: ['novo', 'destaque'],
    featured: true,
    created_at: '2026-10-05T11:20:00Z'
  },
  {
    id: 8,
    slug: 'garrafa-termica-esportiva-fitra',
    title: 'Garrafa Térmica Esportiva 750ml',
    description: 'Ideal para treinos e esportes. Mantém bebidas quentes ou frias por horas.',
    brand: 'FitRA',
    category: 'esportes',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=500&q=60',
    price: 89.90,
    previousPrice: 129.90,
    discount: 31,
    store: 'Shopee',
    rating: 4.8,
    ratingCount: 2789,
    affiliate_url: 'https://shopee.com.br/product/demo-8',
    affiliateUrl: 'https://shopee.com.br/product/demo-8',
    availability: 'em_estoque',
    tags: ['promocao', 'destaque'],
    featured: true,
    created_at: '2026-10-04T14:45:00Z'
  },
  {
    id: 9,
    slug: 'kit-chaves-ferramentas-buildra',
    title: 'Kit de Chaves e Ferramentas 50 Peças',
    description: 'Para pequenos reparos e manutenção. Completo e profissional.',
    brand: 'BuildRA',
    category: 'ferramentas',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=60',
    price: 219.90,
    previousPrice: 299.90,
    discount: 27,
    store: 'Shopee',
    rating: 4.9,
    ratingCount: 1876,
    affiliate_url: 'https://shopee.com.br/product/demo-9',
    affiliateUrl: 'https://shopee.com.br/product/demo-9',
    availability: 'em_estoque',
    tags: ['novo', 'destaque'],
    featured: true,
    created_at: '2026-10-03T10:00:00Z'
  },
  {
    id: 10,
    slug: 'pelicula-protetora-celular-cellra',
    title: 'Película Protetora para Celular - Vidro Temperado',
    description: 'Transparência alta, resistência máxima. Proteção completa da tela.',
    brand: 'CellRA',
    category: 'acessorios-para-celular',
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?auto=format&fit=crop&w=500&q=60',
    price: 39.90,
    previousPrice: 79.90,
    discount: 50,
    store: 'Shopee',
    rating: 4.7,
    ratingCount: 5234,
    affiliate_url: 'https://shopee.com.br/product/demo-10',
    affiliateUrl: 'https://shopee.com.br/product/demo-10',
    availability: 'em_estoque',
    tags: ['promocao', 'popular'],
    featured: false,
    created_at: '2026-10-02T13:25:00Z'
  },
  // Produtos adicionais para enriquecer o catálogo
  {
    id: 11,
    slug: 'carregador-rapido-ra-power',
    title: 'Carregador Rápido USB-C 65W',
    description: 'Carregamento ultra-rápido. Compatível com vários dispositivos.',
    brand: 'RA Power',
    category: 'eletronicos',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=500&q=60',
    price: 119.90,
    previousPrice: 159.90,
    discount: 25,
    store: 'Shopee',
    rating: 4.8,
    ratingCount: 3421,
    affiliate_url: 'https://shopee.com.br/product/demo-11',
    affiliateUrl: 'https://shopee.com.br/product/demo-11',
    availability: 'em_estoque',
    tags: ['novo', 'promocao'],
    featured: false,
    created_at: '2026-10-01T08:15:00Z'
  },
  {
    id: 12,
    slug: 'mouse-gamer-rgb-fitra',
    title: 'Mouse Gamer RGB com 7 Botões',
    description: 'Sensor de alta precisão. Iluminação RGB configurável.',
    brand: 'FitRA',
    category: 'games',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=60',
    price: 179.90,
    previousPrice: 249.90,
    discount: 28,
    store: 'Shopee',
    rating: 4.9,
    ratingCount: 2654,
    affiliate_url: 'https://shopee.com.br/product/demo-12',
    affiliateUrl: 'https://shopee.com.br/product/demo-12',
    availability: 'em_estoque',
    tags: ['novo', 'destaque'],
    featured: true,
    created_at: '2026-09-30T16:40:00Z'
  },
  {
    id: 13,
    slug: 'luminaria-inteligente-casa-ra',
    title: 'Luminária LED Inteligente Colorida',
    description: 'Controle por app. 16 milhões de cores.',
    brand: 'Casa RA',
    category: 'casa-e-organizacao',
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?auto=format&fit=crop&w=500&q=60',
    price: 149.90,
    previousPrice: 199.90,
    discount: 25,
    store: 'Shopee',
    rating: 4.6,
    ratingCount: 1987,
    affiliate_url: 'https://shopee.com.br/product/demo-13',
    affiliateUrl: 'https://shopee.com.br/product/demo-13',
    availability: 'em_estoque',
    tags: ['novo'],
    featured: false,
    created_at: '2026-09-29T12:50:00Z'
  },
  {
    id: 14,
    slug: 'espuma-limpeza-cozinha-ra-clean',
    title: 'Esponjas de Limpeza Premium - 5 Un',
    description: 'Durabilidade superior. Não risca superfícies.',
    brand: 'RA Clean',
    category: 'cozinha',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=500&q=60',
    price: 29.90,
    previousPrice: 49.90,
    discount: 40,
    store: 'Shopee',
    rating: 4.7,
    ratingCount: 8932,
    affiliate_url: 'https://shopee.com.br/product/demo-14',
    affiliateUrl: 'https://shopee.com.br/product/demo-14',
    availability: 'em_estoque',
    tags: ['promocao', 'popular'],
    featured: false,
    created_at: '2026-09-28T09:20:00Z'
  },
  {
    id: 15,
    slug: 'almofada-ergonomica-cervical-comfort',
    title: 'Almofada Ergonômica para Pescoço',
    description: 'Reduz tensão cervical. Material hipoalergênico.',
    brand: 'Comfort RA',
    category: 'casa-e-organizacao',
    image: 'https://images.unsplash.com/photo-1584622281867-8d4c3e4e7b8a?auto=format&fit=crop&w=500&q=60',
    price: 99.90,
    previousPrice: 149.90,
    discount: 33,
    store: 'Shopee',
    rating: 4.8,
    ratingCount: 3456,
    affiliate_url: 'https://shopee.com.br/product/demo-15',
    affiliateUrl: 'https://shopee.com.br/product/demo-15',
    availability: 'em_estoque',
    tags: ['promocao'],
    featured: false,
    created_at: '2026-09-27T15:30:00Z'
  }
];

/**
 * Funções utilitárias de dados
 */

function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

function getCategoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug);
}

function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === Number(id));
}

/**
 * Normaliza strings para busca (remove acentos, espaços extras, etc)
 */
function normalizeString(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Busca produtos por query, categoria, preço e ordenação
 */
function searchProducts(options = {}) {
  const {
    query = '',
    category = '',
    minPrice = 0,
    maxPrice = Infinity,
    sortBy = 'relevance',
    limit = 100,
    offset = 0,
    onlyFeatured = false
  } = options;

  let results = [...PRODUCTS];

  // Filtrar por query
  if (query) {
    const normalizedQuery = normalizeString(query);
    results = results.filter(p =>
      normalizeString(p.title).includes(normalizedQuery) ||
      normalizeString(p.description).includes(normalizedQuery) ||
      normalizeString(p.brand || '').includes(normalizedQuery) ||
      normalizeString(p.category || '').includes(normalizedQuery)
    );
  }

  // Filtrar por categoria
  if (category) {
    const normalizedCategory = normalizeString(category);
    results = results.filter(p =>
      normalizeString(p.category).includes(normalizedCategory) ||
      p.category === category
    );
  }

  // Filtrar por faixa de preço
  results = results.filter(p => p.price >= minPrice && p.price <= maxPrice);

  // Filtrar por destaque
  if (onlyFeatured) {
    results = results.filter(p => p.featured === true);
  }

  // Ordenação
  switch (sortBy) {
    case 'lowest_price':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'highest_price':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'rating':
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'most_popular':
      results.sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0));
      break;
    case 'relevance':
    default:
      // Se houver query, ordenar por relevância (featured primeiro)
      if (query) {
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.ratingCount || 0) - (a.ratingCount || 0);
        });
      }
      break;
  }

  // Paginação
  const total = results.length;
  const paginatedResults = results.slice(offset, offset + limit);

  return {
    data: paginatedResults,
    total,
    page: Math.floor(offset / limit) + 1,
    perPage: limit,
    totalPages: Math.ceil(total / limit)
  };
}

/**
 * Obter sugestões de busca
 */
function getSearchSuggestions(query = '', limit = 8) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalized = normalizeString(query);
  const suggestions = new Set();

  // Coletar sugestões de títulos
  PRODUCTS.forEach(p => {
    if (normalizeString(p.title).includes(normalized)) {
      suggestions.add(p.title);
    }
  });

  // Coletar sugestões de marcas
  PRODUCTS.forEach(p => {
    if (normalizeString(p.brand).includes(normalized)) {
      suggestions.add(p.brand);
    }
  });

  // Coletar sugestões de categorias
  CATEGORIES.forEach(c => {
    if (normalizeString(c.name).includes(normalized)) {
      suggestions.add(c.name);
    }
  });

  return Array.from(suggestions).slice(0, limit);
}

/**
 * Obter produtos relacionados
 */
function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];

  return PRODUCTS
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

/**
 * Obter produtos em destaque
 */
function getFeaturedProducts(limit = 8) {
  return PRODUCTS
    .filter(p => p.featured === true)
    .slice(0, limit);
}

/**
 * Obter produtos com maior desconto
 */
function getTopDiscountedProducts(limit = 6) {
  return PRODUCTS
    .filter(p => p.discount && p.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, limit);
}

/**
 * Obter produtos mais avaliados
 */
function getTopRatedProducts(limit = 6) {
  return PRODUCTS
    .filter(p => p.rating && p.ratingCount && p.ratingCount > 10)
    .sort((a, b) => {
      const scoreA = (a.rating || 0) * (a.ratingCount || 0);
      const scoreB = (b.rating || 0) * (b.ratingCount || 0);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/**
 * Obter estatísticas do catálogo
 */
function getCatalogStats() {
  const totalProducts = PRODUCTS.length;
  const totalCategories = CATEGORIES.length;
  const avgPrice = PRODUCTS.reduce((sum, p) => sum + p.price, 0) / totalProducts;
  const minPrice = Math.min(...PRODUCTS.map(p => p.price));
  const maxPrice = Math.max(...PRODUCTS.map(p => p.price));
  const productsWithDiscount = PRODUCTS.filter(p => p.discount > 0).length;
  const avgDiscount = PRODUCTS
    .filter(p => p.discount > 0)
    .reduce((sum, p) => sum + p.discount, 0) / (productsWithDiscount || 1);

  return {
    totalProducts,
    totalCategories,
    avgPrice: parseFloat(avgPrice.toFixed(2)),
    minPrice,
    maxPrice,
    productsWithDiscount,
    avgDiscount: parseFloat(avgDiscount.toFixed(2))
  };
}
