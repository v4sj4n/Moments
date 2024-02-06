'use server'

import { currentUser } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'
import { supabase } from './supabase'

export const createGroup = async (formData: FormData) => {
  const user = await currentUser()
  const userId = user!.id
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  // slug logic
  let slug = title.split(' ').join('-') + '-' + user!.username?.slice(0, 3)

  const doesSlugExist = await supabase
    .from('Group')
    .select('slug')
    .eq('slug', slug)
  if (doesSlugExist.data && doesSlugExist.data.length > 0) {
    slug = slug + '-' + Math.random().toString(36).substring(7)
  }

  // joincode logic
  let joinCode = Math.random().toString(36).slice(2)

  const doesJoinCodeExist = await supabase
    .from('Group')
    .select('slug')
    .eq('slug', slug)
  if (doesJoinCodeExist.data && doesJoinCodeExist.data.length > 0) {
    joinCode = Math.random().toString(36).slice(2)
  }

  const groupCreation: any = await supabase
    .from('Group')
    .insert({
      title,
      description,
      slug,
      joinCode,
      creatorId: userId,
    })
    .select()

  if (!groupCreation.error) {
    const userGroupCreation = await supabase.from('UserGroup').insert({
      userId,
      groupId: groupCreation.data[0].id,
      isAdmin: true,
    })
    if (!userGroupCreation.error) {
      redirect('/dashboard')
    } else {
      throw new Error("Couldn't create user group")
    }
  } else {
    throw new Error("Couldn't create group")
  }
}

export const joinGroup = async (formData: FormData) => {
  const joinCode = formData.get('joinCode') as string
  const user = await currentUser()
  const userId = user!.id

  const group = await supabase
    .from('Group')
    .select('id')
    .filter('joinCode', 'eq', joinCode)

  if (!group.error) {
    const userAddition = await supabase.from('UserGroup').insert({
      userId,
      groupId: group.data[0].id,
      isAdmin: false,
    })

    if (!userAddition.error) {
      redirect('/dashboard')
    } else {
      throw new Error("Couldn't add user to group")
    }
  } else {
    notFound()
  }
}

export const deleteGroup = async (formData: FormData) => {
  const groupId = formData.get('groupId') as string
  await supabase.from('Group').delete().eq('id', groupId)
  redirect('/dashboard')
}

export const leaveGroup = async (formData: FormData) => {
  const groupId = formData.get('groupId') as string
  const user = await currentUser()
  const userId = user!.id as string

  const deleteGroup = await supabase
    .from('UserGroup')
    .delete()
    .eq('groupId', groupId)
    .eq('userId', userId)
  if (!deleteGroup.error) {
    redirect('/dashboard')
  } else {
    throw new Error('Error while leavinf')
  }
}

export const sendMessage = async (formData: FormData) => {
  const user = await currentUser()
  const userId = user!.id
  const groupId = formData.get('groupId') as string
  const message = formData.get('message') as string

  await supabase.from('Message').insert({
    message,
    userId,
    groupId,
  })
}
