import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../utils/authSlice";
import { auth } from "../firebase";

const NavBar = () => {

  const user = useSelector(store => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(user);

  const handleLogOut = () => {
    dispatch(logOut());
    // sign out function from firebase
    auth.signOut();
    navigate('/')
  }

  console.log(user);

  return (
    <div className="flex items-center justify-between p-4 absolute w-full z-[100]">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
       {
        user?.email ? <div>
        <Link to="/account">
          <button className="text-white pr-4">Account</button>
        </Link>
          <button className="text-white bg-red-600 px-6 py-2 rounded" onClick={handleLogOut}>
            LogOut
          </button>
      </div> :
      <div>
      <Link to="/login">
        <button className="text-white pr-4">Log In</button>
      </Link>
      <Link to="/signup">
        <button className="text-white bg-red-600 px-6 py-2 rounded">
          Sign Up
        </button>
      </Link>
    </div>
       }
    </div>
  );
};

export default NavBar;
