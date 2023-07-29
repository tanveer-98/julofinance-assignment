import React, { useState, useEffect, useContext } from "react";
import { FavMovieContext } from "../../context/FavMovie";
// import "./movielistStyles.css";
// import styled from  '@emotion/styled';
import { css } from "@emotion/css";

import { IMovie } from "../../types";
import MovieCard from "../MovieCard/MovieCard";
import { MovieContext } from "../../context/MovieContext";

const moviecontainer = css`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  place-items: center;
  grid-template-columns: 1fr 1fr; /* Two columns for desktop and tablet view */

  @media (max-width: 768px) {
    /* One column for mobile view */
    grid-template-columns: 1fr;
  }
`;

const MyMovies = () => {
  // const color = "darkgreen";
  const { favmovies } = useContext(FavMovieContext);
  const movies: any = useContext(MovieContext);
  const [favmoviesData, setFavMoviesData] = useState<any>([]);

  useEffect(() => {
    // const movieslist = movies.filter(m=>favmoviesIDList.)
    let favmoviesData = [];
    for (let i = 0; i < favmovies.length; i++) {
      for (let j = 0; j < movies.length; j++) {
        if (movies[j].id === favmovies[i].id) {
          favmoviesData.push(movies[j]);
        }
      }
    }
    setFavMoviesData(favmoviesData);
    console.log(favmoviesData);
  }, [favmovies, movies]);
  return (
    <div className="movielist__container">
      <h3
        className={css({
          width: "100%",
          fontSize: "2rem",
          textAlign: "center"
        })}
      >
        MY FAVOURITES
      </h3>

      {favmoviesData && favmoviesData.length != 0 ? (
        <div className={moviecontainer}>
          {favmoviesData.map((movie: any) => {
            return (
              <MovieCard
                Poster={movie.Poster}
                key={movie.id}
                id={movie.id}
                Title={movie.Title}
                Genre={movie.Genre}
                Year={movie.Year}
                Type={movie.Type}
              />
            );
          })}
        </div>
      ) : (
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "bold",
            width: "100%",
          })}
        >
          NO FAVOURITES
        </div>
      )}
    </div>
  );
};
export default MyMovies;
