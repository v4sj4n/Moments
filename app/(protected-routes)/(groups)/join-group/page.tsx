import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()
  const userId = user!.id

  const joinGroup = async (formData: FormData) => {
    'use server'
    const joinCode = formData.get('joinCode') as string

    const group = await prisma.group.findFirst({
      where: {
        joincode: joinCode,
      },
    })

    if (group) {
      await prisma.userGroup.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          group: {
            connect: {
              id: group.id,
            },
          },
          groupTitle: group.title,
          groupDescription: group.description,
          groupSlug: group.slug,
        },
      })
      redirect('/dashboard')
    } else {
      notFound()
    }
  }

  return (
    <main className='mx-10 mt-5'>
      <h1 className='raleway text-3xl font-bold mb-8'>Create a group</h1>

      <form action={joinGroup} className='flex flex-col w-1/4'>
        <label htmlFor='joinCode' className='block raleway text-lg mb-1'>
          Group&apos;s Join Code
        </label>
        <input
          type='text'
          name='joinCode'
          id='joinCode'
          className='block px-4 py-2  mb-3 rounded-md bg-transparent border outline-none'
          placeholder="Enter a group's join code"
          min={10}
        />

        <button className='raleway font-bold mt-6 w-full px-4 py-2 accent-color-bg rounded-lg'>
          Join
        </button>
      </form>
    </main>
  )
}
