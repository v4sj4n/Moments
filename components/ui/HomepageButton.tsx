'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function HomepageButton() {
  const user = useSession()

  if (!user.data) {
    return (
      <Link
        href='/auth/sign-up'
        className='h-8 accent-color-bg w-72 rounded-[10px] flex justify-center items-center font-bold'
      >
        get started
      </Link>
    )
  }
if (user.data) {
  return (
    <Link
      href='/dashboard'
      className='h-8 accent-color-bg w-72 rounded-[10px] flex justify-center items-center font-bold'
    >
      go to dashboard
    </Link>
  )
}
}
