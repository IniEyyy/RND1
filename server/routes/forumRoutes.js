const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { authenticate } = require('../middlewares/authMiddleware');

// Protected Student Routes
router.get('/:courseId', authenticate, forumController.getForumMessages);
router.post('/:courseId', authenticate, forumController.postForumMessage);

module.exports = router;