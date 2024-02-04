'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DeleteOrLeaveButton({ value }: { value: string }) {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <>
      {value == 'delete' ? (
        <Link className='inline-block' href={pathname + '/delete'}>
          Delete group
        </Link>
      ) : (
        <Link className='inline-block' href={pathname + '/leave'}>
          Leave group
        </Link>
      )}
    </>
  )
}
