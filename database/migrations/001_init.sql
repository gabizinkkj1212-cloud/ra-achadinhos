create table if not exists categories (
  id serial primary key,
  name varchar(100) not null,
  slug varchar(120) not null unique,
  description text,
  status varchar(30) default 'active',
  sort_order integer default 0
);

create table if not exists products (
  id serial primary key,
  slug varchar(150) not null unique,
  title varchar(200) not null,
  description text,
  brand varchar(120),
  category_id integer references categories(id),
  main_image_url text,
  image_source varchar(50),
  status varchar(30) default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz,
  currency varchar(10) default 'BRL'
);

create table if not exists offers (
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  provider_id integer,
  affiliate_url text,
  current_price numeric(12,2),
  previous_price numeric(12,2),
  currency varchar(10) default 'BRL',
  discount_percent integer default 0,
  availability_status varchar(50),
  valid_from timestamptz,
  valid_until timestamptz,
  last_checked_at timestamptz,
  price_source varchar(80),
  status varchar(30) default 'active'
);

create table if not exists affiliate_providers (
  id serial primary key,
  name varchar(120) not null,
  provider_type varchar(80),
  integration_status varchar(40) default 'disabled',
  configuration_metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists click_events (
  id serial primary key,
  offer_id integer,
  provider_id integer,
  campaign_source varchar(80),
  campaign_medium varchar(80),
  campaign_name varchar(120),
  created_at timestamptz default now()
);

create table if not exists automation_runs (
  id serial primary key,
  job_name varchar(120),
  provider_id integer,
  status varchar(40),
  started_at timestamptz,
  finished_at timestamptz,
  processed_count integer default 0,
  updated_count integer default 0,
  error_count integer default 0,
  summary text
);

create table if not exists users (
  id serial primary key,
  email varchar(160) unique,
  role varchar(30) default 'member',
  created_at timestamptz default now()
);

create table if not exists favorites (
  user_id integer references users(id),
  product_id integer references products(id),
  created_at timestamptz default now(),
  primary key (user_id, product_id)
);

create index if not exists idx_categories_slug on categories(slug);
create index if not exists idx_categories_status on categories(status);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_status on products(status);
create index if not exists idx_offers_product on offers(product_id);
create index if not exists idx_offers_status on offers(status);
create index if not exists idx_click_events_created_at on click_events(created_at);
