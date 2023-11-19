import express from 'express';
import movieRoutes from './routes/movieRoutes.js';
import { config } from 'dotenv';


config();

const app = express();


app.use(express.json());

app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
