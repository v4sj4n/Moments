import Button from '@/components/Button'
import { joinGroup } from '@/lib/actions'
import Link from 'next/link'

export default async function Page() {
  return (
    <main className='md:mx-20 mx-4 mt-5'>
      <h1 className='raleway text-3xl font-bold mb-8'>Join a group</h1>

      <form action={joinGroup} className='flex flex-col md:w-1/2 lg:w-1/3'>
        <label htmlFor='joinCode' className='block raleway text-lg mb-1'>
          Group&apos;s Join Code
        </label>
        <input
          type='text'
          name='joinCode'
          id='joinCode'
          className='block px-4 py-2 rounded-md bg-transparent border outline-none'
          placeholder="Enter a group's join code"
          min={10}
        />

        <Button value='Join a group' valueLoading='Joining a group' />
      </form>

      <Link
        className='inline-block mt-3 hover:underline'
        href={'/create-group'}
      >
        Create a group
      </Link>
    </main>
  )
}
