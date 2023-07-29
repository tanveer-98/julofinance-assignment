import React, { useState, useEffect, useContext } from "react";
import { FavMovieContext } from "../../context/FavMovie";
import { css } from "@emotion/css";
import MovieCard from "../MovieCard/MovieCard";
import { MovieContext } from "../../context/MovieContext";

const moviecontainer = css`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 200px;
  place-items: center;
  grid-template-columns: 1fr 1fr; /* Two columns for desktop and tablet view */

  @media (max-width: 768px) {
    /* One column for mobile view */
    grid-template-columns: 1fr;
  }
`;
const headingStyle = css`
 margin:0px;
 flex : 1;
 color :#c5c5c5;
`
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
    // console.log(favmoviesData);
  }, [favmovies, movies]);
  return (
    <div className="movielist__container">
      <div
        className={css({
          width: "100%",
          fontSize: "2rem",
          textAlign: "center",
          position: "fixed",
          zIndex: 10,
          backgroundColor: "gray",
          padding: "20px 0px",
          marginBottom: "200px",
          top: "0px",
          left: "0px",
        })}
      >
        <h3 className = {headingStyle}>FAVOURITE MOVIES</h3>
       


      </div>

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
            height: "200px", 
          })}
        >
          NO FAVOURITES
        </div>
      )}
    </div>
  );
};
export default MyMovies;
