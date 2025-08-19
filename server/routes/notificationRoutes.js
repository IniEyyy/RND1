const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const {
  getNotifications,
  markAllRead,
} = require('../controllers/notificationController');

// ✅ Get all notifications
router.get('/notifications', authenticate, getNotifications);

// ✅ Mark all as read
router.put('/notifications/mark-all-read', authenticate, markAllRead);

module.exports = router;
