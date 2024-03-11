import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [posterUrl, setPosterUrl] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://moviedb-api-nrmv.onrender.com/movies');
  
      // Sort movies by name in ascending order
      const sortedMovies = response.data.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
      });
  
      setMovies(sortedMovies);
    } catch (error) {
      console.error('Failed to fetch and sort movies:', error);
    }
  };
  
  

  const handleAddMovie = async () => {
    try {
      await axios.post('https://moviedb-api-nrmv.onrender.com/movies', { name, year, posterUrl });
      fetchMovies();
      setName('');
      setYear('');
      setPosterUrl('');
      alert('Movie added successfully.');
    } catch (error) {
      console.error('Failed to add movie:', error);
      alert('Failed to add movie.');
    }
  };

  const handleMarkAsWatched = async (name) => {
    try {
      await axios.put(`https://moviedb-api-nrmv.onrender.com/movies/${name}/watched`);
      fetchMovies();
      alert('Movie marked as watched.');
    } catch (error) {
      console.error('Failed to mark movie as watched:', error);
      alert('Failed to mark movie as watched.');
    }
  };

  const handleAddToWishlist = async (name) => {
    try {
      await axios.put(`https://moviedb-api-nrmv.onrender.com/movies/${name}/wishlist`);
      fetchMovies();
      alert('Movie added to wishlist.');
    } catch (error) {
      console.error('Failed to add movie to wishlist:', error);
      alert('Failed to add movie to wishlist.');
    }
  };

  return (
    <div style={{background: "black"}}>
      <h1>Movies</h1>
      <div>
      <h2>Add Movie</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
        />
        <button onClick={handleAddMovie} style={{background: 'black', color: 'white'}}>Add Movie</button>
      </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start', padding: '10px'}}>
        {movies.map((movie, index) => (
          <div id='card' key={index} style={{ display: "flex", padding: '10px' }}>
            <div style={{ width: '200px', height: '300px', overflow: 'hidden', margin: '0 auto', position: 'relative', }}>
              <img src={movie.posterUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'linear-gradient(186deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%)', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <div style={{ display: 'flex', position: 'absolute', top: '0', left: '0' }}>
                  <div>
                    <button onClick={() => handleAddToWishlist(movie.name)}>
                      {movie.wishlist ? <FaBookmark style={{color: 'green'}}/> : <FaRegBookmark style={{color: 'black'}}/>}
                    </button>
                  </div>
                  <div>
                    <button onClick={() => handleMarkAsWatched(movie.name)}>
                      {movie.watched ? <IoEye style={{color: 'green'}}/> : <IoEyeOutline  style={{color: 'black'}}/>}
                    </button>
                  </div>
                </div>
                <div style={{position: 'absolute', bottom: '0', left: '0', padding: '10px', color: 'white'}}>
                  <h2 style={{margin: '0', fontWeight: 'bold', fontSize: '15px'}}>{movie.name}</h2>
                  <p style={{margin: '0', fontSize: '12px'}}>{movie.year}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default App;
