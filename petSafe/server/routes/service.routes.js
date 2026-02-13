import { Router } from "express";
import { getAllServices, getServicesPublished, getServiceById, getServicesByIdUserCarer, createService, addCarerToService, updateService, lowPublishService, deleteService } from '../controllers/service.controllers.js';

const router = Router();

router.get('/services', getAllServices);
router.get('/services/published', getServicesPublished);
router.get('/services/:idService', getServiceById);
router.get('/services/carer/:idUserCarer', getServicesByIdUserCarer);
router.post('/services', createService);
router.put('/services/:idService/carer', addCarerToService);
router.put('/services/:idService', updateService);
router.put('/services/lowPublish/:idService', lowPublishService);
router.delete('/services/:idService', deleteService);

export default router;
