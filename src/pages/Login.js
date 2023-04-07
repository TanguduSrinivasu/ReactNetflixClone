import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { signUp } from "../utils/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  //const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        console.log(userAuth);
        // store the user's information in the redux state
        // dispatch(
        //   SignUp({
        //     email: userAuth.user.email,
        //     uid: userAuth.user.uid,
        //   })
        // );
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div className="w-full h-screen">
      <img
        className="hidden sm:block w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="Netfllix BgImage"
      />
      <div className="bg-black/60 w-full h-screen fixed top-0 left-0"></div>
      <div className="absolute top-0 w-full h-screen z-50">
        <div className="max-w-[450px] h-[600px] mx-auto mt-20 bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Log In</h1>
            {error ? <p className='p-3 bg-red-400 mt-5'>{error}</p> : null}
            <form onSubmit={handleSubmit} className="flex flex-col py-4">
              <input
                className="bg-gray-700 rounded my-2 p-3"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-gray-700 rounded my-2 p-3"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-red-600 py-3 my-6 rounded font-bold">
                Log In
              </button>
              <div className="flex justify-between text-sm text-gray-500">
                <p>
                  <input className="mr-1" type="checkbox" />
                  Remember Me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="my-8">
                <span className="text-gray-500 mr-2">New to Netflix?</span>
                <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
