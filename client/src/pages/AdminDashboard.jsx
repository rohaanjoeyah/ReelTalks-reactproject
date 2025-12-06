import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form State
  const [editId, setEditId] = useState(null); // ⬅️ Tracks which movie we are editing
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [cast, setCast] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 1. Check if user is Admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/'); 
    }
  }, [user, navigate]);

  // 2. Fetch Movies
  const fetchMovies = async () => {
    const { data } = await api.get('/movies');
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // 3. Handle File Upload
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await api.post('/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('Image upload failed');
    }
  };

  // 4. Fill Form for Editing
  const handleEdit = (movie) => {
    setEditId(movie._id);
    setTitle(movie.title);
    setYear(movie.year);
    setGenre(movie.genre);
    setRating(movie.rating);
    setDescription(movie.description);
    setCast(movie.cast || '');
    setImage(movie.poster);
    
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. Submit Handler (Create OR Update)
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const movieData = {
        title, year, genre, rating, description, cast, poster: image,
      };

      if (editId) {
        // UPDATE Existing Movie
        await api.put(`/movies/${editId}`, movieData);
        alert('Movie Updated!');
        setEditId(null); // Exit edit mode
      } else {
        // CREATE New Movie
        await api.post('/movies', movieData);
        alert('Movie Added!');
      }
      
      // Reset form
      setTitle(''); setYear(''); setGenre(''); setRating(''); setDescription(''); setCast(''); setImage(null);
      fetchMovies(); 
    } catch (error) {
      alert('Operation failed');
    }
  };

  // 6. Delete Movie
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/movies/${id}`);
        fetchMovies();
      } catch (error) {
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* ➕ Add/Edit Movie Form */}
      <div className="add-movie-form">
        <h3>{editId ? 'Edit Movie' : 'Add New Movie'}</h3>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
          <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
          <input type="number" placeholder="Rating (0-10)" value={rating} onChange={(e) => setRating(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="text" placeholder="Cast (comma separated)" value={cast} onChange={(e) => setCast(e.target.value)} />
          
          <label style={{color: '#aaa', fontSize: '0.9rem'}}>Poster Image:</label>
          <input type="file" onChange={uploadFileHandler} />
          {uploading && <p>Uploading...</p>}
          {image && <p style={{ color: '#4caf50', fontSize: '0.9rem' }}>Image Ready: {image}</p>}

          <button type="submit" disabled={!image && !editId}>
            {editId ? 'Update Movie' : 'Add Movie'}
          </button>
          
          {/* Cancel Edit Button */}
          {editId && (
            <button 
                type="button" 
                onClick={() => {
                    setEditId(null); 
                    setTitle(''); setYear(''); setGenre(''); setRating(''); setDescription(''); setCast(''); setImage(null);
                }}
                style={{ background: '#555', marginTop: '10px' }}
            >
                Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* 📋 Movie List */}
      <h3>Manage Movies</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td style={{ fontSize: '0.8rem', color: '#888' }}>{movie._id}</td>
              <td>
                <button 
                  onClick={() => handleEdit(movie)} 
                  style={{ marginRight: '10px', color: '#ffcc00', borderColor: '#ffcc00' }}
                >
                  Edit
                </button>
                <button onClick={() => deleteHandler(movie._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;