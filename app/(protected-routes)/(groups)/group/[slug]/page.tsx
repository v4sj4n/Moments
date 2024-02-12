import JoinCodeBtn from '@/components/JoinCodeBtn'
import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabase'
import Messages from '@/components/Messages'
import Moments from '@/components/Moments'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const group = await supabase
    .from('Group')
    .select(
      `
  id,
  title,
  description
  `
    )
    .filter('slug', 'eq', params.slug)

  if (!group.error && group.data.length === 0) {
    notFound()
  }

  return {
    title: `${group!.data![0].title} | Moments`,
    description: `${group!.data![0].description}`,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await currentUser()

  const userGroupDetails: any = await supabase
    .from('UserGroup')
    .select(
      `
  Group(
    id,
    title,
    description,
    joinCode,
    creatorId

  ),
  User(
    id
  ),
  isAdmin
  `
    )
    .eq('Group.slug', params.slug)
    .eq('User.id', user?.id)
    .not('Group', 'is', null)

  if (userGroupDetails.error || userGroupDetails.data.length === 0) {
    notFound()
  }

  const group = {
    id: userGroupDetails?.data[0].Group.id,
    title: userGroupDetails?.data[0]?.Group.title,
    description: userGroupDetails?.data[0].Group?.description,
    joinCode: userGroupDetails?.data[0].Group?.joinCode!,
    isAdmin: userGroupDetails?.data[0].isAdmin,
  }
  return (
    <>
      <Navbar />
      <main className='md:mx-20 mx-4 mt-5'>
        <div className='flex justify-between md:items-center md:flex-row gap-4 md:gap-0 flex-col mb-4'>
          <div>
            <h2 className='raleway font-bold group-title text-3xl'>
              {group.title}
            </h2>
            <p className='raleway text-md text-gray-300 group-description lowercase'>
              {group.description}
            </p>
            <JoinCodeBtn joinCode={group.joinCode} />
          </div>
          <div>
            {userGroupDetails?.data[0].Group.creatorId === user?.id ? (
              <Link
                className='px-4 py-2 border-red-200 bg-red-600 rounded-md  inline-block'
                href={`/group/${params.slug}/delete`}
              >
                Delete group
              </Link>
            ) : (
              <Link
                className='px-4 py-2 border-red-200 bg-red-600 rounded-md  inline-block'
                href={`/group/${params.slug}/leave`}
              >
                Leave group
              </Link>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4 gap-y-4 md:h-[60svh]'>
          <Messages
            groupId={userGroupDetails?.data[0].Group.id}
            groupSlug={userGroupDetails?.data[0].Group.slug}
          />

          <Moments slug={params.slug} groupId={group.id} />
        </div>
      </main>
    </>
  )
}
