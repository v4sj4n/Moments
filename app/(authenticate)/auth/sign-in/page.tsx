import Navbar from '@/components/Navbar'

export default function Page() {
  return (
    <>
      <Navbar />
      <main className='flex flex-col justify-center items-center mt-40'>
        <h3 className='section-heading font-bold text-4xl mb-8'>Sign in</h3>
        <form className='flex flex-col gap-4'>
          <input
            className='raleway py-2 px-4 disabled-input bg-transparent border-white border rounded-[10px]'
            type='email'
            value={'user@email.com'}
            placeholder='enter a username or email'
            name='email'
            id='email'
            disabled
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
        </form>
      </main>
    </>
  )
}
