'use server'

import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'

export const createGroup = async (formData: FormData) => {
  const user = await currentUser()
  const userId = user!.id
  const userName = user!.username?.slice(0, 3)
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  const slug = title.split(' ').join('-') + '-' + userName

  const group = await prisma.group.create({
    data: {
      title,
      description,
      slug,

      creator: {
        connect: {
          id: userId,
        },
      },
    },
  })
  if (group) {
    await prisma.userGroup.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        group: {
          connect: {
            id: group.id,
          },
        },
        isAdmin: true,
        groupTitle: title,
        groupDescription: description,
        groupSlug: slug,
      },
    })
    redirect('/dashboard')
  } else {
    throw new Error("Couldn't create group")
  }
}

export const joinGroup = async (formData: FormData) => {
  const joinCode = formData.get('joinCode') as string
  const user = await currentUser()
  const userId = user!.id

  const group = await prisma.group.findFirst({
    where: {
      joincode: joinCode,
    },
  })

  if (group) {
    await prisma.userGroup.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        group: {
          connect: {
            id: group.id,
          },
        },
        groupTitle: group.title,
        groupDescription: group.description,
        groupSlug: group.slug,
      },
    })
    redirect('/dashboard')
  } else {
    notFound()
  }
}

export const deleteGroup = async (formData: FormData) => {
  const groupId = formData.get('groupId') as string

  await prisma.userGroup.deleteMany({
    where: {
      groupId,
    },
  })

  await prisma.group.delete({
    where: {
      id: groupId,
    },
  })

  redirect('/dashboard')
}

export const leaveGroup = async (formData: FormData) => {
  const groupId = formData.get('groupId') as string
  const user = await currentUser()
  const userId = user!.id as string

  const groupToDelete = await prisma.userGroup.findFirst({
    where: {
      AND: [
        {
          userId: userId,
        },
        {
          groupId: groupId,
        },
      ],
    },
  })
  if (groupToDelete) {
    await prisma.userGroup.delete({
      where: {
        id: groupToDelete?.id,
      },
    })

    redirect('/dashboard')
  } else {
    notFound()
  }
}
