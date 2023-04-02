import React, { useEffect, useState } from "react";
import requests from "../Requests";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];
  // to get different movie details everytime we reload the application

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const data = await fetch(requests.requestPopular);
    const response = await data.json();
    //console.log(response.results);
    setMovies(response.results);
  };

  //console.log(movie);

  // const truncateMovieDetails = (str, num) => {
  //   if(str?.length > num)
  //   {
  //     return str.slice(0, num)+'...';
  //   }
  //   else{
  //     return str;
  //   }
  // }

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        {/* to have black shady effect on the image  */}
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />

        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <p className="text-3xl md:text-5xl font-bold">{movie?.title}</p>
          <div className="my-4">
            <button className="border border-gray-300 text-black bg-gray-300 py-2 px-3">
              Play
            </button>
            <button className="border border-gray-300 py-2 px-3 ml-4">
              WatchLater
            </button>
          </div>
          <p className="text-gray-400 text-sm"><span className="text-gray-200">Released: </span>{movie?.release_date}</p>
          {/* <p className="text-gray-200 w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">{truncateMovieDetails(movie?.overview, 150)}</p> */}
          <p className="text-gray-200 w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">{movie?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
