import Navbar from '@/components/ui/Navbar'
import { Signup } from '@/components/ui/Forms/SignUp'

export default function Page() {
  return (
    <>
      <Navbar />
      <main className='flex flex-col justify-center items-center mt-32'>
        <h3 className='section-heading font-bold text-4xl mb-8'>Sign up</h3>
        <Signup />
      </main>
    </>
  )
}
