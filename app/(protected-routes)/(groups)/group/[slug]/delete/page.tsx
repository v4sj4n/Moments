import Button from '@/components/Button'
import Navbar from '@/components/Navbar'
import { deleteGroup } from '@/lib/actions'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const user = await currentUser()
  const group = await prisma.userGroup.findFirst({
    where: {
      AND: [
        {
          groupSlug: params.slug,
        },
        {
          userId: user?.id,
        },
      ],
    },
  })
  if (!group) {
    notFound()
  }

  return {
    title: `Delete ${group!.groupTitle} | Moments`,
    description: `${group!.groupDescription}`,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const group = await prisma.group.findFirst({
    where: {
      slug: params.slug,
    },
  })
  const user = await currentUser()

  if (group?.creatorId != user?.id) {
    redirect(`/group/${group?.slug}`)
  }
  return (
    <>
      <Navbar />
      <main className='mx-10 mt-5'>
        <h1 className='raleway text-3xl font-bold '>
          Are you sure you want to delete?
        </h1>

        <form action={deleteGroup} className='flex flex-col w-1/4 mb-2'>
          <input
            type='text'
            name='groupId'
            id='groupId'
            value={group?.id}
            hidden
          />
          <Button value='Delete group' valueLoading='Deleting group' />
        </form>
        <Link className='hover:underline' href={`/group/${group?.slug}`}>
          Go back
        </Link>
      </main>
    </>
  )
}
