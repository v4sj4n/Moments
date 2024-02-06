import GroupCard from '@/components/GroupCard'
import { supabase } from '@/lib/supabase'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'



type GroupObj = {
Group: {
  id: string
  title: string
  description: string
  slug: string
}
}

export default async function Page() {
  const user = await currentUser()
  const userObj = {
    id: user!.id,
    firstName: user!.firstName,
    lastName: user!.lastName,
    email: user!.emailAddresses[0].emailAddress,
    username: user!.username,
  }



  const groupsForUserData: any = await supabase.from("UserGroup").select(
    `Group(
      id,
      title,
      description,
      slug
    )`
  ).filter('userId',"eq", userObj.id)

  const groupsForUser: GroupObj[] | [] = groupsForUserData.data

  

  return (
    <main className='md:mx-20 mx-6 mt-5'>
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
      {groupsForUser.length > 0 ? (
        <div className='grid md:grid-cols-4 grid-cols-1 gap-4'>
          {groupsForUser.map((groupObj) => (
            <GroupCard
              key={groupObj.Group.id}
              group={{
                title: groupObj.Group.title!,
                description: groupObj.Group.description!,
                slug: groupObj.Group.slug!,
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
