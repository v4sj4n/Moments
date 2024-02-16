'use client'

import { useEffect, useState } from 'react'
import UserListModal from '@/components/UserListModal'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@clerk/nextjs'

export default function SeeMembersButton({
  slug,
  groupId,
}: {
  slug: string
  groupId: string
}) {
  const user = useAuth()
  const [members, setMembers] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserList = async () => {
      const users = await supabase
        .from("UserGroup")
        .select(   
             `
             id,    
        Group(
          id,
          slug,
          creatorId
        ),
        User(
          id,
          username
        ),
        isAdmin
        `)
        .filter('Group.slug', 'eq', slug)
        .order("isAdmin", {ascending: false})
        .not("Group", "is", null)
        setMembers(users.data)
    }
    const fetchIsAdmin = async () => {
      const isAdmin = await supabase
        .from('UserGroup')
        .select(
          `
        Group(
          slug
        ),
        User(
          id
        ),
        isAdmin
        `
        )
        .eq('Group.slug', slug)
        .eq('User.id', user.userId)
        .not('Group', 'is', null)
        .not('User', 'is', null)

      setIsAdmin(isAdmin.data![0].isAdmin)
    }
    fetchUserList()
    fetchIsAdmin()
  }, [isOpen, slug, user.userId])

  const closeModal = () => setIsOpen(false)
  return (
    <div>
      <UserListModal
        isOpen={isOpen}
        closeModal={closeModal}
        slug={slug}
        groupId={groupId}
        members={members}
        isAdmin={isAdmin}
      />
      <button className='hover:underline font-bold' onClick={() => setIsOpen(true)}>See Members</button>
    </div>
  )
}
