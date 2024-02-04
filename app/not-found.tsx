import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <nav className='flex justify-center mt-10'>
        <Link href='/'>
          <Image
            src={'/momentsLetterLogo.png'}
            alt="Moment's letter logo"
            width={50}
            height={50}
          />
        </Link>
      </nav>
      <main className='h-[80svh] grid place-content-center'>
        <div className='flex gap-3 items-center'>
          <h1 className='accent-color text-5xl pr-4 border-r border-opacity-25 border-slate-100'>
            404
          </h1>{' '}
          <p className='text-lg'>Page not found</p>
        </div>
      </main>
    </>
  )
}
