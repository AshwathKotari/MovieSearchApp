import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchMovies = () => {
    setLoading(true);
    setError(null);

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=8a8dbd9b`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      })
      .catch(error => {
        setError('An error occurred. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });

    setSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  return (
    <div className="container">
      <h1 className="title">Movie Search App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a movie"
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.imdbID} className="movie-item">
            <div>
              <h2>{movie.Title}</h2>
              <p>Year: {movie.Year}</p>
            </div>
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

