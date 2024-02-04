import JoinCodeBtn from '@/components/JoinCodeBtn'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function Page({ params }: Props) {
  const group = await prisma.group.findFirst({
    where: {
      slug: params.slug,
    },
  })

  const user = await currentUser()
  const isCreator = group?.creatorId === user?.id

  if (!isCreator) {
    return (
      <main className='mx-10 mt-5'>
        <h2 className='raleway font-bold group-title text-3xl'>
          {group!.title}
        </h2>
        <p className='raleway text-md text-gray-300 group-description lowercase'>
          {group!.description}
        </p>
        <h2 className='raleway font-bold group-title text-xl'>
          Not the creator of this group
        </h2>
      </main>
    )
  }

  return (
    <main className='mx-10 mt-5'>
      <h2 className='raleway font-bold group-title text-3xl'>{group!.title}</h2>
      <p className='raleway text-md text-gray-300 group-description lowercase'>
        {group!.description}
      </p>
      <JoinCodeBtn joinCode={group!.joincode!} />
    </main>
  )
}
