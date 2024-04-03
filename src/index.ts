import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import search from './search.js';
import transformResults from './utils/transformResults.js';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  const results = await search('Google');
  res.status(200).json(results);
});

app.get('/api/search', async (req: Request, res: Response) => {
  console.log(req.query);
  const results = await search('Google');
  res.status(200).json(transformResults(results));
});

app.listen(4321, () => {
  console.log('listening on port 4321...');
});
