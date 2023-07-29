import React, { useEffect, useState } from 'react' 
import {useParams} from 'react-router-dom';
import axios from 'axios';
import MovieDetailsCard from '../MovieDetailsCard/MovieDetailsCard';
import { IMovie, IMovieDetails } from '../../types';
interface IRating{
  Source : string ; 
  Value : string;
}

const MovieDetails = () => {
  const {id} = useParams();
  const [movie , setMovie] = useState<IMovie|null>(null);

  useEffect(()=>{
    console.log(id)
    axios.get(`http://www.omdbapi.com/?i=${id}&apikey=cb54531b`)
    .then((response) => {
      // Assuming the API response contains an array of movie objects
      // console.log("INSIDE MOVIE DEAILS");
      setMovie(response.data);
      console.log(response.data)
      // console.log(response.data)
    })
    .catch((error) => {
      console.error('Error fetching movie data:', error);
    });
    
  },[])

  return (
    movie &&   <MovieDetailsCard id = {id as string} details = {movie as IMovieDetails}/> 
  )
}

export default MovieDetails