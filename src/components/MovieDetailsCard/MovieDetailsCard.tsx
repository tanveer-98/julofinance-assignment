import React, { useContext, useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";
import { IMovieDetails } from "../../types";
import { FavMovieContext } from "../../context/FavMovie";
import { useNavigate } from "react-router-dom";
import LazyLoadImage from "../LazyLoader/LazyLoader";
import Skeleton from "../MovieCardSkeleton/Skeleton";
const cardStyle = css`
  border: 1px solid #ccc;
  //   border-radius: 8px;
  padding: 16px;

  margin: 10px 50px;
  flex-direction: column;
  //  cursor:pointer;
  position: relative;
  display: flex;
  //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  text-transform: uppercase;

  @media (min-width: 300px) {
    /* Styles applied when the viewport width is 600px or less */
    margin-right: 40%;
  }

  @media (min-width: 601px) {
    margin-right: 0px;
  }
`;

const genreStyle = css`
  margin-top: 10px;
  font-size: 14px;
  width: fit-content;
  //   display:flex;
  padding: 2px 5px;
  color: #666;
  margin-bottom: 4px;
  border-radius: 20px;
  border: 1px solid black;
  //   width : 100px;
  //    display:inline;
  //   padding:0px 2px;
`;

const yearStyle = css`
  font-size: 14px;
  color: #666;
  padding: 0px 2px;
  margin-bottom: 4px;
`;

const typeStyle = css`
  font-size: 14px;
  font-style: italic;
  color: #666;
`;

const cardLeft = css`
  // flex:1
`;
const cardRight = css`
  width: 40px;
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a0a0a0;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #606060;
  }
`;

const favoriteButtonStyle = css`
  background-color: #007bff;
  //   height :100%;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 6;
  opacity: 0.9;

  &:hover {
    background-color: #88c0ff;
  }
`;

const imageContainer = css`
  width: 100%;
  display : flex ;
  flex-direction: row;
  gap: 10px;
  object-fit: contain;
  background-postition: center;
`;

const image = css`

  width: 100%;
  object-fit: contain;
  //   background-postition: center;

  @media (min-width: 500px) {
    /* Styles applied when the viewport width is 600px or less */
    width: 300px;
  }

  @media (min-width: 601px) {
    margin-right: 0px;
  }
`;
const DetailsContainer = css`
  display: flex;
  flex-direction: column;
`;

const subTitle = css`
  display: flex;
  justifyContent : center;
  alignItems: center;
  flex-direction: row;
`;
const plotStyle = css`
  font-size: 15px;
  color: #666;
  padding: 5px 2px;
  margin-bottom: 4px;
  font-weight: bold;
  border-bottom: 1px solid #c5c5c5;
`;
const plotStyleDesktop= css`
  font-size: 15px;
  color: #666;
  padding: 5px 2px;
  margin-bottom: 4px;
  font-weight: bold;
  border-bottom: 1px solid #c5c5c5;
  @media (min-width: 301px) {
    visibility: hidden;
  }

`;
const miscStyle = css`
  font-size: 15px;
  color: #666;
  padding: 5px 2px;
  margin-bottom: 4px;
  font-weight: bold;
  border-bottom: 1px solid #c5c5c5;
   @media (min-width: 601px) {
    margin-right: 0px;
  }
`;

const spanStyle = css`
  color: #2b76ae;
  font-size: 13px;
`;

interface IMovieDetailsCard {
  id: string;
  details: IMovieDetails;
}
const MovieDetailsCard = ({ id, details }: IMovieDetailsCard) => {
  const { favmovies, setFavMovies } = useContext(FavMovieContext);
  
  //  console.log("Poster : ",Poster)
  const listRef = useRef(null);

  const isFavorite = favmovies.some((favMovie) => favMovie.id === id);
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/details/${id}`);
  };

  const handleToggleFavorite = (event: any) => {
    event.stopPropagation();
    // console.log("clicked");
    if (isFavorite) {
      // Remove movie from favorites
      const updatedFavMovies = favmovies.filter(
        (favMovie) => favMovie.id !== id
      );
      setFavMovies(updatedFavMovies);
    } else {
      // Add movie to favorites
      setFavMovies([...favmovies, { id }]);
    }
  };

  return (
    <div className={cardStyle}>
      <div className={titleStyle}>{details.Title}</div>
      <div className={subTitle}>
        <div className={yearStyle}>{details.Year}</div>
        <div className={yearStyle}>Rated-{details.Rated}</div>
        <div className={yearStyle}>{details.Runtime}</div>
      </div>
      <div className={typeStyle}>{details.Type}</div>
      <div className={imageContainer}>
        <img className={image}  draggable="false"  src={details.Poster} alt="No image" />
        {/* <LazyLoadImage
       
       src = {details.Poster}
       alt="nothing to display"
       placeholder = {<Skeleton width="100%" height="300px" borderRadius="10px" />}
       /> */}
        
        <div className={plotStyleDesktop}> {details.Plot}</div>
      </div>

      {/* <div className={titleStyle}>{id}</div> */}
      <div className={DetailsContainer}>
        <div className={genreStyle}> {details.Genre}</div>
        {/* <div className={subTitle}> */}
        <div className={typeStyle}> ⭐{details.imdbRating}/10</div>
        <div className={typeStyle}> {Math.floor(parseInt(details.imdbVotes.replaceAll(',',""))/1000).toString()}K Votes</div>

        {/* </div> */}
        <div className={plotStyle}> {details.Plot}</div>
        <div className={miscStyle}>
          Director <span className={spanStyle}>{details.Director}</span>
        </div>
        <div className={miscStyle}>
          Writers <span className={spanStyle}>{details.Writer}</span>
        </div>
        <div className={miscStyle}>
          Stars <span className={spanStyle}>{details.Actors}</span>
        </div>
      </div>

      <button
        className={favoriteButtonStyle}
        onClick={(event) => handleToggleFavorite(event)}
      >
        {isFavorite ? "Remove Fav" : "Add Fav"}
      </button>
    </div>
  );
};

export default MovieDetailsCard;
