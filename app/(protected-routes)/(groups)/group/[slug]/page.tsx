import JoinCodeBtn from '@/components/JoinCodeBtn'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import DeleteOrLeaveButton from '@/components/DeleteOrLeaveButton'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const group = await prisma.group.findFirst({
    where: {
      slug: params.slug,
    },
  })
  if (!group) {
    notFound()
  }

  return {
    title: `${group!.title} | Moments`,
    description: `${group!.description}`,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await currentUser()
  const userGroupDetails = await prisma.userGroup.findFirst({
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

  if (!userGroupDetails) {
    notFound()
  }
  const groupDetails = await prisma.group.findFirst({
    where: {
      slug: params.slug,
    },
  })

  const group = {
    title: groupDetails?.title,
    description: groupDetails?.description,
    joinCode: groupDetails?.joincode!,
    isAdmin: userGroupDetails.isAdmin,
  }

  if (!group?.isAdmin) {
    return (
      <>
        <Navbar />
        <main className='mx-10 mt-5'>
          <h2 className='raleway font-bold group-title text-3xl'>
            {group.title}
          </h2>
          <p className='raleway text-md text-gray-300 group-description lowercase'>
            {group.description}
          </p>
          <JoinCodeBtn joinCode={group.joinCode} />
          <DeleteOrLeaveButton value='leave' />
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className='mx-10 mt-5'>
        <h2 className='raleway font-bold group-title text-3xl'>
          {group.title}
        </h2>
        <p className='raleway text-md text-gray-300 group-description lowercase'>
          {group.description}
        </p>
        <JoinCodeBtn joinCode={group.joinCode} />

        <DeleteOrLeaveButton value='delete' />
      </main>
    </>
  )
}
