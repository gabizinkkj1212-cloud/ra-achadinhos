const CATEGORIES = [
  {id: 1, name: 'Eletrônicos', slug: 'eletronicos', description: 'Aparelhos e gadgets para o dia a dia.'},
  {id: 2, name: 'Informática e Acessórios', slug: 'informatica-e-acessorios', description: 'Periféricos e acessórios digitais.'},
  {id: 3, name: 'Games', slug: 'games', description: 'Acessórios e itens para gamers.'},
  {id: 4, name: 'Casa e Organização', slug: 'casa-e-organizacao', description: 'Organização e conforto para casa.'},
  {id: 5, name: 'Cozinha', slug: 'cozinha', description: 'Itens para praticidade culinária.'},
  {id: 6, name: 'Beleza e Cuidados Pessoais', slug: 'beleza-e-cuidados-pessoais', description: 'Higiene e autocuidado.'},
  {id: 7, name: 'Moda e Acessórios', slug: 'moda-e-acessorios', description: 'Itens para estilo pessoal.'},
  {id: 8, name: 'Esportes', slug: 'esportes', description: 'Itens para treino e atividade.'},
  {id: 9, name: 'Ferramentas', slug: 'ferramentas', description: 'Ferramentas práticas.'},
  {id: 10, name: 'Acessórios para Celular', slug: 'acessorios-para-celular', description: 'Acessórios para smartphones.'}
];

const PRODUCTS = [
  {id: 1, slug: 'mini-alto-falante-bluetooth', title: 'Mini Alto-Falante Bluetooth', description: 'Som claro, bateria de longa duração.', brand: 'RA Audio', category: 'eletronicos', price: 129.9, prevPrice: 179.9, discount: 28, image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-1'},
  {id: 2, slug: 'teclado-sem-fio-mecanico', title: 'Teclado Sem Fio Mecânico', description: 'Teclas responsivas, confortável.', brand: 'RA Key', category: 'informatica-e-acessorios', price: 249.9, prevPrice: 319.9, discount: 22, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-2'},
  {id: 3, slug: 'controle-sem-fio-gamer', title: 'Controle Sem Fio para Console', description: 'Resposta rápida, boa ergonomia.', brand: 'PlayRA', category: 'games', price: 199.9, prevPrice: 249.9, discount: 20, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-3'},
  {id: 4, slug: 'organizador-de-escova', title: 'Organizador de Escova para Banheiro', description: 'Estrutura prática.', brand: 'Casa RA', category: 'casa-e-organizacao', price: 89.9, prevPrice: 119.9, discount: 25, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-4'},
  {id: 5, slug: 'kit-jarra-vidro', title: 'Kit Jarra e Copos de Vidro', description: 'Aparência sofisticada.', brand: 'Ra Hos', category: 'cozinha', price: 159.9, prevPrice: 219.9, discount: 27, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-5'},
  {id: 6, slug: 'kit-care-beleza', title: 'Kit de Cuidados com a Pele', description: 'Hidratação leve.', brand: 'Glow RA', category: 'beleza-e-cuidados-pessoais', price: 139.9, prevPrice: 185.9, discount: 25, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-6'},
  {id: 7, slug: 'mochila-urban-light', title: 'Mochila Urbana Leve', description: 'Compartimentos práticos.', brand: 'TRA Style', category: 'moda-e-acessorios', price: 169.9, prevPrice: 219.9, discount: 23, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-7'},
  {id: 8, slug: 'garrafa-termica-esportiva', title: 'Garrafa Térmica Esportiva', description: 'Ideal para treinos.', brand: 'FitRA', category: 'esportes', price: 89.9, prevPrice: 129.9, discount: 31, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-8'},
  {id: 9, slug: 'kit-chaves-ferramentas', title: 'Kit de Chaves e Ferramentas', description: 'Para pequenos reparos.', brand: 'BuildRA', category: 'ferramentas', price: 219.9, prevPrice: 299.9, discount: 27, image: 'https://images.unsplash.com/photo-1581147036324-c17ac5f7b7e4?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-9'},
  {id: 10, slug: 'pelicula-protetora-celular', title: 'Película Protetora para Celular', description: 'Transparência alta.', brand: 'CellRA', category: 'acessorios-para-celular', price: 39.9, prevPrice: 59.9, discount: 33, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80', store: 'Shopee', affiliateUrl: 'https://shopee.com.br/demo-10'}
];
