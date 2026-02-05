import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, lowLogicUser } from '../controllers/users.controllers.js';



const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', lowLogicUser);





export default router;