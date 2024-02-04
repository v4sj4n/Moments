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
  })

  return (
    <main className='mx-10 mt-5'>
      <div className='flex justify-between items-center'>
        <h1 className='raleway text-3xl font-bold mb-8'>Dashboard</h1>
        <p className='text-gray-300'>
          <Link
            className='hover:underline text-slate-50 uppercase'
            href='/create-group'
          >
            Create
          </Link>{' '}
          or{' '}
          <Link
            className='hover:underline text-slate-50 uppercase'
            href='/join-group'
          >
            Join
          </Link>{' '}
          a group
        </p>
      </div>
      {groupsForUser ? (
        <div className='flex gap-4'>

        {groupsForUser.map(
          ({ groupTitle, groupDescription, groupId, groupSlug }) => (
            <GroupCard
              key={groupId}
              group={{
                title: groupTitle!,
                description: groupDescription!,
                slug: groupSlug!,
              }}
            />
          )
        )}
        </div>

      ) : (
        <p>There are no groups</p>
      )}
    </main>
  )
}
