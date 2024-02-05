import Button from '@/components/Button'
import { createGroup } from '@/lib/actions'
import Link from 'next/link'
export default async function Page() {
  return (
    <main className='md:mx-20 mx-6 mt-5'>
      <h1 className='raleway text-3xl font-bold mb-8'>Create a group</h1>
      <form action={createGroup} className='flex flex-col md:w-1/2 lg:w-1/3'>
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

        <Button value='Create a group' valueLoading='Creating a group' />
      </form>
      <Link
        className='inline-block mt-3 hover:underline'
        href={'/join-group'}
      >
        Join a group
      </Link>
    </main>
  )
}
