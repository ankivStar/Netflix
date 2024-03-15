import { BG_URL } from "../utils/constants";
import GptMovieSugggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = ()=>{
    return (
        <div>
            <div className="absolute -z-10">
                <img className="min-h-screen object-cover"
                    src={BG_URL} alt=""/>
            </div>
            <GptSearchBar/>
            <GptMovieSugggestions/>
        </div>
    )
}

export default GPTSearch;