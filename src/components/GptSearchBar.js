import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";

const GptSearchBar = ()=>{
    const langKey = useSelector((store)=>store.config.lang);
    const searchText = useRef(null);
    
    const handleGptSearchClick = async () =>{
        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query"
        + searchText.current.value + 
        "only give me names of 5 movies, comma separatedlike example result given ahead . Example Results : Gadar, Sholey, Don, Golmaal, Koi Mil Gaya ";
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content:gptQuery}],
            model: 'gpt-3.5-turbo',
        })

        if(!gptResults.choices){
            //TODO : Write error handling
        }
        // console.log(gptResults.choices)
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")
    }

    return (
        <div className="pt-[40%] md:pt-[10%] flex justify-center">
            <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}>
                <input
                ref={searchText} 
                type="text" 
                className="p-2 md:p-4 m-3 md:m-4 col-span-9" 
                placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button className="py-1 md:py-2 px-2 md:px-4 m-3 md:m-4 col-span-3 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>{lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar;