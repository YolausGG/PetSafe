import { Router } from "express";
import { getAllPets, getPetsByIdUser, getPetById, createPet, updatePet, deletePet } from '../controllers/pet.controllers.js';

const router = Router();

router.get('/pets', getAllPets);
router.get('/pets/user/:idUser', getPetsByIdUser);
router.get('/pets/:idPet', getPetById);
router.post('/pets', createPet);
router.put('/pets/:idPet', updatePet);
router.delete('/pets/:idPet', deletePet);

export default router;
