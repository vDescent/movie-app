"use client"
import React, {useEffect, useState} from 'react'
import { db } from '@/app/firebase/Init';
import { setDoc, addDoc, collection, serverTimestamp, getDoc, doc, orderBy, onSnapshot,query, deleteDoc} from 'firebase/firestore';
// CRD no update

interface Movie {
  id: string;
  imdbID: string;
  title: string;
  rating: string;
  genre: string;
  duration: string;
  releaseYear: string;
  actors: string;
  plot: string;
  image: string;
  firstAddedOn?: any;
  lastUpdateOn?: any;
}

interface SearchMovie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
}



export default function AdminPage() {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [form, setForm] = useState({
    imdbID:"",
    title:"",
    rating:"",
    genre:"",
    duration:"",
    releaseYear:"",
    actors:"",
    plot:"",
    image:"",
  })

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

  useEffect(()=>{
    const q = query(
    collection(db, "movie-list"),
    orderBy("lastUpdateOn", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) =>{
    const movies = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Movie, "id">),
    }));

    setMovieList(movies);
    });

    return () => unsubscribe();
  },[])

  const handleSelectMovie = async (imdbID : string) =>{
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);

    const data = await res.json();

    if(data.Response === "True"){
      setForm({
        imdbID: data.imdbID,
        title: data.Title,
        rating: data.imdbRating,
        genre: data.Genre,
        duration: data.Runtime,
        releaseYear: data.Year,
        actors: data.Actors,
        plot: data.Plot,
        image: data.Poster,
      })
    }
  }

  const handleAddMovie = async ()=>{
    try{
      const movieRef = doc(db, "movie-list", form.imdbID);
      const movieSnap = await getDoc(movieRef);

      if(movieSnap.exists()){
        await setDoc(
          movieRef, {...form, lastUpdateOn:serverTimestamp()}, {merge:true}
        );
        alert(`Movie already in db and updated successfully`);
      } else {
        await setDoc(movieRef, {
          ...form, 
          firstAddedOn: serverTimestamp(),
          lastUpdateOn: serverTimestamp(),
        });
        alert("Movie added successfully");
      }

      setForm({
        imdbID:"",
        title: "",
        rating: "",
        genre: "",
        duration: "",
        releaseYear: "",
        actors: "",
        plot: "",
        image: "",
      });

      setKeyword("");
      setMovies([]);

    } catch(error){
      console.error(error);
      alert("Gagal menambahkan movie");
    }
  }

  const handleDeleteMovie = async (id : string) =>{
    const confirmDelete = window.confirm("Delete this movie ?");

    if(!confirmDelete) return;

    try{
      await deleteDoc(doc(db, "movie-list", id));
      alert("Movie deleted successfully");
    } catch (error){
      console.error(error);
      alert("Failed to delete movie");
    }
  }


  return (
    <div>
      <h1 className='text-4xl'>Add Movie</h1>
      <h2>Search Movie You Want To Add: </h2>
      <input type="text" className='bg-amber-200' placeholder='ex: batman' value={keyword} onChange={(e)=> setKeyword(e.target.value)}/>
      <div className='mt-4'>
        {movies.map((movie)=>(
          <div key={movie.imdbID} onClick={()=> handleSelectMovie(movie.imdbID)} className='cursor-pointer border p-2 hover:bg-gray-200'>
            <img src={movie.Poster} alt={movie.Title} width={100} />
            <p>{movie.Title}</p>
            {/* link ke fetch detail movie */}
          </div>
        ))}
      </div>
      <h3>Title: </h3>
      <input type="text" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})}/>
      <h3>Ratings: </h3>
      <input type="text" value={form.rating} onChange={(e)=> setForm({...form, rating: e.target.value})}/>
      <h3>Genre: </h3>
      <input type="text" value={form.genre} onChange={(e)=> setForm({...form, genre: e.target.value})}/>
      <h3>Duration: </h3>
      <input type="text" value={form.duration} onChange={(e)=> setForm({...form, duration: e.target.value})}/>
      <h3>Release Year: </h3>
      <input type="text" value={form.releaseYear} onChange={(e)=> setForm({...form, releaseYear:e.target.value})}/>
      <h3>Actors: </h3>
      <input type="text" value={form.actors} onChange={(e)=> setForm({...form, actors:e.target.value})}/>
      <h3>Plot: </h3>
      <input type="text" value={form.plot} onChange={(e)=> setForm({...form, plot:e.target.value})}/>
      <h3>Image Link: </h3>
      <input type="text" disabled placeholder='This will fill automatically if movie is available' value={form.image} onChange={(e)=> setForm({...form, image:e.target.value})}/>


      <button className='bg-green-300 cursor-pointer hover:bg-green-400 rounded-lg p-2'
      onClick={handleAddMovie}
      >Add New Movie</button>
      {/* Trus ada pop up dan isi disitu saja */}
      <h1 className='text-4xl'>Movie list</h1>
      <div className='grid gap-4 mt-4'>
        {movieList.map((movie) =>(
          <div key={movie.id} className='border p-3 rounded flex gap-3 items-center'>
            <img src={movie.image} alt={movie.title} width={100} />
            <div>
              <h2 className='font-bold'>{movie.title}</h2>
              <p>Duration : {movie.duration}</p>
              <p>Rating : {movie.rating}</p>
              {/* <p>Last Updated : {movie.lastUpdateOn}</p> */}
              {/* <p>Genre : {movie.genre}</p> */}
              <button className='bg-red-400 p-2 rounded mt-2 cursor-pointer hover:bg-red-600'
              onClick={()=> handleDeleteMovie(movie.id)}>remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
