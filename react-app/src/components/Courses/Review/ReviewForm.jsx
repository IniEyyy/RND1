import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import './reviewForm.css';

function ReviewForm({ courseId, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comment })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Review submitted!');
        setRating(5);
        setComment('');
        if (onSuccess) onSuccess(); // Trigger refresh
      } else {
        alert(data.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Review error:', err);
      alert('Error submitting review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <label>
        Rating:
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map(r => (
            <option key={r} value={r}>{r} Star</option>
          ))}
        </select>
      </label>

      <label>
        Comment:
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
        />
      </label>

      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
