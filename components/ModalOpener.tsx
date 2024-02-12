'use client'

import React, { useState } from 'react'
import CreateMomentModal from './CreateMomentModal'

type Props = {
  slug: string
  groupId: string
}

function ModalOpener({ slug, groupId }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)
  return (
    <>
      <CreateMomentModal
        isOpen={isOpen}
        closeModal={closeModal}
        slug={slug}
        groupId={groupId}
      />

      <button
        className='self-end w-full bg-zinc-200 border rounded-md text-zinc-700 px-4 py-2 text-center font-bold'
        // href={`/group/${slug}/create-moment`}
        onClick={() => setIsOpen(true)}
      >
        Create a moment
      </button>
    </>
  )
}

export default ModalOpener
