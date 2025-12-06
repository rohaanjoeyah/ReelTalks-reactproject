// src/pages/Reviews.jsx
import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [movie, setMovie] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5); // default 5 stars

  // Fetch reviews from Firestore on mount
  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsData);
    };
    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) stars.push(<i key={i} className="fas fa-star"></i>);
    if (halfStar) stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    while (stars.length < 5) stars.push(<i key={'empty-' + stars.length} className="far fa-star"></i>);
    return stars;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        user: name,
        movie,
        text,
        rating,
        date: new Date().toLocaleDateString(),
        createdAt: new Date()
      });

      setReviews([{ id: docRef.id, user: name, movie, text, rating, date: new Date().toLocaleDateString() }, ...reviews]);

      // Reset form
      setName('');
      setMovie('');
      setText('');
        setRating(5);
         alert(' Review submitted successfully!');
    } catch (err) {
        console.error('Error adding review:', err);
         alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="reviews-page">
      <main>
        <h2>User Reviews</h2>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-header">
                <div>
                  <h4>{review.user}</h4>
                  <p className="date">{review.date}</p>
                </div>
                <span className="stars">{renderStars(review.rating)}</span>
              </div>
              <h3>{review.movie}</h3>
              <p className="review-text">"{review.text}"</p>
            </article>
          ))}
        </div>

        {/* Add Review Form */}
        <section className="add-review">
          <h3>Add Your Review</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Movie Name"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Review"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            <label>
              Rating:
              <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                {[5,4,3,2,1].map(num => (
                  <option key={num} value={num}>{num} ⭐</option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn">Submit Review</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Reviews;
