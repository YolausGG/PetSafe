import { Router } from "express";
import { getAllUserPhotos, getAllUserPhotosByIdUser, getPhotoByIdUserPhoto, createUserPhoto, updateUserPhoto, deleteUserPhoto } from "../controllers/userPhoto.controllers.js";

const router = Router();

router.get('/userPhotos', getAllUserPhotos);
router.get('/userPhotos/:idUser', getAllUserPhotosByIdUser);
router.get('/userPhotos/photo/:idUserPhoto', getPhotoByIdUserPhoto);
router.post('/userPhotos', createUserPhoto);
router.put('/userPhotos/:idUserPhoto', updateUserPhoto);
router.delete('/userPhotos/:idUserPhoto', deleteUserPhoto);

export default router;