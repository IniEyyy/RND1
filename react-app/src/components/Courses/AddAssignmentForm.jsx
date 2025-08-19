import React, { useState } from 'react';
import './addAssignmentForm.css';

function AddAssignmentForm({ courseId, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/instructor/courses/${courseId}/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, due_date: dueDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert('Assignment added successfully!');
      onAdd();
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (err) {
      alert('Failed to add assignment: ' + err.message);
    }
  };

  return (
    <form className="add-assignment-form" onSubmit={handleSubmit}>
      <h4>Add Assignment</h4>

      <input
        type="text"
        placeholder="Assignment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Assignment Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      <button type="submit">Create Assignment</button>
    </form>
  );
}

export default AddAssignmentForm;
