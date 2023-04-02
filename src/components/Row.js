import React, { useEffect, useState } from "react";

import Movie from "./Movie";

const Row = ({ title, fetchURL }) => {
  const [moviesList, setMoviesList] = useState([]);


  useEffect(() => {
    getMoviesList();
  }, []);

  const getMoviesList = async () => {
    const data = await fetch(fetchURL);
    const response = await data.json();
    console.log(response.results);
    setMoviesList(response.results);
  };

  return (
    <div className="text-white">
      <h1 className="font-bold md:text-xl p-4">{title}</h1>
      <div className="flex flex-nowrap items-center">
        <div className="w-full h-full overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap">
          {moviesList.map((item, id) => (
            <Movie key={id} item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;
