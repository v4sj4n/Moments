'use client'

import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const user = useSession()
  const [loading, setLoading] = useState(true)
  console.log(user)

  const [userLetter, setUserLetter] = useState('')

  useEffect(() => {
    if (user?.data?.user?.email) {
      setUserLetter(user.data.user.email[0])
      setLoading(false)
    } else {
      setUserLetter("")
      setLoading(false)
    }
  }, [user])

  const handleClick = () => signOut()
  if (loading) return <p>Loading...</p>
  if (userLetter.length > 0) {
    return (
      <nav className='mx-16 my-8 flex justify-between items-center'>
        <h2 className='poppins text-5xl font-bold text-center'>
          Moments<span className='accent-color'>.</span>
        </h2>

        <p
          onClick={handleClick}
          className='accent-color-bg raleway rounded-full text-4xl px-6 py-4 hover:cursor-pointer'
        >
          {userLetter && userLetter}
        </p>
      </nav>
    )
  }
  if (userLetter.length === 0)
    return (
      <nav>
        <h2 className='poppins text-5xl font-bold text-center m-10'>
          Moments<span className='accent-color'>.</span>
        </h2>
      </nav>
    )
}
