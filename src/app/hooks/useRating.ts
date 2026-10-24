"use client"

import { useEffect, useState } from "react"
import GetMovieRating from "../services/GetMovieRating"

export default function UseMovieRating(movieId: string){
    const [rating, setRating] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{ 
        let cancelled = false;
        const fetchRating = async ()=>{
            setLoading(true);

            try{
                const result = await GetMovieRating(movieId);

                if(!cancelled){
                    setRating(result);
                }

            } catch (error){
                console.error("Failed to fetch rating", error);

                if(!cancelled){
                    setRating(null);
                }
            } finally {
                if(!cancelled){
                    setLoading(false);
                }
            }
        };

        fetchRating();

        return ()=>{
            cancelled = true;
        };
    }, [movieId]);

    return {rating, loading}
}