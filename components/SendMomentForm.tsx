'use client'

import { createMoment } from '@/lib/actions'
import Button from './Button'
import { useRef } from 'react'
import { FileImage } from '@phosphor-icons/react'

type Props = {
  groupId: string
  slug: string
}

export default function SendMomentForm({ groupId, slug }: Props) {
  const fileUploadInput = useRef<HTMLInputElement>(null)
  return (
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
        className='block px-4 py-2 rounded-md bg-transparent border outline-none text-white'
        placeholder='Moment date'
        max={new Date().toISOString().split('T')[0]}
        required
      />
      <label htmlFor='description' className='block raleway text-lg mb-1'>
        Image
      </label>
      <input
        type='file'
        ref={fileUploadInput}
        hidden
        id='image'
        accept='image/*'
        required
      />
      <button
        className=' flex items-center gap-x-2 px-4 py-2 rounded-md bg-transparent border outline-none'
        type='button'
        onClick={() => fileUploadInput.current?.click()}
      >
        <FileImage size={20} />
        upload an image
      </button>
      <input type='hidden' name='groupId' id='groupId' value={groupId} />
      <input type='hidden' name='groupSlug' id='groupSlug' value={slug} />

      <Button value='Create a moment' valueLoading='Creating a moment' />
    </form>
  )
}
