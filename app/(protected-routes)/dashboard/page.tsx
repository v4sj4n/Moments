import GroupCard from '@/components/GroupCard'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Page() {
  const user = await currentUser()
  const userObj = {
    id: user!.id,
    firstName: user!.firstName,
    lastName: user!.lastName,
    email: user!.emailAddresses[0].emailAddress,
    username: user!.username,
  }

  const groupsForUser = await prisma.userGroup.findMany({
    where: {
      userId: userObj.id,
    },
    select: {
      group: true,
    },
  })

  return (
    <main className='md:mx-20 mx-4 mt-5'>
      <div className='md:flex md:justify-between md:items-center md:flex-row flex-col mb-8'>
        <h1 className='raleway text-3xl font-bold '>Dashboard</h1>
        <p className='text-gray-300'>
          <Link
            className='hover:underline text-slate-50 uppercase font-bold'
            href='/create-group'
          >
            Create
          </Link>{' '}
          or{' '}
          <Link
            className='hover:underline text-slate-50 uppercase font-bold'
            href='/join-group'
          >
            Join
          </Link>{' '}
          a group
        </p>
      </div>
      {groupsForUser ? (
        <div className='grid md:grid-cols-4 grid-cols-1 gap-4'>
          {groupsForUser.map((groupObj) => (
            <GroupCard
              key={groupObj.group.id}
              group={{
                title: groupObj.group.title!,
                description: groupObj.group.description!,
                slug: groupObj.group.slug!,
              }}
            />
          ))}
        </div>
      ) : (
        <p>There are no groups</p>
      )}
    </main>
  )
}
