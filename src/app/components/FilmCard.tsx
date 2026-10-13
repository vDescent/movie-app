import Image from "next/image"

export default function FilmCard() {
  return (
    <div className="flex flex-col p-5 bg-surface gap-2
    hover:bg-surface-hover">
        <h1>Contoh image</h1>
        <p>Judul</p>
        <button className="bg-primary-text text-background p-2 rounded-xl
        hover:bg-accent hover:cursor-pointer hover:text-primary-text">Add To Collection</button>
    </div>
  )
}
