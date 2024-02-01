'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export const Signup = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const [error, setError] = useState<string | null>("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          username,
          password,
          confirm,
        }),
      })
      if (res.ok) {
        signIn()
      } else {
        setError((await res.json()).error)
      }
    } catch (err: any) {
      setError(err?.message)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        className='raleway py-2 px-4 bg-transparent border-white border rounded-[10px]'
        type='email'
        placeholder='enter an email'
        name='email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='raleway py-2 px-4 bg-transparent border-white border rounded-[10px]'
        type='text'
        placeholder='enter a username'
        name='username'
        id='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className='raleway py-2 px-4 bg-transparent border-white border rounded-[10px]'
        type='password'
        placeholder='enter a password'
        name='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className='raleway py-2 px-4 bg-transparent border-white border rounded-[10px]'
        type='password'
        placeholder='confirm password'
        name='confirmPassword'
        id='confirmPassword'
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      {error && <p>{error}</p>}

      <button className='h-8 accent-color-bg  rounded-[10px] font-bold border accent-color-border'>
        sign up
      </button>
      <Link href='/auth/sign-in' className='text-right text-sm'>Want to sign in instead</Link>


    </form>
  )
}
