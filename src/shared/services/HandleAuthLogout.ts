import { auth } from "../../lib/firebase/Init";
import { signOut } from "firebase/auth";

export default async function HandleAuthLogout(){
    await signOut(auth);
}