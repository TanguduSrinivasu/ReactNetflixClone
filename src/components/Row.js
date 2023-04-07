import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movie from "./Movie";

const Row = ({ title, fetchURL, slideId }) => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    getMoviesList();
  }, []);

  const getMoviesList = async () => {
    const data = await fetch(fetchURL);
    const response = await data.json();
    //console.log(response.results);
    setMoviesList(response.results);
  };

  const slideLeft = () => {
    const slider = document.getElementById("slider" + slideId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider" + slideId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="text-white">
      <h1 className="font-bold md:text-xl p-4">{title}</h1>
      <div className="relative group flex items-center">
        <MdChevronLeft
          onClick={slideLeft}
          className="absolute left-0 h-5 w-5 md:h-8 md:w-8 z-[100] bg-gray-500 rounded-full opacity-50 hidden hover:opacity-100 cursor-pointer group-hover:inline-block"
        />
        <div
          id={"slider" + slideId}
          className="w-full h-full overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap"
        >
          {moviesList.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="absolute right-0 h-5 w-5 md:h-8 md:w-8 z-[1] bg-gray-500 rounded-full opacity-50 hidden hover:opacity-100 cursor-pointer group-hover:inline-block"
        />
      </div>
    </div>
  );
};

export default Row;
