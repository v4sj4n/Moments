'use server'

import { currentUser } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'
import { supabase } from './supabase'
import { v4 as uuidv4 } from 'uuid'

export const createGroup = async (formData: FormData) => {
  const user = await currentUser()
  const userId = user!.id
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  if (!title || !description) throw new Error('Title or description missing')

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

  if (!joinCode) throw new Error('No join code provided')
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
  const groupSlug = formData.get('groupSlug') as string

  if (!groupId) throw new Error('No group id')
  const groupImages = await supabase
    .from('Moment')
    .select(
      `
  Group(
    id,
    slug
    ),
    momentImagesList
    `
    )
    .eq('Group.id', groupId)
    .not('Group', 'is', null)

  const arrWithImagesToDelete = <string[]>[]
  groupImages.data?.forEach((el: any) => {
    arrWithImagesToDelete.push(
      `moments/${el.Group.slug!}/${el.momentImagesList[0]}`
    )
  })

  const imagesDeletion = await supabase.storage
    .from('moment')
    .remove(arrWithImagesToDelete)

  if (!imagesDeletion.error) {
    const delGr = await supabase.from('Group').delete().eq('id', groupId)
    if (!delGr.error) {
      redirect('/')
    } else {
      throw new Error('Error while leavinf')
    }
  } else {
    throw new Error('Error while leavinf')
  }
}

export const leaveGroup = async (formData: FormData) => {
  const groupId = formData.get('groupId') as string
  if (!groupId) throw new Error('No group id provided')
  const user = await currentUser()
  const userId = user!.id as string

  const deleteUserGroup = await supabase
    .from('UserGroup')
    .delete()
    .eq('groupId', groupId)
    .eq('userId', userId)

  if (!deleteUserGroup.error) {
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

  if (!message || !groupId) throw new Error('Missing data')

  await supabase.from('Message').insert({
    message,
    userId,
    groupId,
  })
}

export const createMoment = async (formData: any) => {
  const user = await currentUser()
  const userId = user?.id
  let image = formData.get('image') as any
  const newImageName = uuidv4() + '.' + image.name.split('.').at(-1)
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const groupId = formData.get('groupId') as string
  const groupSlug = formData.get('groupSlug') as string
  const date = formData.get('date') as string

  if (!title || !description || !groupId || !groupSlug || !date || !image)
    throw new Error('Missing data')

  const selectedDate = new Date(date)
  const today = new Date()

  if (selectedDate > today) {
    throw new Error('The selected date cannot be in the future.')
  }

  const fileUpload = await supabase.storage
    .from('moment')
    .upload(`moments/${groupSlug}/${newImageName}`, image)

  if (!fileUpload.error) {
    const momentCreation = await supabase.from('Moment').insert({
      title,
      description,
      momentImagesList: [newImageName],
      userId,
      groupId,
      date,
    })
    if (!momentCreation.error) {
      redirect(`/group/${groupSlug}`)
    } else {
      throw new Error("Couldn't create moment")
    }
  } else {
    throw new Error("Couldn't upload image")
  }
}

export const deleteMessage = async (formData: FormData) => {
  const messageId = formData.get('messageId') as string
  if (!messageId) throw new Error('No message id provided')
  await supabase.from('Message').delete().eq('id', messageId)
}
export const editMessage = async (formData: FormData) => {
  const messageId = formData.get('messageId') as string
  const message = formData.get('message') as string
  if (!messageId || !message)
    throw new Error('No message id or message provided')

  await supabase.from('Message').update({ message }).eq('id', messageId)
}

export const deleteMoment = async (formData: FormData) => {
  const momentId = formData.get('momentId') as string
  const slug = formData.get('slug') as string

  if (!momentId || !slug)
    throw new Error('No moment id provided or no slug provided')
  const result = await supabase
    .from('Moment')
    .select('id, title, momentImagesList')
    .eq('id', momentId)

  const imageToDelete = await supabase.storage
    .from('moment')
    .remove([`moments/${slug}/${result.data![0].momentImagesList[0]}`])

  if (!imageToDelete.error) {
    const momentToDelete = await supabase
      .from('Moment')
      .delete()
      .eq('id', momentId)

    if (!momentToDelete.error) {
      return "Success"
    } else {
      throw new Error("Couldn't delete moment")
    }
  } else {
    throw new Error("Couldn't delete moment")
  }
}
