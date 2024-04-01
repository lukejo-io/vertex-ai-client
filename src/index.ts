import express, { Express, Request, Response } from 'express';
import search from './search.js';

const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
  const results = await search();
  res.json(results);
});

app.listen(4321, () => {
  console.log('listening on port 4321...');
});
