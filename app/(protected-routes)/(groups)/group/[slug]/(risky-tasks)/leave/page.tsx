import Button from '@/components/Button'
import Navbar from '@/components/Navbar'
import { leaveGroup } from '@/lib/actions'
import { supabase } from '@/lib/supabase'
import { currentUser } from '@clerk/nextjs'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

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
    title: `Leave ${group!.data![0].title} | Moments`,
    description: `${group!.data![0].description}`,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await currentUser()

  const userGroupDetails: any = await supabase.from('UserGroup').select(`
  Group(
    slug
  ),
  User(
    id
  ),
  isAdmin
  `).filter('Group.slug', 'eq', params.slug).eq('User.id', user?.id)

  if(userGroupDetails.data.length === 0 || userGroupDetails.error) {
    notFound()
  }


  const group: any = await supabase.from("Group").select("creatorId, slug, id").filter("slug", "eq", params.slug)


  if (group?.data[0].creatorId === user?.id) {
    redirect(`/group/${group.data[0].slug}`)
  }
  return (
    <>
      <Navbar />
      <main className='md:mx-20 mx-4 mt-5'>
        <h1 className='raleway md:text-3xl text-2xl font-bold '>
          Are you sure you want to delete?
        </h1>

        <form action={leaveGroup} className='flex flex-col md:w-1/4 mb-2'>
          <input
            type='text'
            name='groupId'
            id='groupId'
            value={group.data[0].id}
            hidden
          />                                                                                                                                                         
          <Button value='Leave group' valueLoading='Leaving group' />
        </form>
        <Link className='hover:underline' href={`/group/${group.data[0].slug}`}>
          Go back
        </Link>
      </main>
    </>
  )
}
