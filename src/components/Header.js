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
            navigate("/")
        }
        });
        
        //Unsubscribe when component unmount 
        return () => unsubscribe();
    }, []);

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
    }, [ showGptSearch]);

    return(
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-44"
            src={LOGO} 
            alt="logo"
            />  
            {user && (
                <div className="flex p-2">
                    {showGptSearch && (
                        <select className="p-2 m-2 bg-gray-500 text-white" onChange={handleLanguageChange}>
                            {SUPPORTED_LANGUAGES.map((lang)=>(<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))}
                        </select>
                        )
                    }
                    <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick} >{showGptSearch ? "Homepage" : "GPT Search"}</button>
                    <img
                        className="w-12 h-12"
                        alt="usericon"
                        src={user.photoURL}
                    />
                    <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
                </div>
            )}
        </div>
    )
}

export default Header;    