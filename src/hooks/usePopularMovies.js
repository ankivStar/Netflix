import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () =>{
  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();
  const popularMovies = useSelector((store)=>store.movies.popularMovies)
    
  useEffect(()=>{
    const getPopularMovies = async () =>{
      const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular", API_OPTIONS
      );
      const json = await data.json();
      // console.log(json);
      dispatch(addPopularMovies(json.results));
    }

    if(!popularMovies){
      getPopularMovies();
    }
  }, [dispatch, popularMovies])  
}

export default usePopularMovies;