// src/components/ReviewCard.jsx
import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <article className="review-card">
      <div className="review-header">
        <div>
          <h4>{review.user}</h4>
          <p className="date">{review.date}</p>
        </div>
        <span className="stars">{review.stars}</span>
      </div>
      <h3>{review.movie}</h3>
      <p className="review-text">"{review.text}"</p>
    </article>
  );
};

export default ReviewCard;
