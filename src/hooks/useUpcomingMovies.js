import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () =>{
  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();
  
  const getUpcomingMovies = async () =>{
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming", API_OPTIONS
      );
      const json = await data.json();
      // console.log(json);
      dispatch(addUpcomingMovies(json.results));
    }
    
    useEffect(()=>{
    // console.log(vari);
      getUpcomingMovies();
    }, [])  
}

export default useUpcomingMovies;