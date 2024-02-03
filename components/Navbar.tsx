import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between mx-10 py-3'>
      <Link href='/dashboard'>
        <Image
          src={'/momentsLetterLogo.png'}
          alt="Moment's letter logo"
          height={50}
          width={50}
        />
      </Link>
      <UserButton
        appearance={{
          elements: {
            userButtonOuterIdentifier: 'raleway font-bold text-lg mr-2',
          },
        }}
        showName
      />
    </nav>
  )
}
