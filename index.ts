
import 'dotenv/config';
import express from 'express';
import packageJson from './package.json';
import AppRouter from './src/routers';
import cors from 'cors';
import * as systemSeeder from './src/seeders';
import './src/cron';

const PORT: string = process.env.PORT ?? '8000';

const server = express();
server.use(cors());
server.use(express.json());
server.use(AppRouter);

systemSeeder.seedAll()

server.get('/', (req,res) => res.send(`Moud's API ${packageJson.version}`));

server.use(function (error: any, req: any, res: any, next: any) {
  res.status(500).send({
    status: false,
    error: true,
    keys: Object.keys(error),
    message: error.message
  })
})

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});