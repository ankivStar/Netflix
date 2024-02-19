import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errMessage, setErrMessage] = useState(null);

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
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrMessage(errorCode+"-"+errMessage);
                // ..
            });
        }
        else {
            // Sign In Logic
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrMessage(errorCode+"-"+errMessage);
            });
        }
    }

    return(
        <div>
            <Header/>
            <div className="absolute">
                <img className="min-h-screen object-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt=""/>
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className="w-8/12 sm:w-5/12 lg:w-3/12 absolute p-8 sm:p-11 bg-black my-36 mx-auto right-0 left-0 bg-opacity-90 flex flex-col items-center text-white">
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