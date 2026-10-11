import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { config } from './config.js';
import { categories, products, providers, automationRuns, demoSearchSuggestions } from './data/catalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');
const adminDir = path.join(__dirname, '..', 'admin');

const app = express();
app.disable('x-powered-by');

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: 'ra_sid',
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: config.env === 'production',
      maxAge: 1000 * 60 * 60 * 8
    }
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Muitas requisições vindas do mesmo cliente. Tente novamente em alguns minutos.' }
  })
);

const normalize = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const slugify = (value = '') =>
  normalize(value)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

const state = {
  categories: [...categories],
  products: [...products],
  providers: [...providers],
  automationRuns: [...automationRuns],
  clickEvents: [],
  adminUser: {
    username: config.adminUsername || 'admin',
    passwordHash: bcrypt.hashSync(config.adminPassword || 'ra-achadinhos-demo-admin', 10),
    role: 'admin'
  }
};

const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Autenticação necessária.' });
  }
  return next();
};

const toProductDTO = (product) => ({
  ...product,
  discount_percent: typeof product.discount_percent === 'number' ? product.discount_percent : 0,
  available: ['em_estoque', 'disponivel', 'available'].includes(product.availability_status) || !product.availability_status,
  price_display: `R$ ${Number(product.price || 0).toFixed(2).replace('.', ',')}`
});

const buildSearchResults = (q = '', filters = {}) => {
  const query = normalize(q);
  const filtered = state.products.filter((product) => {
    const matchesQuery =
      !query ||
      normalize(product.title).includes(query) ||
      normalize(product.description).includes(query) ||
      normalize(product.brand || '').includes(query) ||
      normalize(product.category || '').includes(query) ||
      normalize(product.title + ' ' + (product.brand || '')).includes(query);

    const matchesCategory =
      !filters.category ||
      normalize(product.category || '').includes(normalize(filters.category)) ||
      normalize(product.category || '') === normalize(filters.category);

    const matchesPrice =
      (!filters.minPrice || Number(product.price) >= Number(filters.minPrice)) &&
      (!filters.maxPrice || Number(product.price) <= Number(filters.maxPrice));

    const matchesStore = !filters.store || normalize(product.store || '').includes(normalize(filters.store));

    return matchesQuery && matchesCategory && matchesPrice && matchesStore;
  });

  const sorted = [...filtered].sort((a, b) => {
    const sort = filters.sort || 'relevance';
    if (sort === 'lowest_price') return Number(a.price) - Number(b.price);
    if (sort === 'highest_price') return Number(b.price) - Number(a.price);
    if (sort === 'newest') return new Date(b.created_at) - new Date(a.created_at);
    if (sort === 'most_accessed') return Number(b.clicks || 0) - Number(a.clicks || 0);
    return Number(b.popularity || 0) - Number(a.popularity || 0);
  });

  return sorted.map(toProductDTO);
};

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: config.appName,
    env: config.env,
    mode: config.databaseUrl ? 'database-configured' : 'demo-mode',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/categories', (req, res) => {
  res.json({
    data: state.categories,
    total: state.categories.length
  });
});

app.get('/api/categories/:slug/products', (req, res) => {
  const category = state.categories.find((entry) => normalize(entry.slug) === normalize(req.params.slug));
  if (!category) {
    return res.status(404).json({ error: 'Categoria não encontrada.' });
  }

  const results = buildSearchResults('', { category: category.slug });
  return res.json({
    category,
    data: results,
    total: results.length
  });
});

app.get('/api/products', (req, res) => {
  const { q = '', category, minPrice, maxPrice, store, sort, page = 1, limit = 12 } = req.query;
  const results = buildSearchResults(q, { category, minPrice, maxPrice, store, sort });
  const currentPage = Number(page) || 1;
  const pageSize = Number(limit) || 12;
  const start = (currentPage - 1) * pageSize;
  const data = results.slice(start, start + pageSize);

  res.json({
    data,
    total: results.length,
    page: currentPage,
    perPage: pageSize,
    totalPages: Math.max(1, Math.ceil(results.length / pageSize)),
    suggestions: demoSearchSuggestions
  });
});

app.get('/api/products/:slug', (req, res) => {
  const product = state.products.find((item) => normalize(item.slug) === normalize(req.params.slug));
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }

  const similar = state.products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4)
    .map(toProductDTO);

  return res.json({
    data: { ...toProductDTO(product), similar },
    product: { ...toProductDTO(product), similar }
  });
});

app.get('/api/search', (req, res) => {
  const q = String(req.query.q || '').trim();
  if (!q) {
    return res.json({ data: [], total: 0, suggestions: demoSearchSuggestions });
  }

  const results = buildSearchResults(q, { sort: 'relevance' });
  return res.json({
    q,
    data: results,
    total: results.length,
    suggestions: demoSearchSuggestions.filter((suggestion) => normalize(suggestion).includes(normalize(q))).slice(0, 5)
  });
});

app.get('/api/offers', (req, res) => {
  const results = buildSearchResults(String(req.query.q || ''), {
    category: req.query.category || '',
    minPrice: req.query.minPrice || '',
    maxPrice: req.query.maxPrice || '',
    store: req.query.store || '',
    sort: req.query.sort || 'relevance'
  });

  res.json({
    data: results,
    total: results.length,
    filters: {
      category: req.query.category || '',
      store: req.query.store || '',
      sort: req.query.sort || 'relevance'
    }
  });
});

app.post('/api/events/click', (req, res) => {
  const { productId, offerId, source, medium, campaign } = req.body || {};
  const product = state.products.find((item) => Number(item.id) === Number(productId || offerId));

  if (product) {
    product.clicks = Number(product.clicks || 0) + 1;
  }

  state.clickEvents.push({
    id: `${Date.now()}`,
    productId: productId || offerId || null,
    source: source || 'site',
    medium: medium || 'web',
    campaign: campaign || 'default',
    created_at: new Date().toISOString()
  });

  res.status(201).json({
    ok: true,
    message: 'Clique registrado.',
    clickId: state.clickEvents[state.clickEvents.length - 1].id
  });
});

app.get('/go/:offerId', (req, res) => {
  const id = Number(req.params.offerId);
  const product = state.products.find((item) => Number(item.id) === id);

  if (!product || !product.affiliate_url) {
    return res.status(404).send('<html><body><h1>Oferta inválida</h1><p>Este link de afiliado não está disponível no momento.</p></body></html>');
  }

  const url = new URL(product.affiliate_url);
  const hostname = url.hostname.toLowerCase();
  const allowed = config.allowedAffiliateDomains.map((domain) => domain.toLowerCase());
  const isAllowed = allowed.some((domain) => hostname === domain || hostname.endsWith('.' + domain));

  if (!isAllowed) {
    return res.status(400).send('<html><body><h1>Domínio bloqueado</h1><p>O link de destino não está autorizado.</p></body></html>');
  }

  res.redirect(302, product.affiliate_url);
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  const user = state.adminUser;
  const valid = username === user.username && bcrypt.compareSync(password, user.passwordHash);

  if (!valid) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  req.session.user = { username: user.username, role: user.role };
  return res.json({
    ok: true,
    user: req.session.user,
    message: 'Login realizado com sucesso.'
  });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true, message: 'Sessão encerrada.' });
  });
});

app.get('/api/admin/me', requireAuth, (req, res) => {
  res.json({ user: req.session.user });
});

app.get('/api/admin/products', requireAuth, (req, res) => {
  res.json({ data: state.products, total: state.products.length });
});

app.post('/api/admin/products', requireAuth, (req, res) => {
  const { title, description, brand, category, price, affiliate_url, main_image_url } = req.body || {};
  if (!title || !category || !price) {
    return res.status(400).json({ error: 'Título, categoria e preço são obrigatórios.' });
  }

  const product = {
    id: Date.now(),
    slug: slugify(title),
    title,
    description: description || 'Produto cadastrado no painel administrativo.',
    brand: brand || 'Marca não informada',
    category_id: Math.max(1, state.categories.findIndex((item) => normalize(item.slug) === normalize(category)) + 1 || 1),
    category: category,
    main_image_url: main_image_url || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    image_source: 'manual',
    status: 'published',
    price: Number(price),
    previous_price: Number(price),
    currency: 'BRL',
    discount_percent: 0,
    availability_status: 'em_estoque',
    store: 'Shopee',
    is_demo: true,
    provider_id: 1,
    affiliate_url: affiliate_url || 'https://shopee.com.br/demo-product',
    clicks: 0,
    views: 0,
    popularity: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  };

  state.products.unshift(product);
  return res.status(201).json({ ok: true, data: product });
});

app.patch('/api/admin/products/:id', requireAuth, (req, res) => {
  const product = state.products.find((item) => Number(item.id) === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }
  Object.assign(product, req.body, { updated_at: new Date().toISOString() });
  res.json({ ok: true, data: product });
});

app.delete('/api/admin/products/:id', requireAuth, (req, res) => {
  const index = state.products.findIndex((item) => Number(item.id) === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }
  const removed = state.products.splice(index, 1)[0];
  return res.json({ ok: true, data: removed, message: 'Produto removido com sucesso.' });
});

app.post('/api/admin/products/import', requireAuth, (req, res) => {
  const records = Array.isArray(req.body) ? req.body : [];
  const valid = records.filter((item) => item && item.title && item.category && item.price);

  valid.forEach((item) => {
    state.products.unshift({
      id: Date.now() + Math.random(),
      slug: slugify(item.title),
      title: item.title,
      description: item.description || 'Produto importado.',
      brand: item.brand || 'Marca não informada',
      category: item.category,
      category_id: 1,
      main_image_url: item.main_image_url || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
      image_source: 'csv',
      status: 'published',
      price: Number(item.price),
      previous_price: Number(item.price),
      currency: 'BRL',
      discount_percent: 0,
      availability_status: 'em_estoque',
      store: item.store || 'Shopee',
      is_demo: true,
      provider_id: 1,
      affiliate_url: item.affiliate_url || 'https://shopee.com.br/demo-import',
      clicks: 0,
      views: 0,
      popularity: 50,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: new Date().toISOString()
    });
  });

  res.json({ ok: true, imported: valid.length, rejected: records.length - valid.length });
});

app.get('/api/admin/analytics', requireAuth, (req, res) => {
  const totalProducts = state.products.length;
  const totalClicks = state.clickEvents.length;
  const avgPrice = state.products.reduce((sum, current) => sum + Number(current.price || 0), 0) / (totalProducts || 1);

  res.json({
    summary: {
      totalProducts,
      publishedProducts: state.products.filter((product) => product.status === 'published').length,
      pendingProducts: state.products.filter((product) => product.status !== 'published').length,
      totalClicks,
      avgPrice: Number(avgPrice.toFixed(2)),
      lastSync: state.automationRuns[0]?.finished_at || null
    },
    providerStatus: state.providers.map((provider) => ({
      id: provider.id,
      name: provider.name,
      integration_status: provider.integration_status,
      configuration_metadata: provider.configuration_metadata
    }))
  });
});

app.get('/api/admin/automations', requireAuth, (req, res) => {
  res.json({ data: state.automationRuns });
});

app.post('/api/admin/automations/:job/run', requireAuth, (req, res) => {
  const item = {
    id: Date.now(),
    job_name: req.params.job,
    provider_id: 1,
    status: 'success',
    started_at: new Date().toISOString(),
    finished_at: new Date().toISOString(),
    processed_count: state.products.length,
    updated_count: 0,
    error_count: 0,
    summary: 'Execução manual de demonstração concluída.'
  };

  state.automationRuns.unshift(item);
  res.json({ ok: true, data: item });
});

app.get('/api/admin/settings', requireAuth, (req, res) => {
  res.json({
    site: {
      name: config.appName,
      url: config.appUrl,
      defaultProvider: config.defaultProvider,
      allowedAffiliateDomains: config.allowedAffiliateDomains,
      demoMode: true
    },
    categories: state.categories
  });
});

const serveStatic = (root) => (req, res, next) => {
  const safePath = path.join(root, req.path);
  if (safePath.startsWith(root) && !safePath.includes('..')) {
    return res.sendFile(safePath, (error) => {
      if (error) return next();
    });
  }
  return next();
};

app.use('/admin', express.static(adminDir));
app.use('/public', express.static(publicDir));
app.use(express.static(publicDir));

app.get('/', (req, res) => res.sendFile(path.join(publicDir, 'index.html')));
app.get('/ofertas', (req, res) => res.sendFile(path.join(publicDir, 'ofertas.html')));
app.get('/categorias', (req, res) => res.sendFile(path.join(publicDir, 'categorias.html')));
app.get('/produto', (req, res) => res.sendFile(path.join(publicDir, 'produto.html')));
app.get('/favoritos', (req, res) => res.sendFile(path.join(publicDir, 'favoritos.html')));
app.get('/sobre', (req, res) => res.sendFile(path.join(publicDir, 'sobre.html')));
app.get('/privacidade', (req, res) => res.sendFile(path.join(publicDir, 'privacidade.html')));
app.get('/contato', (req, res) => res.sendFile(path.join(publicDir, 'contato.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(adminDir, 'index.html')));

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error(error);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

export { app };

const port = config.port || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`RA Achadinhos running on http://localhost:${port}`);
  });
}

export default app;















































































































































