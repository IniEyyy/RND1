const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/:courseId', authenticate, reviewController.submitReview);
router.get('/:courseId', reviewController.getReviews);

module.exports = router;
