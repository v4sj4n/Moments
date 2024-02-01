import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Navbar />
      <main className='flex flex-col justify-center items-center mt-40'>
        <h3 className='section-heading font-bold text-4xl mb-8'>Sign in</h3>
        <form className='flex flex-col gap-4'>
          <input
            className='raleway py-2 px-4 bg-transparent border-white border rounded-[10px]'
            type='email'
            placeholder='enter an email'
            name='email'
            id='email'
          />

          <input
            className='raleway py-2 px-4 bg-transparent border-white border rounded-[10px]'
            type='password'
            placeholder='enter a password'
            name='password'
            id='password'
          />

          <button className='h-8 accent-color-bg  rounded-[10px] font-bold border accent-color-border'>
            sign in
          </button>
          <Link href='/auth/sign-up' className='text-right text-sm'>
            Want to sign up instead
          </Link>
        </form>
      </main>
    </>
  )
}
