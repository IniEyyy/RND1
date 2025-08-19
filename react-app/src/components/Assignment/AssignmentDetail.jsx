import React, { useState } from 'react';

function SubmitAssignment({ assignmentId, token }) {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/student/assignments/${assignmentId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });

      const data = await res.json();
      setMessage(data.message);
      setContent('');
    } catch (err) {
      setMessage('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your answer..."
        required
      />
      <button type="submit">Submit</button>
      <p>{message}</p>
    </form>
  );
}

export default SubmitAssignment;
