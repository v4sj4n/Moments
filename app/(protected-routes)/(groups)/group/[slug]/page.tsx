import JoinCodeBtn from '@/components/JoinCodeBtn'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
export default async function Page({ params }: { params: { slug: string } }) {
  const group = await prisma.group.findFirst({
    where: {
      slug: params.slug,
    },
  })

  const user = await currentUser()

  const isCreator = group?.creatorId === user?.id

  if (!group) {
    return (
      <main className='mx-10 mt-5'>
        <h2 className='raleway font-bold group-title text-3xl'>
          No group found
        </h2>
      </main>
    )
  }

  if (!isCreator) {
    return (
      <main className='mx-10 mt-5'>
        <h2 className='raleway font-bold group-title text-3xl'>
          Not the creator of this group
        </h2>
      </main>
    )
  }

  return (
    <main className='mx-10 mt-5'>
      <h2 className='raleway font-bold group-title text-3xl'>{group.title}</h2>
      <p className='raleway text-md text-gray-300 group-description lowercase'>
        {group.description}
      </p>
      <JoinCodeBtn joinCode={group!.joincode!} />
    </main>
  )
}
