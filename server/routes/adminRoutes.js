const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

router.get('/users', authenticate, isAdmin, adminController.getAllUsers);
router.put('/users/:id/role', authenticate, isAdmin, adminController.updateUserRole);

module.exports = router;