import Link from "next/link"

export default function CustomPopUp({customTitle, customInfo}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative bg-surface border-1 border-primary-text p-4 flex flex-col items-center gap-4 m-0 rounded-xl">
        <p className="text-primary-text text-3xl font-semibold">{customTitle}</p>
        <p className="text-primary-text text-base">{customInfo}</p>
        <Link className="bg-primary-text text-background p-3 rounded-2xl border-background border-1 hover:bg-background hover:text-primary-text hover:cursor-pointer hover:border-primary-text" href='/pages/auth/login'>Continue</Link>
      </div>
    </div>
  )
}