import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { arrayUnion,doc,updateDoc } from "firebase/firestore";


const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  const user = useSelector(store => store.auth.user);

  const movieID = doc(db, 'users', `${user?.email}`);
  
  const saveShow = async() => {
    if(user?.email)
    {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows : arrayUnion({
          id : item.id,
          title : item.title,
          img : item.backdrop_path
        })
      })
    }
    else {
      alert('Please Login First to save the Movies');
    }
  }

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer p-2">
      <img
        className="w-full h-full"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      ></img>
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100">
        <p className="text-xs md:text-sm font-bold flex items-center justify-center text-center h-full w-full whitespace-normal">
          {item?.title}
        </p>
        <p className="absolute top-4 left-4" onClick={saveShow}>
          {like ? <FaHeart /> : <FaRegHeart />} 
          {/* liked means filled heart(FaHeart) and not liked means empty heart(FaRegHeart) */}
        </p>
      </div>
    </div>
  );
};

export default Movie;
