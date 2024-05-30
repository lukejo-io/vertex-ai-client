import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import search from './search.js';
import transformWebResults from './utils/transformWebResults.js';
import transformImageResults from './utils/transformImageResults.js';
const app: Express = express();

app.use(express.json());
app.use(cors());

async function handleWebSearch(query, offset) {
  const results = await search(query, false, 10, offset);

  return transformWebResults(results);
}

async function handleImageSearch(query, offset) {
  const response = await search(query, true, 25, offset);

  return transformImageResults(response);
}

async function handleSearch(query, isImageSearch, offset = 0) {
  if (isImageSearch) {
    return handleImageSearch(query, offset);
  }

  return handleWebSearch(query, offset);
}

app.get('/api/search', async (req: Request, res: Response) => {
  const { q, searchType, start = '01' } = req.query;
  const isImageSearch = searchType === 'image';

  const results = await handleSearch(
    String(q),
    isImageSearch,
    Number(start) - 1,
  );
  res.status(200).json(results);
});

app.listen(4321, () => {
  console.log('listening on port 4321...');
});
