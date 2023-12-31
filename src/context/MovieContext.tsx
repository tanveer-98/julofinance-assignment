import React ,{createContext,useEffect, useState} from 'react';
import axios from 'axios';
import  MoviesData  from './MovieList.json'
import {css} from '@emotion/css'
import Loading from '../components/Loading/Loading';
const MovieContext = createContext([]);
interface IIMDBdata {
  title? : string; 
  rank? : string ; 
  id?: string ; 
}
const LoadingStyle = css`
// background-color:black;
height : 100vh ; 
width : 100vw;
display:flex;
justify-content : center;
align-items : center;
`
const MovieProvider = ({children} : any)=>{
  const [movies , setMovies]= useState<any>([]);
  const [loading , setLoading] = useState <boolean>(true);
  useEffect(() => {
    // Make the Axios request to fetch movie data from the API
    const fetchMovies = async () => {
      const movieIds = MoviesData.map((element)=>element.id); // Replace this with the list of movie IDs to fetch
      const fetchedMovies = [];

      try {
        let count = 0; 
        for (const id of movieIds) {
          // console.log(id)
          count++;
          const response = await axios.get<IIMDBdata>(
            `https://www.omdbapi.com/?i=${id}&apikey=cb54531b`
          );
          // console.log(response.data)
          fetchedMovies.push({id, ...response.data});
          if(count!=0 && count%5==0){
            // Pushing in batches
            setMovies(fetchedMovies);
            setLoading(false);
          }
        }

      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false)
      }
    };

    fetchMovies();

  }, []);

  if (loading) {
    return <div
    className={LoadingStyle}
    ><Loading/></div>;
  }

  return (
    <MovieContext.Provider value ={movies}>
      {children}
    </MovieContext.Provider>
  )
}


export {MovieProvider , MovieContext};