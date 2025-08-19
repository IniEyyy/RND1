import React, { useState } from 'react';
import './addAssignmentForm.css';

function EditAssignmentForm({ assignment, onClose, onUpdate }) {
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [dueDate, setDueDate] = useState(assignment.due_date.split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/instructor/assignments/${assignment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, due_date: dueDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert('Assignment updated!');
      onUpdate();
      onClose();
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-assignment-form">
      <h4>Edit Assignment</h4>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <button type="submit">Update</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default EditAssignmentForm;
