import express from 'express';
import { PORT } from './config.js'; 
import indexRoutes from './routes/index.routes.js';
import userRoutes from './routes/user.routes.js';
import addressRoutes from './routes/address.routes.js';

const app = express();
app.listen(PORT);
console.log(`Server escuchando en el puerto ${PORT}`);

app.use(express.json());

app.use(indexRoutes);
app.use(userRoutes);
app.use(addressRoutes);


export default app;