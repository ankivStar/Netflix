import { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleSignInForm = () =>{
        setIsSignIn(!isSignIn);
    }

    return(
        <div>
            <Header/>
            <div className="absolute">
                <img className="min-h-screen object-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt=""                />
            </div>
            <form className="w-8/12 sm:w-5/12 lg:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-90 flex flex-col items-center text-white">
                <h1 className="font-bold text-3xl py-4 my-2 self-start">{isSignIn ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignIn && (
                <input type="text" placeholder="Full Name" className="p-2 my-2 bg-[#333333] rounded w-full" />
                )}
                <input type="text" placeholder="Email Address" className="p-2 my-2 w-full rounded text-white bg-[#333333]"
                />
                <input type="password" placeholder="Password" className="p-2 my-2 w-full text-white bg-[#333333] rounded"
                />
                <button className="p-2 my-4 bg-red-600 w-full rounded">{isSignIn ? "Sign In" : "Sign Up"}
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