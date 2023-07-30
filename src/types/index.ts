export interface IMovie{
    id : string ; 
   Title : string; 
   Year : string;
   Genre : string;
   Type : string;
   isDetails ? : boolean;
   Poster?: string;
}

export interface IMovieDetails{
    id : string ; 
    Title : string; 
    Year : string;
    Genre : string;
    Type : string;
    isDetails ? : boolean;
    Poster: string;
    Director : string ; 
    Country : string;
    Language : string; 
    Metascore : string;
    Plot : string; 
    Rated : string; 
    Released : string ; 
    // Runtime : string;
    Writer :  string;
    imdbRating : string;
    imdbVotes: string;
    Actors : string;
    Runtime: string;
    duration : string 
}