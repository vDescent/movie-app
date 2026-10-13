"use client"
// import Image from "next/image";
// ini nanti bakalan jadi home protected route user and admin only, unauth gaboleh.
// import app from "./firebase/Init";
import ProtectedRoute from "./utils/ProtectedRoute";
import Link from "next/link";
import Navbar from "./components/Navbar";
import useLogout from "./hooks/useLogout";
import useUserName from "./hooks/useUsername";
import MagnifierIcon from "./components/icon/MagnifierIcon";
import FilmCard from "./components/FilmCard";

export default function Home() {
  const {name, loading} = useUserName();

  return (
    <ProtectedRoute>
      <div className="flex flex-col flex-1 items-center font-sans dark:bg-background mx-10">
        <Navbar/>
        {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-background sm:items-start"> */}
          <h1 className="text-primary-text text-4xl">Hi, {loading ? "Loading..." : `${name}`}</h1>
          <p className="text-primary-text text-xl">Collect your favorites movie from today</p>

          {/* Search bar */}
          <div className="relative w-full max-w-md m-2">
            <MagnifierIcon classname="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-accent"/>
            <input type="text" className="bg-surface text-primary-text rounded-md w-full py-2 pl-10 pr-4 outline-none" placeholder="Search Movies"/>
          </div>

          <FilmCard/>

          <p className="text-primary-text">10 Movies and pagination</p>
          <p className="text-primary-text">Bulk movie via checkbox, and add to collection, then there is a modal to select what collection that user has, if user dont have collection yet in that modal user can create collection.</p>
          <p className="text-primary-text">But feature to create Collection is available either user have collection or not</p>
          <button onClick={useLogout()} className="cursor-pointer">Logout</button>
          <Link href='pages/collection/detail'>/collection/detail</Link>
          <Link href='pages/collection/list'>/collection/list</Link>
          <Link href='pages/details'>/details</Link>
        {/* </main> */}
      </div>
    </ProtectedRoute>
  );
}
