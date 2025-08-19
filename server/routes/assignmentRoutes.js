const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/:id/submit', authenticate, assignmentController.submitAssignment);

module.exports = router;
