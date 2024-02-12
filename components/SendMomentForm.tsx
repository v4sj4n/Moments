'use client'

import { createMoment } from '@/lib/actions'
import Button from './Button'
import { useRef, useState } from 'react'
import { FileImage } from '@phosphor-icons/react'
import Image from 'next/image'

type Props = {
  groupId: string
  slug: string
}

export default function SendMomentForm({ groupId, slug }: Props) {
  const fileUploadInput = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<any>()
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
      <label
        htmlFor='description'
        className='flex flex-col raleway text-lg mb-1'
      >
        Image{' '}
        {image ? (
          <>
            <span className='-mt-1 text-sm text-gray-300'>
              (Click on the image to remove and select another one)
            </span>
          </>
        ) : (
          ''
        )}
      </label>
      <input
        type='file'
        ref={fileUploadInput}
        hidden
        id='image'
        name='image'
        accept='image/*'
        required
        onChange={(e) => {
          if (!e.target.files![0].type.startsWith('image/')) return
          console.log(e.target.value)
          setImage(e.target.files![0])
        }}
      />
      <button
        className={`${
          image
            ? 'hidden'
            : ' flex items-center gap-x-2 px-4 py-2 rounded-md bg-transparent border outline-none'
        }`}
        type='button'
        onClick={() => fileUploadInput.current?.click()}
      >
        <FileImage size={20} className={!image ? '' : 'hidden'} />
        select an image
      </button>
      {image && (
        <Image
          src={URL.createObjectURL(image)}
          alt='Uploaded Image'
          width={200}
          height={200}
          className='w-full h-60 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed'
          onClick={() => {
            setImage(null)
            if (fileUploadInput.current) {
              fileUploadInput.current.value = ''
            }
          }}
        />
      )}
      <input type='hidden' name='groupId' id='groupId' value={groupId} />
      <input type='hidden' name='groupSlug' id='groupSlug' value={slug} />

      <Button value='Create a moment' valueLoading='Creating a moment' />
    </form>
  )
}
