import HomepageButton from '@/components/ui/HomepageButton'
import { getServerSession } from 'next-auth'
export default function Home() {
  const user = getServerSession()

  return (
    <main className='h-svh flex flex-col items-center justify-center'>
      <h1 className='poppinsw text-6xl font-bold'>Moments</h1>
      <hr className='w-32 mb-2 mt-0.5 ml-40 accent-color-border' />
      <p className='raleway font-normal text-[13.5px] mb-4'>
        The place where you save all your memories
      </p>
      <HomepageButton />
    </main>
  )
}
