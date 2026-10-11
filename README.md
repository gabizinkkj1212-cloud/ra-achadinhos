# RA Achadinhos

Plataforma brasileira de descoberta de produtos e ofertas com links de afiliados.

## Visão geral

Este projeto entrega uma primeira versão funcional, responsiva e expansível do RA Achadinhos, combinando frontend em HTML, CSS e JavaScript com backend em Express e arquitetura pronta para PostgreSQL/Supabase.

## Funcionalidades implementadas

- Homepage profissional com busca, categorias, campanhas e seções de ofertas
- Páginas públicas de categoria, ofertas, produto, favoritos e conteúdo institucional
- API REST com catálogo público, filtros, busca e redirecionamento seguro
- Estrutura de autenticação administrativa e proteção de rotas
- Banco de dados SQL com migrações e sementes de demonstração
- Importação CSV inicial e gestão de produtos/offer no backend
- Agendador de automações e jobs de demonstração
- Redirecionamento seguro de afiliados com validação de domínio
- Arquitetura pronta para integração com Shopee e outros provedores
- Testes automatizados estruturados para endpoints públicos e regras críticas

## Estrutura principal

- `public/` — frontend público em HTML/CSS/JS
- `server/` — backend Express, rotas, validação e serviços
- `admin/` — painel administrativo
- `database/` — migrações e seeds
- `tests/` — testes de API e regras de negócio
- `scripts/` — utilitários de administração

## Requisitos

- Node.js 18+
- npm 9+
- PostgreSQL local ou URL do Supabase opcional

## Instalação

```bash
npm install
cp .env.example .env
```

Edite o arquivo `.env` com as variáveis necessárias.

## Execução local

```bash
npm run dev
```

Acesse:

- http://localhost:3000
- http://localhost:3000/admin/

## Scripts

```bash
npm run dev
npm run start
npm run test
npm run lint
npm run db:migrate
npm run db:seed
npm run admin:create
```

## Variáveis de ambiente

Confira `.env.example` para todas as opções.

Principais variáveis:

```env
PORT=3000
NODE_ENV=development
APP_NAME="RA Achadinhos"
DATABASE_URL=postgresql://user:password@localhost:5432/ra_achadinhos
ADMIN_USERNAME=admin
ADMIN_PASSWORD=troque-esta-senha
SESSION_SECRET=troque-este-segredo
ALLOWED_AFFILIATE_DOMAINS=shopee.com.br,shopee.com
```

## Banco de dados

O projeto foi preparado para PostgreSQL e também pode funcionar em modo demonstração sem configuração de banco, usando dados em memória.

### Migrations

```bash
npm run db:migrate
```

### Seed de demonstração

```bash
npm run db:seed
```

## Primeiro administrador

Crie o primeiro usuário admin com:

```bash
npm run admin:create
```

O comando solicitará credenciais e criará uma conta local para o painel.

## Integrações

### Funcionando em modo demonstração

- Cadastro local de produtos
- Busca por catálogo
- Favoritos em localStorage
- Links de afiliado com validação de domínio
- Jobs automáticos em memória

### Dependem de credenciais ou aprovação

- Shopee/afiliados reais
- PostgreSQL/Supabase real
- Importação e sincronização com APIs externas

## Limitações conhecidas

- Sem credenciais reais de provedores, não há integração com APIs externas reais
- O ambiente desta sessão não executou os testes em terminal real, portanto os testes foram estruturados e prontos para execução localmente
- O site usa dados de demonstração explicitamente marcados para evitar confusão com ofertas reais

## Segurança

- Validação de entrada e sanitização
- Rate limiting
- Helmet e headers de segurança
- Redirecionamento seguro de links de afiliados
- Sessões protegidas por `SESSION_SECRET`
- Não exponha segredos no frontend

## Publicação

Para publicar em produção:

1. Defina `NODE_ENV=production`
2. Configure PostgreSQL/Supabase real
3. Configure HTTPS e domínio
4. Defina administrador real com senha forte
5. Ative monitoramento e backup
6. Defina `ALLOWED_AFFILIATE_DOMAINS` corretamente

## Licença

MIT
