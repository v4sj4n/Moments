import Navbar from '@/components/Navbar'
import { currentUser } from '@clerk/nextjs'
import prisma from '@/lib/prisma'

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
    <main className='mx-24'>
      <h1 className='raleway text-2xl'>
        Hello,{' '}
        <span className='accent-color-underline'>
          {user!.firstName! ? user?.firstName : 'user'}
        </span>
        .
      </h1>
      create a group go to dashboard
    </main>
  )
}
