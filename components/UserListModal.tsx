'use client'
import { Fragment } from 'react'
import Image from 'next/image'

import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Star, User } from '@phosphor-icons/react'
import { makeAdmin, removeAdmin } from '@/lib/actions'
import StarConfig from './StarConfig'

type Props = {
  isOpen: boolean
  closeModal: () => void
  slug: string
  groupId: string
  members: any[]
  isAdmin: boolean
}

function UserListModal({
  isOpen,
  closeModal,
  groupId,
  slug,
  members,
  isAdmin,
}: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className={'relative z-10'} onClose={closeModal}>
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
                  Members
                </Dialog.Title>

                {members.map((member) => {
                  return (
                    <div
                      key={member.id}
                      className='mt-2 flex justify-between p-5 border rounded-md'
                    >
                      <div className='flex gap-2 items-center'>
                        <User size={20} />
                        <h3>{member.User.username}</h3>
                      </div>
                      <StarConfig
                        isAdmin={isAdmin}
                        slug={slug}
                        member={member}
                        close={() => closeModal()}
                      />
                    </div>
                  )
                })}

                <div className='mt-2'></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UserListModal
