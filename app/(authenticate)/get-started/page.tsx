import Navbar from '@/components/Navbar'

export default function Page() {
  return (
    <>
      <Navbar />
      <main className='flex flex-col justify-center items-center mt-56'>
        <h3 className='section-heading font-bold text-4xl mb-8'>Get Started</h3>
        <form className='flex flex-col gap-4'>
          <input
            className='raleway py-2 px-4 bg-transparent border-white border rounded-[10px]'
            type='text'
            placeholder='enter a username or email'
            name='user'
            id='user'
          />

          <button className='h-8 accent-color-bg  rounded-[10px] font-bold border accent-color-border'>
            continue
          </button>
        </form>
      </main>
    </>
  )
}
