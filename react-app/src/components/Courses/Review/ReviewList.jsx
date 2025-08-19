import React, { useEffect, useState } from 'react';
import './reviewList.css';

function ReviewList({ courseId, refresh }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reviews/${courseId}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId, refresh]);

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className="review-list">
      <h4>Student Reviews</h4>
      {reviews.map((review, i) => (
        <div key={i} className="review-item">
          <strong>{review.username}</strong> — ⭐ {review.rating}
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
