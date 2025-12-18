import express from 'express';
import { PORT } from './config.js'; 
import indexRoutes from './routes/index.routes.js';
import usersRoutes from './routes/users.routes.js';

const app = express();
app.listen(PORT);
console.log(`Server escuchando en el puerto ${PORT}`);

app.use(express.json());

app.use(indexRoutes);
app.use(usersRoutes);






export default app;