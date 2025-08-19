import React, { useState } from 'react';
import './CourseForm.css';

function EditCourseForm({ course, onClose, onUpdate }) {
  const [form, setForm] = useState({
    title: course.title,
    description: course.description,
    syllabus: course.syllabus || '',
    price: course.price,
    level: course.level,
    category: course.category || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/instructor/courses/${course.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update course');

      alert('Course updated.');
      onUpdate();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <div className="form">
          <h3>Editing Course: {form.title}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={form.title} onChange={handleChange} required />
            <textarea name="description" value={form.description} onChange={handleChange} required />
            <textarea
              name="syllabus"
              placeholder="Syllabus"
              value={form.syllabus}
              onChange={handleChange}
            />
            <input type="number" name="price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
            <input type="text" name="category" value={form.category} onChange={handleChange} required />
            <select name="level" value={form.level} onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button type="submit">Update Course</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCourseForm;
