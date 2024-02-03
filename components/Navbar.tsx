import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between mx-10  px-9 py-3 mt-3'>
      <Link href='/dashboard'>
        <Image
          src={'/momentsLetterLogo.png'}
          alt="Moment's letter logo"
          height={75}
          width={75}
        />
      </Link>
      <UserButton showName />
    </nav>
  )
}
