const pool = require('../db');

// POST: Submit a review for a course
exports.submitReview = async (req, res) => {
  const { courseId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can review courses' });
  }

  try {
    await pool.query(`
      INSERT INTO reviews (course_id, user_id, rating, comment, created_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
    `, [courseId, userId, rating, comment]);

    await pool.query(`
      UPDATE courses
      SET rating_avg = (
        SELECT ROUND(AVG(rating)::numeric, 2)
        FROM reviews
        WHERE course_id = $1
      )
      WHERE id = $1
    `, [courseId]);

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    console.error('Submit review error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: Fetch all reviews for a course
exports.getReviews = async (req, res) => {
  const { courseId } = req.params;

  try {
    const result = await pool.query(`
      SELECT r.id, r.user_id, r.course_id, r.rating, r.comment, r.created_at, u.username
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.course_id = $1
      ORDER BY r.created_at DESC
    `, [courseId]);

    res.json(result.rows);
  } catch (err) {
    console.error('Fetch reviews error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
