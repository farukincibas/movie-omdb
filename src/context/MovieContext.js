import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const MovieContext = createContext();

const API_KEY = "6bba3ee1"; // OMDb API Key

const MovieApp = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [totalResult, setTotalResult] = useState(0);

  const fetchMovies = async (searchValue, currentPage) => {
    const response = await axios(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}&page=${currentPage}`
    );
    const data = response.data;
    const responseWithoutPaging = await axios(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`
    );
    const dataWithoutPaging = responseWithoutPaging.data;
    setTotalResult(parseInt(dataWithoutPaging.totalResults));
    setMovies(data.Search);
  };

  const removeFavoriteMovie = (movie) => {
    movie.isFavorite = false;
    const newFavoriteList = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
  };

  const addFavoriteMovie = (movie) => {
    movie.isFavorite = true;
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  const favoriteHandler = (movie, e) => {
    e.preventDefault();
    if (favorites.includes(movie)) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
  };

  const showDetail = async (id) => {
    const response = await axios(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );
    const data = response.data;
    setSelectedMovie(data);
  };

  useEffect(() => {
    fetchMovies(search, currentPage);
  }, [search, currentPage]);

  return (
    <MovieContext.Provider
      value={{
        setSearch,
        setCurrentPage,
        movies,
        favorites,
        favoriteHandler,
        showDetail,
        selectedMovie,
        totalResult,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieApp;
