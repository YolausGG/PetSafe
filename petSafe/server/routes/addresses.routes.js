import { Router } from "express";
import { getAllAddresses, getAddressById, createAddress, updateAddress, deleteAddress } from '../controllers/address.controllers.js';

const router = Router();

router.get('/addresses', getAllAddresses);
router.get('/addresses/:idUser', getAddressById);
router.post('/addresses', createAddress);
router.put('/addresses/:idAddress', updateAddress);
router.delete('/addresses/:idAddress', deleteAddress);

export default router;