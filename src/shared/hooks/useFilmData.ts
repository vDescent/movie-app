import { useEffect, useState } from "react";
import GetFilmCardData from "../services/GetFilmCardData";

export default function useFilmCardData(){
    const [actors, setActors] = useState<string | null>(null);
    const [duration, setDuration] = useState<string | null>(null);
    const [genre, setGenre] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [plot, setPlot] = useState<string | null>(null);
    const [rating, setRating] = useState<string | null>(null);
    const [releaseYear, setReleaseYear] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        try{
            const { movieIdList, movieDataList } = await GetFilmCardData()
        } catch (error){
            console.error(`Failed to fetch movies: `, error);
        } finally { 
            setLoading(false);
        }

    })

    
    // console.log(`ID list from usefilmdata: `,movieIdList);
    console.log(`Data list from usefilmdata: `,movieDataList);

    // const { actors, duration, genre, image, plot, rating, releaseYear, title } = movieDataList[0];

    // console.log(`actor, ${actors}`);

    movieDataList.forEach(element => {
        // console.log(movieDataList);
        
        const { actors, duration, genre, image, plot, rating, releaseYear, title } = element;

        console.log(`Title: `,title);
        console.log(`Actors: `,actors);
        console.log(`Duration: `,duration);
        
        // setActorsRes(actors);

    });

    // console.log(actorsRes);
    

    return { actors, duration, genre, image, plot, rating, releaseYear, title, loading}

}