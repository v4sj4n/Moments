import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between mx-10  bg-zinc-800 px-12 py-6 rounded-3xl mt-3'>
      <h2 className='poppins text-4xl font-bold text-center'>
        Moments<span className='accent-color'>.</span>
      </h2>
      <UserButton showName />
    </nav>
  )
}
