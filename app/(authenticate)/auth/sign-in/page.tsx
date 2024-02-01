import Navbar from '@/components/ui/Navbar'
import { Signin } from '@/components/ui/Forms/SignIn'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const user = await getServerSession()
  console.log(user)
  return (
    <>
      <Navbar />
      <main className='flex flex-col justify-center items-center mt-40 bg-zinc-900 w-96 m-auto p-8 rounded-2xl'>
        <h3 className='section-heading font-bold text-4xl mb-8'>Sign in</h3>
        <Signin />
      </main>
    </>
  )
}
