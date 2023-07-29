import React, { useState, useEffect, useRef, useContext, useMemo , useCallback } from "react";
import { MovieContext } from "../../context/MovieContext";
import {useNavigate} from 'react-router-dom'
import "./movielistStyles.css";
// import styled from  '@emotion/styled';
import { css } from "@emotion/css";

import { IMovie } from "../../types"
import MovieCard from "../MovieCard/MovieCard";

const moviecontainer = css`
  display: grid;
  margin-top : 200px;
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
const navContainer = css`
display:flex;
justify-content:center;
align-items:center;`
 
const headingStyle = css`
 margin:0px;
 flex : 1;
 color :#c5c5c5;
`

const buttonStyle = css`
  color :white ;
  background-color : #4f4f4f;
  box-shadow : 2px 2px 10px rgba(0,0,0,1);
  padding: 4px 10px;
  border-radius : 5px;
  border : none;
  cursor:pointer;

  &:hover{
    box-shadow : 2px 2px 10px rgba(0,0,0,0.5);
  }
`

const MovieList = () => {
  // const color = "darkgreen";
  const movies = useContext(MovieContext);
  const [visibleMovies, setVisibleMovies] = useState([]);
  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  const handleNavigate = ()=>{
    setVisibleMovies([]);
    setTimeout(()=>{
      navigate('/favmovies')
    },100)
  }

  // useEffect(() => {
  //   setTimeout(()=>{
  //     setLoading(false)

  //   }
  //   ,2000)
  // }, [movies]);
  
  const loadMoreMovies = useCallback(() => {
    console.log('called')
    // if(movies!=null)
    console.log(movies)
    const nextMovies = movies?.slice(
      visibleMovies.length,
      visibleMovies.length + 5
    );
    console.log("next movies")
    console.log(nextMovies)
    // console.log("Next Movies: " + nextMovies)
    setVisibleMovies((prev)=>[...prev, ...nextMovies]);
  },[visibleMovies.length]);
  
  const handleIntersection = useCallback((entries : IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      loadMoreMovies();
    }
  },[loadMoreMovies]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1.0,
    });

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    //unmount
    return () => {
      if (listRef.current) {
        observer.unobserve(listRef.current);
      }
    };
  }, [handleIntersection]);

  useEffect(() => {
    // if(movies.length==0)
    // if(visibleMovies.len)
    setVisibleMovies(movies.slice(0, 5));
  }, []);

  // useEffect(() => {
  //   console.log(visibleMovies);
  // }, [visibleMovies]);
  

  return (
    <div>
      <div
        className={css({
          width: "100%",
          fontSize: "2rem",
          textAlign: "center",
          position: "fixed",
          zIndex: 10,
          backgroundColor: "gray",
          padding: "20px 0px",
          margin : "0px",
          top: "0px",
          left: "0px",
        })}
      >
        <h3 className = {headingStyle}>MOVIES TO WATCH</h3>
        <button className={buttonStyle} onClick = {handleNavigate}>
        My Favourites
        </button>


      </div>
 
      <div className={moviecontainer}>
        {
          visibleMovies.map((movie: any) => {
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
          })
          //  movies.map((movie: any)=>{
          //   return (
          //     <MovieCard Poster = {movie.Poster} key={movie.id} id={movie.id} Title ={movie.Title} Genre= {movie.Genre} Year= {movie.Year} Type ={movie.Type} />
          //   )
          //  })
        }
      <div ref={listRef} />
      </div>
    </div>
  );
};

export default MovieList;
