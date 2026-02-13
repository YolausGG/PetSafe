import express from 'express';
import { PORT } from './config.js'; 
import indexRoutes from './routes/index.routes.js';
import userRoutes from './routes/user.routes.js';
import addressRoutes from './routes/address.routes.js';
import serviceRoutes from './routes/service.routes.js';
import petRoutes from './routes/pet.routes.js';

const app = express();
app.listen(PORT);
console.log(`Server escuchando en el puerto ${PORT}`);

app.use(express.json());

app.use(indexRoutes);
app.use(userRoutes);
app.use(addressRoutes);
app.use(serviceRoutes);
app.use(petRoutes);


export default app;