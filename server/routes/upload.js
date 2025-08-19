const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMaterial');
const { authenticate, isInstructor } = require('../middlewares/authMiddleware');
const pool = require('../db');

// Upload files configuration
router.post('/courses/:id/materials', authenticate, isInstructor, upload.array('files', 5), async (req, res) => {
  const courseId = req.params.id;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  try {
    for (const file of files) {
      await pool.query(
        'INSERT INTO materials (course_id, title, link, uploaded_at) VALUES ($1, $2, $3, NOW())',
        [courseId, file.originalname, `/uploads/materials/${file.filename}`]
      );
    }
    res.status(201).json({ message: 'Materials uploaded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
