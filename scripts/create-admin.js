#!/usr/bin/env node
import bcrypt from 'bcryptjs';
import inquirer from 'inquirer';
import { config } from '../server/config.js';

const user = await inquirer.prompt([
  { name: 'username', message: 'Nome de usuário do administrador', default: config.adminUsername || 'admin' },
  { name: 'password', message: 'Senha do administrador', type: 'password' }
]);

const passwordHash = bcrypt.hashSync(user.password, 10);
console.log('Usuário admin preparado com hash seguro.');
console.log(JSON.stringify({ username: user.username, passwordHash }, null, 2));
