import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const UserRegisterSchema = z.object({
  email: z.string().email(),
  username: z.string().min(6),
  password: z.string().min(6).max(64),
  confirm: z.string().min(6).max(64),
})

export const POST = async (req: Request) => {
  const { email, username, password, confirm } = await req.json()

  const validation = UserRegisterSchema.safeParse({
    email,
    username,
    password,
    confirm,
  })

  if (!validation.success) {
    const firstIssue = validation.error.issues[0]
    return NextResponse.json(
      { error: `Problem in: ${firstIssue.path[0]} | ${firstIssue.message}` },
      { status: 400 }
    )
  }

  if (password !== confirm) {
    return NextResponse.json(
      { error: 'Passwords do not match' },
      { status: 400 }
    )
  }

  const isEmailAlreadyRegistered = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (isEmailAlreadyRegistered)
    return NextResponse.json(
      { error: 'User with that email exists' },
      { status: 400 }
    )

  const isUsernameAlreadyRegistered = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (isUsernameAlreadyRegistered) {
    return NextResponse.json(
      { error: 'User with that username exists' },
      { status: 400 }
    )
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: await hash(password, 10),
      },
    })

    return NextResponse.json(
      {
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
        },
      },
      { status: 201 }
    )
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
