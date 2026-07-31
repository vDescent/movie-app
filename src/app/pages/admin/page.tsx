"use client"
import React, {useEffect, useState} from 'react'
import Link from 'next/link';
// CRD no update

export default function AdminPage() {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    if(keyword.trim() === ""){
      setMovies([]);
      return;
    }

    const timer = setTimeout(async () =>{
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`);

      const data = await res.json();

      if(data.Response === "True"){
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
      // debounce 1000ms
    }, 1500);

    return ()=> clearTimeout(timer);
  }, [keyword]);

  // const res = await fetch(
  //   `https://www.omdbapi.com/?apikey=${apiKey}&s=Batman`
  // );

  // console.log();

  return (
    <div>
      <h1 className='text-4xl'>Add Movie</h1>
      <h3>Search Movie You Want To Add: </h3>
      <input type="text" className='bg-amber-200' placeholder='ex: batman' value={keyword} onChange={(e)=> setKeyword(e.target.value)}/>
      <div className='mt-4'>
        {movies.map((movie)=>(
          <div key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} width={100} />
            <p>{movie.Title}</p>
            {/* link ke fetch detail movie */}
          </div>
        ))}
      </div>


      <button className='bg-green-300'
      >Add New Movie</button>
      {/* Trus ada pop up dan isi disitu saja */}
      <h1 className='text-4xl'>Movie list</h1>
      <div>
        <h1>ini img</h1>
        <p>Ini judul</p>
        <p>Year : </p>
        <button>Remove</button>
      </div>
    </div>
  )
}
