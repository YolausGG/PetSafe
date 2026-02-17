import { Router } from "express";
import { getAllPetPhotos, getAllPetPhotosByIdPet, PetPhotoByIdPetPhoto, createPetPhoto, updatePetPhoto, deletePetPhoto } from "../controllers/petPhoto.controllers.js";

const router = Router();

router.get('/petPhotos', getAllPetPhotos);
router.get('/petPhotos/pet/:idPet', getAllPetPhotosByIdPet);
router.get('/petPhotos/:idPetPhoto', PetPhotoByIdPetPhoto);
router.post('/petPhotos', createPetPhoto);
router.put('/petPhotos/:idPetPhoto', updatePetPhoto);
router.delete('/petPhotos/:idPetPhoto', deletePetPhoto);

export default router;
