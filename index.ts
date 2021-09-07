
import 'dotenv/config';
import express from 'express';
import mongoose, { Connection } from 'mongoose';
import packageJson from './package.json';
import AppRouter from './src/routers';
import cors from 'cors';
import * as systemSeeder from './src/seeders';
import './src/cron';

const PORT: string = process.env.PORT ?? '8000';
const MONGODB: string = process.env.MONGODB ?? '';

const server = express();
server.use(cors());
server.use(express.json());
server.use(AppRouter);

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
const database: Connection = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => console.log("Connected to MongoDB"));

systemSeeder.seedAll()

server.get('/', (req,res) => res.send(`Moud's API ${packageJson.version}`));

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});