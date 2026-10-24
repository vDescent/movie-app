
import Image from "next/image"
import StarIcon from "./icon/StarIcon"
import GetMovieRating from "../services/GetMovieRating"
import GetFilmCardData from "../services/GetFilmCardData";
import useFilmCardData from "../hooks/useFilmData";

export default function FilmCard() {

  // useFilmCardData();

  // GetMovieRating("tt0068646");

  // GetFilmCardData("tt0068646");

  return (
    <div className="flex flex-col p-2 bg-surface gap-2 rounded-xl
    hover:bg-surface-hover">
        <div className="m-2 absolute gap-2 backdrop-blur-sm bg-background/60 p-1 rounded-xl border-2 border-accent">
          <div className="flex gap-1">
            <StarIcon classname="text-accent h-6 w-6"/>
            <p className="text-primary-text font-bold">9.2</p>
          </div>
        </div>

        <Image 
          src="https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_QL75_UY562_CR8,0,380,562_.jpg"
          alt="test picture"
          width={300}
          height={300}

          className="rounded-xl"
        />

        <h1 className="text-primary-text text-xl py-4 font-semibold">The Godfather</h1>
        <button className="bg-primary-text text-background p-2 rounded-xl
        hover:bg-accent hover:cursor-pointer hover:text-primary-text">Add To Collection</button>
    </div>
  )
}
