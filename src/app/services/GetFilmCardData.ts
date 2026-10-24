import { collection, getDocs, type DocumentData } from "firebase/firestore";
import { db } from "../firebase/Init";

export default async function GetFilmCardData(){
    const movieRef = collection(db, "movie-list");
    const movieSnapshot = await getDocs(movieRef);
    const movieIdList: string[] = [];
    const movieDataList: DocumentData[] = [];

    movieSnapshot.forEach((movie) => {
        movieIdList.push(movie.id);
        movieDataList.push(movie.data());

        // console.log(`Movie ID: `,movie.id);
        // console.log(`Movie Data:`,movie.data());
        // console.log(movieList);
        
    })

    // console.log(movieIdList);
    // console.log(movieDataList);
    
    return { movieIdList, movieDataList}
    
}