import { useDispatch, useSelector } from "react-redux";
import { BG_URL } from "../utils/constants";
import GptMovieSugggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = ()=>{

    return (
        <>
            <div className="fixed -z-10">
                    <img className="min-h-screen object-cover" src={BG_URL} alt=""/>
            </div>
            <div className="">
                <GptSearchBar/>
                <GptMovieSugggestions/>
            </div>
        </>
    )
}

export default GPTSearch;