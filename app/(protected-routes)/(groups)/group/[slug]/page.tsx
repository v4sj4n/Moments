import JoinCodeBtn from '@/components/JoinCodeBtn'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import DeleteOrLeaveButton from '@/components/DeleteOrLeaveButton'
import Message from '@/components/Message'
import { sendMessage } from '@/lib/actions'
import SendMessageForm from '@/components/SendMessageForm'

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
      group: true,
      user: true,
      isAdmin: true,
    },
  })

  if (!userGroupDetails) {
    notFound()
  }

  const group = {
    title: userGroupDetails?.group?.title,
    description: userGroupDetails?.group?.description,
    joinCode: userGroupDetails?.group?.joincode!,
    isAdmin: userGroupDetails?.isAdmin,
  }

  const messagesArr = await prisma.message.findMany({
    where: {
      groupId: userGroupDetails.group?.id,
    },
    select: {
      id: true,
      text: true,
      createdAt: true,
      user: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return (
    <>
      <Navbar />
      <main className='md:mx-20 mx-6 mt-5'>
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
            {userGroupDetails.group.creatorId === user?.id ? (
              <DeleteOrLeaveButton value='delete' />
            ) : (
              <DeleteOrLeaveButton value='leave' />
            )}
          </div>
        </div>

        <div className='grid md:grid-cols-3 gap-4 md:h-[60svh]'>
          <section className='md:col-span-2 grid grid-rows-7 bg-gray-100 bg-opacity-10 p-4 rounded-lg border'>
            <div className='row-span-1'>
              <h1 className='pl-2 raleway font-bold text-xl'>Messages</h1>
              <hr className='border-opacity-25 border-zinc-300 mb-2 mt-1' />
            </div>
            <div className='row-span-6 pl-2 flex flex-col justify-start'>
              {messagesArr.length > 0 ? (
                messagesArr.map(({ id, text, user, createdAt }) => (
                  <Message
                    key={id}
                    message={text}
                    sender={user.username}
                    time={createdAt.toString()}
                  />
                ))
              ) : (
                <p className='text-center text-gray-300'>No messages yet</p>
              )}
            </div>
            <SendMessageForm
              id={userGroupDetails.group.id}
              slug={userGroupDetails.group.slug}
            />
          </section>

          <section className='bg-red-100 bg-opacity-10 p-4 rounded-lg border'>
            <h1 className='raleway font-bold text-xl'>Moments</h1>
            <hr className='border-opacity-25 border-zinc-300 mb-2 mt-1' />

            <p>no moments</p>
          </section>
        </div>
      </main>
    </>
  )
}
