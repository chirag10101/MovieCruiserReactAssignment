import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToFavorite = (movie) => {
    setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
  };
  
  const removeFromFavorite =(movie) => {
    setFavoriteMovies((prevFavorites) => prevFavorites.filter((favMovie) => favMovie.id!== movie.id));
  };

  return (
    <MovieContext.Provider value={{ favoriteMovies, setFavoriteMovies ,addToFavorite, removeFromFavorite, movies,setMovies}}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};

