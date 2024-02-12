import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between md:mx-20 mx-4 md:mt-12 mt-2'>
      <div
        className='absolute 
                    top-0
                    left-0
                    w-full
                    lg:h-full
                    md:h-[175svh]
                    h-[180svh]
                    bg-gradient-to-br
                    from-[#F46464]
                    to-[#5d2ce2]
                    rounded-md
                    filter
                    blur-3xl
                    opacity-30
                    -z-50
      '
      />
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
            userButtonOuterIdentifier:
              'raleway font-bold md:text-xl text-lg mr-2',
          },
        }}
        showName
      />
    </nav>
  )
}
