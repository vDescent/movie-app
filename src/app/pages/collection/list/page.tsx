"use client"
import ProtectedRoute from '@/app/utils/ProtectedRoute'
import React from 'react'
import { useState, useEffect } from 'react'
import { db, auth } from '@/app/firebase/Init'
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'

export default function CollectionList() {
  const [collectionName, setCollectionName] = useState("");
  const [collections, setCollections] = useState<{id: string; name: string;}[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleGetCollections = async (uid:string) =>{
    try{
      // const user = auth.currentUser;

      // if(!user){
      //   alert(`User not login yet`);
      //   return;
      // }

      const collectionRef = collection(db, "users", uid, "movie-collection");
      const querySnapshot = await getDocs(collectionRef);
      const collectionData = querySnapshot.docs.map((doc)=>({
        id: doc.id,
        name: doc.data().name,
      }));

      setCollections(collectionData);
    } catch (error){
      console.error(error);
      alert(`Failed to get collections`);
    }
  }

  const handleAddCollection = async ()=>{
    try{
      const user = auth.currentUser;

      if(!user){
        alert("User not login yet");
        return;
      }

      if(!collectionName.trim()){
        alert("Collection name cannot be empty");
        return;
      }

      await addDoc(
        collection(db, "users", user.uid, "movie-collection"),
        {
          name: collectionName,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );

      setCollectionName("");

      alert("Collection successfully added");
    } catch (error){
      console.error(error);
      alert("Failed to add collection");
    }
  }

  const handleEdit = (id: string, name:string) =>{
    setEditingId(id);
    setEditingName(name);
  }

  const handleUpdate = async (id:string) =>{
    try{
      const user = auth.currentUser;

      if(!editingName.trim()){
        alert("Collection name cannot be empty");
        return;
      }

      const collectionDocRef = doc(
        db,"users", user?.uid, "movie-collection", id
      );

      await updateDoc(collectionDocRef, {
        name:editingName.trim(),
        updatedAt: serverTimestamp(),
      });

      setCollections((prev)=>
        prev.map((item)=> 
          item.id === id ? {...item, name:editingName.trim()} : item)
      );

      setEditingId(null);
      setEditingName("");
    } catch (error){
      console.error(error);
      alert("Failed to update");
    }
  }

  const handleRemove = async (id: string)=>{
    try{

    } catch{

    }
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        handleGetCollections(user.uid);
      } else {
        console.log("User belum login");
      }
    });

    return () => unsubscribe();
    // handleGetCollections();
  }, [])

  return (
    <ProtectedRoute>
        <div>
            <h1>Collection List (perlu crud)</h1>
            <p>Enter the name of the collection</p>
            <input type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}/>
            <button className='cursor-pointer' onClick={handleAddCollection}>Add</button>
            <p>Collection list</p>
            {collections.map((item)=>(
              <div key={item.id} className='flex flex-row gap-2'>
                {editingId === item.id ? (
                  <input type='text' value={editingName} onChange={(e) => setEditingName(e.target.value)} onKeyDown={(e)=> {if(e.key === "Enter") handleUpdate(item.id);}} autoFocus/>
                ) : (
                  <p>{item.name}</p>
                )}

                {editingId === item.id ? (
                  <button onClick={()=> handleUpdate(item.id)}>Save</button>
                ) : (
                  <button onClick={()=> handleEdit(item.id, item.name)}>Edit</button>
                )}
                <button>Remove</button>
              </div>
            ))}
        </div>
    </ProtectedRoute>
  )
}