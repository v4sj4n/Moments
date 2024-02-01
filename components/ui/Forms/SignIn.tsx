'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation"
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'


const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(64),
})

export const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>("")
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const validation = LoginFormSchema.safeParse({ email, password })
      if (!validation.success) {
        const firstIssue = validation.error.issues[0]
        setError(`Problem in: ${firstIssue.path[0]} | ${firstIssue.message}`)
      } else {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/dashboard",
        })
        if (!res?.error) {
          const routeToPush = "/dashboard"
          router.push(routeToPush)
        } else {
          setError("Invalid email or password")
        }
      }
    } catch (error) {}
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
        type='password'
        placeholder='enter a password'
        name='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='h-8 accent-color-bg  rounded-[10px] font-bold border accent-color-border'>
        sign in
      </button>
      <Link href='/auth/sign-up' className='text-right text-sm'>Want to sign up instead</Link>
    </form>
  )
}
