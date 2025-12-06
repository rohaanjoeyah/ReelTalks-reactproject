import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ReviewSection = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  
  const { user } = useContext(AuthContext);

  // 1. Fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/reviews/${movieId}`);
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, [movieId]);

  // 2. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
        setError("You must be logged in to review.");
        return;
    }

    try {
      const { data } = await api.post(`/reviews/${movieId}`, {
        text: newReview,
        rating
      });
      
      // 🛠️ FIX: Manually attach the current user info to the new review
      // The backend sends 'user' as an ID, but our UI needs the 'name' object immediately.
      const reviewWithUserInfo = { 
        ...data, 
        user: { 
          _id: user._id, 
          name: user.name // <--- Uses the name from AuthContext
        } 
      };

      // Add this complete object to the top of the list
      setReviews([reviewWithUserInfo, ...reviews]);
      
      // Reset form
      setNewReview('');
      setRating(5);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    }
  };

  // 3. Handle Delete
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter((r) => r._id !== reviewId));
    } catch (err) {
      alert("Failed to delete review");
    }
  };

  const renderStars = (num) => "⭐".repeat(num);

  return (
    <div className="review-section">
      <h3>User Reviews</h3>
      
      {/* 📝 Add Review Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="add-review-form small-form">
            <h4>Leave a Review</h4>
            {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}
            
            <div className="form-group">
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    {[10,9,8,7,6,5,4,3,2,1].map(num => (
                        <option key={num} value={num}>{num} Stars</option>
                    ))}
                </select>
            </div>
            
            <textarea 
                value={newReview} 
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review here..."
                required
            />
            
            <button type="submit" className="btn">Submit Review</button>
        </form>
      ) : (
        <p className="login-prompt">
            <Link to="/login">Login</Link> to leave a review.
        </p>
      )}

      {/* 📜 Reviews List */}
      <div className="reviews-list">
        {reviews.length === 0 && <p>No reviews yet. Be the first!</p>}
        
        {reviews.map((review) => (
          <div key={review._id} className="review-card-item">
            <div className="review-header">
                <strong>{review.user?.name || "Anonymous"}</strong>
                <span className="stars-display">{renderStars(review.rating)}</span>
            </div>
            <p className="review-body">{review.text}</p>
            <div className="review-footer">
                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                
                {/* 🗑️ Delete Button */}
                {user && (user._id === review.user?._id || user.role === 'admin') && (
                    <button onClick={() => handleDelete(review._id)} className="delete-link">
                        Delete
                    </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;