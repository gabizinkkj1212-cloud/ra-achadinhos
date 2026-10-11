# Documentação Técnica — RA Achadinhos

## Visão Geral

RA Achadinhos é uma plataforma de descoberta de produtos e ofertas com links de afiliados, desenvolvida com:

- **Frontend**: HTML5, CSS3, JavaScript ES Modules
- **Backend**: Node.js + Express
- **Banco**: PostgreSQL (configurável) / Demo Mode (in-memory)
- **Autenticação**: Session + bcrypt
- **API**: REST com validação Joi

## Arquitetura

```
Cliente (Browser)
    ↓
HTML/CSS/JS (public/)
    ↓
Express.js (server/app.js)
    ↓
API REST (/api/*)
    ↓
Dados em Memória ou PostgreSQL
```

## API Pública

### GET /api/health
Verifica o status da aplicação.

```bash
curl http://localhost:3000/api/health
```

### GET /api/categories
Lista todas as categorias.

```bash
curl http://localhost:3000/api/categories
```

### GET /api/products
Lista produtos com filtros opcionais.

```bash
curl 'http://localhost:3000/api/products?q=teclado&category=informatica-e-acessorios&sort=relevance'
```

**Parâmetros:**
- `q`: termo de busca
- `category`: slug da categoria
- `minPrice`: preço mínimo
- `maxPrice`: preço máximo
- `store`: loja (ex: Shopee)
- `sort`: relevance, lowest_price, highest_price, newest, most_accessed
- `page`: número da página (padrão: 1)
- `limit`: itens por página (padrão: 12)

### GET /api/products/:slug
Obter detalhes de um produto.

```bash
curl http://localhost:3000/api/products/teclado-sem-fio-mecanico
```

### GET /api/search
Busca com sugestões.

```bash
curl 'http://localhost:3000/api/search?q=mochila'
```

### GET /api/offers
Listar ofertas com filtros.

```bash
curl 'http://localhost:3000/api/offers?category=eletronicos&sort=lowest_price'
```

### POST /api/events/click
Registrar um clique em um produto.

```bash
curl -X POST http://localhost:3000/api/events/click \
  -H 'Content-Type: application/json' \
  -d '{"productId":1,"source":"site","medium":"web","campaign":"home"}'
```

### GET /go/:offerId
Redireciona para o link de afiliado com segurança.

```bash
curl -L http://localhost:3000/go/1
```

## API Administrativa

Todas as rotas admin requerem autenticação.

### POST /api/admin/login

```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"admin123"}'
```

### GET /api/admin/me
Verifica a sessão do usuário logado.

### POST /api/admin/logout
Encerra a sessão.

### GET /api/admin/products
Lista todos os produtos.

### POST /api/admin/products
Cria um novo produto.

```bash
curl -X POST http://localhost:3000/api/admin/products \
  -H 'Content-Type: application/json' \
  -d '{
    "title":"Novo Produto",
    "description":"Descrição",
    "brand":"Marca",
    "category":"eletronicos",
    "price":199.99,
    "affiliate_url":"https://shopee.com.br/...",
    "main_image_url":"https://..."
  }'
```

### PATCH /api/admin/products/:id
Atualiza um produto.

### DELETE /api/admin/products/:id
Remove um produto.

### POST /api/admin/products/import
Importa produtos via JSON.

### GET /api/admin/analytics
Obtém métricas do dashboard.

### GET /api/admin/automations
Lista histórico de automações.

### POST /api/admin/automations/:job/run
Executa uma tarefa manualmente.

### GET /api/admin/settings
Obtém configurações do site.

## Estrutura de Dados

### Categoria

```json
{
  "id": 1,
  "name": "Eletrônicos",
  "slug": "eletronicos",
  "description": "Aparelhos e gadgets para o dia a dia.",
  "status": "active",
  "sort_order": 1
}
```

### Produto

```json
{
  "id": 1,
  "slug": "mini-alto-falante-bluetooth-compacto",
  "title": "Mini Alto-Falante Bluetooth Compacto",
  "description": "Som claro, bateria de longa duração...",
  "brand": "RA Audio",
  "category_id": 1,
  "main_image_url": "https://images.unsplash.com/...",
  "image_source": "demo",
  "status": "published",
  "price": 129.9,
  "previous_price": 179.9,
  "currency": "BRL",
  "discount_percent": 28,
  "availability_status": "em_estoque",
  "store": "Shopee",
  "is_demo": true,
  "affiliate_url": "https://shopee.com.br/demo-1",
  "created_at": "2026-10-01T12:00:00.000Z",
  "updated_at": "2026-10-10T09:00:00.000Z",
  "published_at": "2026-10-02T12:00:00.000Z"
}
```

## Configuração do Ambiente

### Arquivo `.env`

```env
# Servidor
PORT=3000
NODE_ENV=development
APP_NAME="RA Achadinhos"
APP_URL=http://localhost:3000

# Banco de Dados (opcional)
DATABASE_URL=postgresql://user:password@localhost:5432/ra_achadinhos

# Segurança
SESSION_SECRET=sua-chave-secreta-forte
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Afiliados
ALLOWED_AFFILIATE_DOMAINS=shopee.com.br,shopee.com
DEFAULT_PROVIDER=Shopee
```

## Modo Demo vs. Produção

### Demo (Padrão)
- Dados em memória (não persistem)
- Sem banco de dados
- Admin automático
- Ideal para desenvolvimento

### Produção
- PostgreSQL real
- HTTPS habilitado
- Senhas forte
- Rate limiting ativo
- Logs estruturados

## Scripts Disponíveis

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm run start

# Testes
npm run test

# Linter
npm run lint

# Migrações de banco
npm run db:migrate

# Seeds de demonstração
npm run db:seed

# Criar primeiro admin
npm run admin:create
```

## Segurança

- ✅ Validação de entrada com Joi
- ✅ Sanitização de conteúdo
- ✅ Proteção contra CSRF
- ✅ Rate limiting
- ✅ Helmet (headers de segurança)
- ✅ CORS restritivo
- ✅ Validação de domínio para links de afiliado
- ✅ Sessões seguras com HttpOnly
- ✅ Passwords com bcrypt
- ✅ Sem exposição de segredos

## Performance

- Paginação de produtos
- Lazy loading de imagens
- CSS otimizado
- JavaScript modular
- Sem bloat de dependências
- Cache-friendly URLs

## Acessibilidade

- HTML semântico
- ARIA labels
- Contraste adequado
- Navegação por teclado
- Suporte a dark mode
- Respeito a `prefers-reduced-motion`

## Próximos Passos para Produção

1. **Banco de Dados**
   - Configure PostgreSQL/Supabase
   - Execute migrations
   - Carregue dados reais

2. **Integração com Shopee**
   - Obtenha credenciais
   - Configure API
   - Ative sincronização

3. **Hosting**
   - Deploy em Railway, Vercel ou Heroku
   - Configure domínio
   - Ative HTTPS com Let's Encrypt

4. **Monitoramento**
   - Sentry para erros
   - Google Analytics
   - Uptime monitoring

5. **Backup**
   - Backup diário do banco
   - Replicação
   - Plano de recuperação

---

**Desenvolvido com ❤️ para RA Achadinhos**
