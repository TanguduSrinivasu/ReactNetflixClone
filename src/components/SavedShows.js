import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';

const SavedShows = () => {

    const [movies, setMovies] = useState([]);
    const user = useSelector(store => store.auth.user);

    const slideLeft = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
      };
    
      const slideRight = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
      };

      useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows)
        })
    }, [user?.email])

    const movieRef = doc(db, 'users', `${user?.email}`);

    const deleteShow = async(id) => {
        try {
            const result = movies.filter((item) => item.id !== id)
            await updateDoc(movieRef, {
                savedShows: result
            })
          } catch (error) {
              console.log(error)
          }
    } 

  return (
    <div className="text-white">
      <h1 className="font-bold md:text-xl p-4">MyShows</h1>
      <div className="relative group flex items-center">
        <MdChevronLeft
          onClick={slideLeft}
          className="absolute left-0 h-5 w-5 md:h-8 md:w-8 z-[100] bg-gray-500 rounded-full opacity-50 hidden hover:opacity-100 cursor-pointer group-hover:inline-block"
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap"
        >
          {movies.map((item, id) => (
           <div key={id} className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer p-2">
           <img
             className="w-full h-full"
             src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
             alt={item?.title}
           ></img>
           <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100">
             <p className="text-xs md:text-sm font-bold flex items-center justify-center text-center h-full w-full whitespace-normal">
               {item?.title}
             </p>
             <p onClick={()=> deleteShow(item?.id)} className='absolute top-4 right-4 rounded-full bg-red-600 md:p-2'><AiOutlineClose /></p>
           </div>
         </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="absolute right-0 h-5 w-5 md:h-8 md:w-8 z-[1] bg-gray-500 rounded-full opacity-50 hidden hover:opacity-100 cursor-pointer group-hover:inline-block"
        />
      </div>
    </div>
  )
}

export default SavedShows