import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../firebase/Init";

export default async function GetUserName(uid:string){
    const user = auth.currentUser;

    if(!user){
        throw new Error("User not logged in yet");
    }

    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if(!userSnapshot.exists()){
        throw new Error("User data not found");
    }

    return userSnapshot.data().name;
}