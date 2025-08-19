const pool = require('../db');

exports.getForumMessages = async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await pool.query(
      `SELECT f.id, f.message, f.created_at, u.username
       FROM forum f
       JOIN users u ON f.user_id = u.id
       WHERE f.course_id = $1
       ORDER BY f.created_at DESC`,
      [courseId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch forum error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.postForumMessage = async (req, res) => {
  const { courseId } = req.params;
  const { message } = req.body;
  const userId = req.user.id;

  if (!message?.trim()) return res.status(400).json({ message: 'Message is required' });

  try {
    await pool.query(
      `INSERT INTO forum (course_id, user_id, message, created_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
      [courseId, userId, message]
    );
    res.status(201).json({ message: 'Message posted' });
  } catch (err) {
    console.error('Post forum error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
