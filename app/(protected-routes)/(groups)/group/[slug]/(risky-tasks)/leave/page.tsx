import Button from '@/components/Button'
import Navbar from '@/components/Navbar'
import { deleteGroup, leaveGroup } from '@/lib/actions'
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
  const groupObj = await prisma.userGroup.findFirst({
    where: {
      AND: [
        {
          group: {
            slug: params.slug,
          },
        },
        {
          userId: user?.id,
        },
      ],
    },
    select: {
      group: {
        select: {
          title: true,
          description: true,
        },
      },
    },
  })
  if (!groupObj) {
    notFound()
  }

  return {
    title: `Leave ${groupObj.group.title} | Moments`,
    description: `${groupObj.group.description}`,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const group = await prisma.group.findFirst({
    where: {
      slug: params.slug,
    },
  })
  const user = await currentUser()

  if (group?.creatorId == user?.id) {
    redirect(`/group/${group?.slug}`)
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
            value={group?.id}
            hidden
          />
          <Button value='Leave group' valueLoading='Leaving group' />
        </form>
        <Link className='hover:underline' href={`/group/${group?.slug}`}>
          Go back
        </Link>
      </main>
    </>
  )
}
