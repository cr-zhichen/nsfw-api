import 'reflect-metadata';
import 'module-alias/register';

import express from 'express';
import bodyParser from 'body-parser';
import {ControllersLoader} from 'simple-ts-express-decorators';
import {NsfwController} from 'app/controllers/NsfwController';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 允许任何源
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());

new ControllersLoader({
  controllers: [NsfwController]
}).load(app);

app.listen(3000);
