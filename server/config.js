import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: Number(process.env.PORT || 3000),
  env: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'RA Achadinhos',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL || '',
  sessionSecret: process.env.SESSION_SECRET || 'ra-achadinhos-dev-secret',
  adminUsername: process.env.ADMIN_USERNAME || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  allowedAffiliateDomains: (process.env.ALLOWED_AFFILIATE_DOMAINS || 'shopee.com.br,shopee.com').split(',').map((domain) => domain.trim()).filter(Boolean),
  defaultProvider: process.env.DEFAULT_PROVIDER || 'Shopee'
};

export const isProduction = config.env === 'production';
