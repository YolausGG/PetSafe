import { Router } from "express";
import { getAllReviews, getReviewsByIdService, createReview, updateReview, deleteReview } from "../controllers/review.controller.js";

const router = Router();

router.get('/reviews', getAllReviews);
router.get('/reviews/service/:idService', getReviewsByIdService);
router.post('/reviews', createReview);
router.put('/reviews/:idReview', updateReview);
router.delete('/reviews/:idReview', deleteReview);

export default router;

