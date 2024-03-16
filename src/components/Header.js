import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user)
    const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)

    const handleSignOut = () =>{
       signOut(auth)
       .then(()=>{
       })
       .catch((error)=>{
        navigate(" /error")
       })
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid, email, displayName, photoURL} = user;
            dispatch(
                addUser({
                    uid : uid, 
                    email : email, 
                    displayName : displayName,
                    photoURL : photoURL
                })
            );
            navigate("/browse");
        } else {
            // User is signed out
            dispatch(removeUser());
            if(showGptSearch) dispatch(toggleGptSearchView());
            navigate("/")
        }
        });
        
        //Unsubscribe when component unmount 
        return () => unsubscribe();
    }, [dispatch, showGptSearch, navigate]);

    const handleGptSearchClick=()=>{
        //Toggle GPT Search
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange=(e)=>{
        //Toggle GPT Search
        dispatch(changeLanguage(e.target.value));
    }

    useEffect(()=>{
        if(!showGptSearch) {
            dispatch(changeLanguage("en"));
        }
    }, [dispatch, showGptSearch]);

    return(
        <div className="absolute w-screen px-0 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row md:justify-between">
            <img className="w-44 mx-auto md:mx-0"
            src={LOGO} 
            alt="logo"
            />  
            {user && (
                <div className="flex p-2 justify-between">
                    {showGptSearch && (
                        <select className="py-2 px-2 md:px-4 mx-0 md:mx-4 my-4 md:my-2 bg-gray-500 text-white" onChange={handleLanguageChange}>
                            {SUPPORTED_LANGUAGES.map((lang)=>(<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))}
                        </select>
                        )
                    }
                    <button className="py-2 px-2 md:px-4 mx-0 md:mx-4 my-4 md:my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick} >{showGptSearch ? "Homepage" : "GPT Search"}</button>
                    <img
                        className="hidden md:block w-12 h-12"
                        alt="usericon"
                        src={user.photoURL}
                    />
                    <button onClick={handleSignOut} className="py-2 px-2 mx-0 md:mx-4 my-4 md:my-2 bg-orange-800 text-white font-bold">Sign Out</button>
                </div>
            )}
        </div>
    )
}

export default Header;    