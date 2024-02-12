'use client'
import { Fragment, useRef, useState } from 'react'
import Image from 'next/image'

import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FileImage } from '@phosphor-icons/react'
import { useFormStatus } from 'react-dom'
import { createMoment } from '@/lib/actions'

type Props = {
  isOpen: boolean
  closeModal: () => void
  slug: string
  groupId: string
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      className={`w-full border border-[#F46464]  text-white rounded-md outline-none p-5 ${
        pending ? 'bg-zinc-600' : 'bg-zinc-800'
      }`}
      disabled={pending}
    >
      {pending ? 'Adding moment' : 'Add Moment'}
    </button>
  )
}

function CreateMomentModal({ isOpen, closeModal, groupId, slug }: Props) {
  const imagePickerRef = useRef<HTMLInputElement>(null)

  const fileUploadInput = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<any>()

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='form'
        className={'relative z-10'}
        action={(formData: FormData) => {
          createMoment(formData)
          setImage(null)
          closeModal()
        }}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25'></div>
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Panel
                className={
                  'w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-700 p-6 text-left align-middle shadow-xl transition-all'
                }
              >
                <Dialog.Title
                  as='h3'
                  className={'text-lg font-bold leading-6 text-white pb-2'}
                >
                  Moment Creation
                </Dialog.Title>

                <div className='mt-2'>
                  <input
                    type='text'
                    name='title'
                    id='title'
                    placeholder='Enter a title here...'
                    className='w-full border border-gray-300 text-zinc-800 rounded-md outline-none p-5 focus:border-4 focus:border-red-400'
                    min={3}
                    max={50}
                    required
                  />
                </div>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='description'
                    id='description'
                    placeholder='Enter a description here...'
                    className='w-full border border-gray-300 text-zinc-800 rounded-md outline-none p-5 focus:border-4 focus:border-red-400'
                    min={3}
                    required
                  />
                </div>
                <div className='mt-2'>
                  <input
                    type='date'
                    name='date'
                    id='date'
                    placeholder='Enter a title here...'
                    className='w-full border border-gray-300 text-zinc-800 rounded-md outline-none p-5 focus:border-4 focus:border-red-400'
                  />
                </div>

                <div className='mt-2 '>
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
                      setImage(e.target.files![0])
                    }}
                  />
                  <button
                    className={`flex items-center gap-x-2 w-full border border-gray-300 text-zinc-800 bg-white rounded-md outline-none p-5 focus:border-4 focus:border-red-400 ${
                      image ? 'hidden' : ''
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
                      className='w-full h-60 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed rounded-md'
                      onClick={() => {
                        setImage(null)
                        if (fileUploadInput.current) {
                          fileUploadInput.current.value = ''
                        }
                      }}
                    />
                  )}
                </div>
                <input
                  type='hidden'
                  name='groupId'
                  id='groupId'
                  value={groupId}
                />
                <input
                  type='hidden'
                  name='groupSlug'
                  id='groupSlug'
                  value={slug}
                />
                <div className='mt-2'>
                  <SubmitButton />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CreateMomentModal
