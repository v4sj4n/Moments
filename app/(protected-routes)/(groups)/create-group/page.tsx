import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
export default async function Page() {
  const user = await currentUser()
  const userId = user!.id
  const userName = user!.firstName?.slice(0, 3)

  const createGroup = async (formData: FormData) => {
    'use server'
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    const slug = title.toLowerCase().replace(' ', '-') + '-' + userName

    await prisma.group.create({
      data: {
        title,
        description,
        slug,

        creator: {
          connect: {
            id: userId,
          },
        },
      },
    })
    redirect('/dashboard')
  }
  return (
    <main className='mx-10 mt-5'>
      <h1 className='raleway text-3xl font-bold mb-8'>Create a group</h1>

      <form action={createGroup} className='flex flex-col w-1/4'>
        <label htmlFor='title' className='block raleway text-lg mb-1'>
          Group Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          className='block px-4 py-2  mb-3 rounded-md bg-transparent border outline-none'
          placeholder='Enter a group title'
          min={3}
          max={50}
        />
        <label htmlFor='description' className='block raleway text-lg mb-1'>
          Group Description
        </label>
        <input
          type='text'
          name='description'
          id='description'
          className='block px-4 py-2 rounded-md bg-transparent border outline-none'
          placeholder='Enter a group description'
          min={3}
          max={50}
        />

        <button className='raleway font-bold mt-6 w-full px-4 py-2 accent-color-bg rounded-lg'>
          Create
        </button>
      </form>
    </main>
  )
}
