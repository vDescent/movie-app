import { createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/Init";

type RegisterUserParams = {
    name: string;
    email: string;
    password: string;
}

export async function registerUser({name, email, password}: RegisterUserParams){
    const userInfo = await createUserWithEmailAndPassword(auth,email,password);

    const uid = userInfo.user.uid;

    await setDoc(
        doc(db, 'users', uid),{
            name,
            email,
            role: 'user',
            createdAt: serverTimestamp(),
        }
    );

    await setDoc(
        doc(db, 'tasks', uid),{
            createdAt: serverTimestamp(),
        }
    );

    await setDoc(
        doc(db, 'tasks', uid, 'tasks', '0'),{
            value: 'Create your next custom collection',
            isDone: false,
        }
    );

    return userInfo;
}