const pool = require('../db');

// Submit an assignment
exports.submitAssignment = async (req, res) => {
  const assignmentId = req.params.id;
  const studentId = req.user.id;
  const { content } = req.body;

  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can submit assignments' });
  }

  try {
    const assignment = await pool.query('SELECT * FROM assignments WHERE id = $1', [assignmentId]);
    if (assignment.rows.length === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const courseId = assignment.rows[0].course_id;
    const enrolled = await pool.query(
      'SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2',
      [studentId, courseId]
    );

    if (enrolled.rows.length === 0) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    await pool.query(
      `INSERT INTO submissions (assignment_id, student_id, content)
       VALUES ($1, $2, $3)`,
      [assignmentId, studentId, content]
    );

    res.status(200).json({ message: 'Assignment submitted successfully' });
  } catch (err) {
    console.error('Submit assignment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
