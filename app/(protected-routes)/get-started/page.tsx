import Navbar from '@/components/Navbar'
import { currentUser } from '@clerk/nextjs'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function Page() {
  const user = await currentUser()
  const userObj = {
    id: user!.id,
    firstName: user!.firstName,
    lastName: user!.lastName,
    email: user!.emailAddresses[0].emailAddress,
    username: user!.username!,
  }

  const isUserInDb = await prisma.user.findUnique({
    where: {
      id: userObj.id,
      username: userObj.username,
    },
  })

  if (!isUserInDb) {
    await prisma.user.create({
      data: {
        id: userObj.id,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
        username: userObj.username,
      },
    })
  }
  return (
    <>
      <Navbar />
      <main className='md:mx-20 mx-4 mt-5'>
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
