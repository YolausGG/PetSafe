import express from 'express';
import { PORT } from './config.js'; 
import indexRoutes from './routes/index.routes.js';
import userRoutes from './routes/user.routes.js';
import addressRoutes from './routes/address.routes.js';
import serviceRoutes from './routes/service.routes.js';
import petRoutes from './routes/pet.routes.js';
import petPhotoRoutes from './routes/petPhoto.routes.js';
import userPhotoRoutes from './routes/userPhoto.routes.js';
import reviewRoutes from './routes/review.routes.js';

const app = express();
app.listen(PORT);
console.log(`Server escuchando en el puerto ${PORT}`);

app.use(express.json());

app.use(indexRoutes);
app.use(userRoutes);
app.use(addressRoutes);
app.use(serviceRoutes);
app.use(petRoutes);
app.use(petPhotoRoutes);
app.use(userPhotoRoutes);
app.use(reviewRoutes);

export default app;