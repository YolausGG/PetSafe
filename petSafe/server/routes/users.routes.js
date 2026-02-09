import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, lowLogicUser, upLogicUser } from '../controllers/users.controllers.js';



const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:idUser', getUserById);
router.post('/users', createUser);
router.put('/users/:idUser', updateUser);
router.put('/users/lowLogic/:idUser', lowLogicUser)
router.put('/users/upLogic/:idUser', upLogicUser)
router.delete('/users/:idUser', deleteUser);





export default router;