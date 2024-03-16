import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);

    useEffect(() => {
        // Define getMoviesVideo inside useEffect
        const getMoviesVideo = async () => {
            const data = await fetch(
                "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US",
                API_OPTIONS
            )

            const json = await data.json();
            // console.log(json);

            const filterData = json.results.filter((video) => video.type === "Trailer")
            const trailer = filterData.length ? filterData[0] : json.results[0];
            dispatch(addTrailerVideo(trailer));
        }

        if (!trailerVideo) {
            getMoviesVideo();
        }
    }, [dispatch, movieId, trailerVideo]); // Include dependencies in the dependency array
}

export default useMovieTrailer;
