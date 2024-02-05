'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DeleteOrLeaveButton({ value }: { value: string }) {
  const pathname = usePathname()
  return (
    <>
      {value == 'delete' ? (
        <Link className='px-4 py-2 border-red-200 bg-red-600 rounded-md  inline-block' href={`${pathname}/delete`}>
          Delete group
        </Link>
      ) : (
        <Link className='px-4 py-2 border-red-200 bg-red-600 rounded-md  inline-block' href={`${pathname}/leave`}>
          Leave group
        </Link>
      )}
    </>
  )
}
