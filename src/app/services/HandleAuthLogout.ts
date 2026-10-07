import { auth } from "../firebase/Init";
import { signOut } from "firebase/auth";

export default async function HandleAuthLogout(){
    await signOut(auth);
}