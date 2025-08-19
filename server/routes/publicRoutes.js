const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// List all courses (for guest)
router.get('/courses', publicController.getAllPublicCourses);

// Course detail (limited info for guest)
router.get('/courses/:id', publicController.getPublicCourseDetail);

module.exports = router;
