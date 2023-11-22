import express, { json } from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET'],
  })
);

app.use(json());
app.use('/api', router);

app.listen(PORT);
console.log(`Server running on http://localhost:${PORT}`);
