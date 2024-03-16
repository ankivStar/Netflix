import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, PHOTO_URL } from "../utils/constants";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errMessage, setErrMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password  = useRef(null);
    const name = useRef(null);
    // console.log(name); 

    const toggleSignInForm = () =>{
        setIsSignIn(!isSignIn); 
        setErrMessage(null)
    }

    const handleButtonClick = () =>{
        // validate the form data
        const emailValue = email.current ? email.current.value : '';
        const passwordValue = password.current ? password.current.value : '';
        const nameValue = name.current ? name.current.value : null;
    
        const message = checkValidData(emailValue, passwordValue, nameValue);
        // console.log(name);
        setErrMessage(message);

        if(message) return;
        if(!isSignIn){
            // Sign Up Logic
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: nameValue,
                    photoURL: PHOTO_URL 
                  }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(
                        addUser({
                            uid : uid, 
                            email : email, 
                            displayName : displayName,
                            photoURL : photoURL
                        })
                    );
                  }).catch((error) => {
                    setErrMessage(error.message)
                  }); 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrMessage(errorCode+"-"+errorMessage);
                // ..
            });
        }
        else {
            // Sign In Logic
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrMessage(errorCode+"-"+errorMessage);
            });
        }
    }

    return(
        <div>
            <Header/>
            <div className="absolute">
                <img className="min-h-screen object-cover"
                    src={BG_URL} alt=""/>
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className="w-[320px] absolute p-8 bg-black my-36 mx-auto right-0 left-0 bg-opacity-90 flex flex-col items-center text-white">
                <h1 className="font-bold text-3xl py-4 my-2 self-start">{isSignIn ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignIn && (
                <input 
                ref={name}
                type="text"   
                placeholder="Full Name" 
                className="p-2 my-2 bg-[#333333] rounded w-full" />
                )}
                <input 
                ref={email}
                type="text" 
                placeholder="Email Address" 
                className="p-2 my-2 w-full rounded text-white bg-[#333333]"
                />
                <input 
                ref={password}
                type="password" 
                placeholder="Password" 
                className="p-2 my-2 w-full text-white bg-[#333333] rounded"
                />
                <p  className="text-red-600 self-start font-bold p-2 ">{errMessage}</p>
                <button 
                className="p-2 my-4 bg-red-600 w-full rounded" 
                onClick={handleButtonClick}>
                {isSignIn ? "Sign In" : "Sign Up"}
                </button>
                <p className="self-start cursor-pointer" onClick={toggleSignInForm}>{isSignIn 
                ? "New to Netflix? Sign Up Now!" 
                : "Already registered? Sign In Now"}
                </p>
            </form>
        </div>
        
    )
}

export default Login;