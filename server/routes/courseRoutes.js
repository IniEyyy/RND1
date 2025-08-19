const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate } = require('../middlewares/authMiddleware');

// Public routes
router.get('/public/courses', courseController.getAllPublicCourses);
router.get('/public/courses/:id', courseController.getPublicCourseDetail);

// Instructors
router.post('/courses', authenticate, courseController.createCourse);

module.exports = router;