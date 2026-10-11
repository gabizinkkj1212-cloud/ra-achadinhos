#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'seeds', '001_demo.sql');
const sql = fs.readFileSync(filePath, 'utf-8');
console.log('Seed file ready:');
console.log(sql.slice(0, 250));
