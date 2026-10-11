# RA Achadinhos — Guia de Início Rápido

## O que você recebeu

Um projeto completo de plataforma de descoberta de produtos com links de afiliados, pronto para rodar localmente.

## Passo a passo para começar

### 1. Extraia a pasta
- Descompacte o arquivo `ra-achadinhos.zip` em um local seguro
- Anote o caminho da pasta

### 2. Abra no VS Code
- Abra VS Code
- Clique em **File > Open Folder**
- Navegue até a pasta `ra-achadinhos` que você extraiu
- Clique em **Select Folder**

### 3. Instale as dependências
- Abra o Terminal no VS Code: **Terminal > New Terminal**
- Digite: `npm install`
- Aguarde a instalação (pode levar alguns minutos)

### 4. Rode o projeto
- No mesmo terminal, digite: `npm run dev`
- Você verá a mensagem: `RA Achadinhos running on http://localhost:3000`

### 5. Acesse a aplicação

**No navegador:**
- Site: http://localhost:3000
- Painel Admin: http://localhost:3000/admin

**Login no Painel:**
- Usuário: `admin`
- Senha: `admin123`

## O que está implementado

✅ Homepage com busca de produtos
✅ Página de ofertas com filtros
✅ Página de categorias
✅ Página individual de produto
✅ Favoritos (localStorage)
✅ Painel administrativo com login
✅ API REST pública
✅ Dados de demonstração
✅ Redirecionamento seguro de links de afiliado
✅ Design responsivo (mobile-first)
✅ Identidade visual RA Achadinhos

## Estrutura do projeto

```
ra-achadinhos/
├── public/
│   ├── index.html (homepage)
│   ├── ofertas.html (ofertas)
│   ├── categorias.html (categorias)
│   ├── produto.html (página de produto)
│   ├── favoritos.html (favoritos)
│   ├── sobre.html (sobre)
│   ├── privacidade.html (privacidade)
│   ├── contato.html (contato)
│   ├── css/ (estilos)
│   └── js/ (scripts frontend)
├── admin/
│   ├── index.html (login)
│   ├── dashboard.html (dashboard)
│   └── js/ (scripts admin)
├── server/
│   ├── app.js (aplicação Express)
│   ├── config.js (configuração)
│   └── data/ (dados de demonstração)
├── database/
│   ├── migrations/ (SQL)
│   └── seeds/ (dados iniciais)
├── .env (variáveis de ambiente)
├── package.json (dependências)
└── README.md (documentação)
```

## Primeiro uso — O que testar

1. **Homepage**
   - Abra http://localhost:3000
   - Veja os produtos em destaque
   - Tente a busca

2. **Ofertas**
   - Clique em "Ofertas"
   - Use os filtros
   - Veja a paginação

3. **Produto**
   - Clique em qualquer produto
   - Veja os detalhes
   - Clique em "Ver na loja" (redirecionará com segurança)

4. **Painel Admin**
   - Abra http://localhost:3000/admin
   - Login: `admin` / `admin123`
   - Veja o dashboard com métricas

5. **Favoritos**
   - Clique no ♡ em qualquer produto
   - Abra http://localhost:3000/favoritos
   - Veja seus favoritos salvos localmente

## Variáveis de ambiente

O arquivo `.env` já está configurado com valores padrão. Se quiser mudar:

```env
PORT=3000
NODE_ENV=development
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
SESSION_SECRET=sua-chave-secreta
DATABASE_URL= (deixe vazio para usar modo demo)
```

## Troubleshooting

### "Port 3000 already in use"
Mude a porta no `.env`:
```env
PORT=3001
```

### "npm: command not found"
Instale Node.js em https://nodejs.org/

### "Cannot find module"
Delete a pasta `node_modules` e rode novamente:
```bash
rm -rf node_modules
npm install
```

## Próximos passos

1. **Criar banco de dados real**
   - Configure PostgreSQL/Supabase
   - Atualize `DATABASE_URL` no `.env`
   - Rode as migrations

2. **Integrar com Shopee**
   - Obtenha credenciais de afiliado
   - Configure os endpoints
   - Ative sincronização de produtos

3. **Fazer deploy**
   - Use Vercel, Railway ou Heroku
   - Configure as variáveis de produção
   - Ative HTTPS

4. **Customizar visual**
   - Edite `public/css/`
   - Adicione seu logo
   - Ajuste cores e fontes

## Suporte

Todos os arquivos estão documentados no código. Se tiver dúvidas:
- Verifique o `README.md` principal
- Consulte os comentários no código
- Abra o DevTools do navegador (F12) para erros

## Licença

MIT — Livre para usar e modificar.

---

**Bom uso! 🚀**
