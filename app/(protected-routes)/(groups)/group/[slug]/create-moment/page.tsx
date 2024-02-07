import Button from '@/components/Button'
import Navbar from '@/components/Navbar'
import { createMoment } from '@/lib/actions'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function Page({params}: {params: {slug: string}}) {
  const groupData = await supabase.from("Group").select(`
  id,
  slug
  `).eq("slug", params.slug)

  if(groupData.data === null || groupData.error) {
    redirect("/")
  }

  const groupId = groupData.data[0].id
  return (
    <>
      <Navbar />
      <main className='md:mx-20 mx-4 mt-5'>
        <h1 className='raleway md:text-3xl mb-4 text-2xl font-bold '>
          Create your moment to remember
        </h1>

        <form action={createMoment} className='flex flex-col md:w-1/2 lg:w-1/3'>
          <label htmlFor='title' className='block raleway text-lg mb-1'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            className='block px-4 py-2  mb-3 rounded-md bg-transparent border outline-none'
            placeholder='Moment title'
            min={3}
            max={50}
            required
          />
          <label htmlFor='description' className='block raleway text-lg mb-1'>
            Description
          </label>
          <input
            type='text'
            name='description'
            id='description'
            className='block px-4 py-2 rounded-md bg-transparent border outline-none'
            placeholder='Moment description'
            min={3}
            required
          />
          <label htmlFor='description' className='block raleway text-lg mb-1'>
            Date
          </label>
          <input
            type='date'
            name='date'
            id='date'

            className='block px-4 py-2 rounded-md bg-transparent border outline-none'
            placeholder='Moment date'
            max={new Date().toISOString().split("T")[0]}
            required
          />
          <label htmlFor='description' className='block raleway text-lg mb-1'>
            Image/s (max 4)
          </label>
          <input
            type='file'
            name='image'
            id='image'
            // multiple
            accept="image/*"
            className='block px-4 py-2 rounded-md bg-transparent border outline-none'
            placeholder='Moment date'
            required
          />
          <input type="hidden" name="groupId" id='groupId' value={groupId} />
          <input type="hidden" name="groupSlug" id='groupSlug' value={params.slug} />

          <Button value='Create a moment' valueLoading='Creating a moment' />
        </form>
      </main>
    </>
  )
}
