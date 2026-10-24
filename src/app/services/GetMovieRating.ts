import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebase/Init";

export default async function GetMovieRating(movieId:string){
    const movieRef = doc(db, "movie-list", movieId);
    const movieSnapshot = await getDoc(movieRef);

    if(!movieSnapshot.exists()){
        throw new Error("Movie data not found");
    }

    // console.log("Movie snapshot", movieSnapshot);
    // console.log("Movie title: ", movieSnapshot.data().rating);
    

    return movieSnapshot.data().rating;
}