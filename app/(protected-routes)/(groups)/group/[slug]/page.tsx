import JoinCodeBtn from '@/components/JoinCodeBtn'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import DeleteOrLeaveButton from '@/components/DeleteOrLeaveButton'
import Message from '@/components/Message'
import { sendMessage } from '@/lib/actions'

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

  // message

  const messages = [
    {
      id: 1,
      message: 'Hello, how are you?',
      sender: 'John Doe',
      time: '12:00',
    },
    {
      id: 2,
      message: 'I am fine, thank you.',
      sender: 'Jane Doe',
      time: '12:01',
    },
    {
      id: 3,
      message: 'How are you?',
      sender: 'John Doe',
      time: '12:02',
    },
    {
      id: 4,
      message: 'I am fine, thank you.',
      sender: 'Jane Doe',
      time: '12:03',
    },
    {
      id: 5,
      message: 'How are you?',
      sender: 'John Doe',
      time: '12:04',
    },
  ]

  ///

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

  console.log(messagesArr)
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

        <div className='grid grid-cols-3 gap-4 h-[60svh]'>
          <section className='col-span-2 bg-gray-200 bg-opacity-20 p-4 rounded-md border'>
            <h1 className='raleway font-bold text-xl'>Messages</h1>
            <hr className='border-opacity-25 border-zinc-300 mb-2 mt-1' />
            {/* messages list  */}
            <div>
              {messagesArr.map(({ id, text, user, createdAt }) => (
                <Message
                  key={id}
                  message={text}
                  sender={user.username}
                  time={createdAt.toString()}
                />
              ))}
            </div>
            <form action={sendMessage} className='flex gap-2'>
              <input
                type='hidden'
                name='groupId'
                value={userGroupDetails.group.id}
              />
              <input
                type='hidden'
                name='groupSlug'
                value={userGroupDetails.group.slug}
              />
              <input
                type='text'
                placeholder='Enter a text'
                name='message'
                className='w-full px-4 py-2 bg-transparent border outline-none rounded-md'
              />
              <button className='bg-zinc-200 border rounded-md text-zinc-700 px-4 '>
                Send
              </button>
            </form>
          </section>

          <section className=' bg-gray-200 bg-opacity-20 p-4 rounded-md border'>
            <h1 className='raleway font-bold text-xl'>Moments</h1>
            <hr className='border-opacity-25 border-zinc-300 mb-2 mt-1' />
          </section>
        </div>
        {userGroupDetails.group.creatorId === user?.id ? (
          <DeleteOrLeaveButton value='delete' />
        ) : (
          <DeleteOrLeaveButton value='leave' />
        )}
      </main>
    </>
  )
}
