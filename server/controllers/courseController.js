const pool = require('../db');

// Get all public courses
exports.getAllPublicCourses = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id, 
        c.title, 
        c.description, 
        c.category,
        c.level,
        c.rating_avg,
        c.student_count,
        c.price,
        u.username AS instructor_name
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching public course list:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get public course detail
exports.getPublicCourseDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        c.title, 
        c.description, 
        c.syllabus,
        u.username AS instructor_name
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      WHERE c.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found or has been deleted' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching public course:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a course (instructor)
exports.createCourse = async (req, res) => {
  const { title, description, category, price, level, syllabus } = req.body;
  const instructorId = req.user.id;

  if (req.user.role !== 'instructor') {
    return res.status(403).json({ message: 'Only instructors can create courses' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO courses (title, description, category, price, level, instructor_id, syllabus) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, category, price, level, instructorId, syllabus]
    );
    res.status(201).json({ message: 'Course created', course: result.rows[0] });
  } catch (err) {
    console.error('Create course error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
