import 'dotenv/config';
import dns from 'node:dns';
import mongoose from 'mongoose';
import conectarDB from '../config/db.js';
import Product from '../models/Product.js';
import MenuItem from '../models/MenuItem.js';
import { productos, menu } from './datos.js';

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

try {
  await conectarDB();

  await Product.deleteMany({});
  await MenuItem.deleteMany({});

  const productosCreados = await Product.insertMany(productos);
  const menuCreado = await MenuItem.insertMany(menu);

  console.log(`Productos creados: ${productosCreados.length}`);
  console.log(`Elementos de menú creados: ${menuCreado.length}`);
} catch (error) {
  console.error('Error al poblar la base de datos:', error);
  process.exit(1);
} finally {
  await mongoose.connection.close();
  process.exit(0);
}
