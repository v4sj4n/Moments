import Navbar from '@/components/Navbar'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Page() {
  const user = await currentUser()
  const userObj = {
    id: user!.id,
    firstName: user!.firstName,
    lastName: user!.lastName,
    email: user!.emailAddresses[0].emailAddress,
    username: user!.username!,
  }

  const {data, error} = await supabase
    .from('User')
    .select('*')
    .filter('id', 'eq', userObj.id)


  if (data?.length! == 0 && !error) {
    await supabase.from('User').insert({
      id: userObj.id,
      email: userObj.email,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      username: userObj.username
    })
  } else {
    console.log("User is already on db")

  }
  return (
    <>
      <Navbar />
      <main className='md:mx-20 mx-6 mt-5'>
        <h1 className='raleway text-3xl mb-2'>
          Hello,{' '}
          <span className='accent-color-underline font-bold raleway'>
            {user!.firstName! ? user?.firstName : 'user'}
          </span>
          .
        </h1>
        <p className='raleway'>
          <Link className='font-bold hover:underline' href={'/create-group'}>
            create
          </Link>{' '}
          /{' '}
          <Link className='font-bold hover:underline' href={'/join-group'}>
            join
          </Link>{' '}
          a group or go to{' '}
          <Link className='font-bold hover:underline' href={'/dashboard'}>
            dashboard
          </Link>
        </p>
      </main>
    </>
  )
}
