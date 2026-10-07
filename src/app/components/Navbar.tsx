import Link from 'next/link'
import Image from 'next/image'
import LogoutIcon from './icon/LogoutIcon'
import useLogout from '../hooks/useLogout'

export default function Navbar() {
    
  return (
    <div className='flex flex-row justify-between w-full my-2'>
        {/* Logo */}
        <Link href='/' className='flex flex-row items-center gap-2 ml-10'>
            <Image src="/img/movieicon.png" alt="MyMovie Logo" width={80} height={80} />
            <h1 className='font-bold text-primary-text text-2xl hover:text-accent'>MyMovie</h1>
        </Link>

        {/* Quick href */}
        <div className='flex flex-row justify-around gap-30 items-center mr-10'>
            {/* leave 2 for now, i cant add it later */}
            <Link href='/' className='text-primary-text font-medium text-xl hover:text-accent'>Home</Link>
            <Link href='/collection' className='text-primary-text font-medium text-xl hover:text-accent'>Collection</Link>
                {/* <Image src="/img/logout_icon.svg" alt='Logout' width={20} height={20}/> */}
                <Link href='/collection' className='flex flex-row gap-1 items-center text-primary-text font-medium text-xl hover:text-negative-text-hover'>
                <LogoutIcon/>
                <span onClick={useLogout()}>Logout</span>
                </Link>
        </div>
    </div>
  )
}