import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  return (
    <main className='h-[96svh] grid place-content-center'>
      <div>
        <h1 className='poppins text-6xl font-bold'>Moments</h1>
        <hr className='w-32 mb-2 mt-0.5 ml-40 accent-color-border' />
        <p className='raleway font-normal text-[13.5px] mb-4'>
          The place where you save all your memories
        </p>
        {user ? (
          <Link
            href='/dashboard'
            className='py-1 accent-color-bg w-72 rounded-[10px] flex justify-center items-center font-bold'
          >
            go to dashboard
          </Link>
        ) : (
          <Link
            href='/auth/sign-in'
            className='py-1 accent-color-bg w-72 rounded-[10px] flex justify-center items-center font-bold'
          >
            get started
          </Link>
        )}
      </div>
    </main>
  )
}
