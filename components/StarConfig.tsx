'use client'
import { makeAdmin, removeAdmin } from '@/lib/actions'
import { Star } from '@phosphor-icons/react'

type Props = {
  isAdmin: boolean
  member: any
  slug: string
  close: () => void
}

function StarConfig({ member, slug, isAdmin, close }: Props) {
  if (isAdmin) {
    return (
      <>
        {member.isAdmin && member.User.id === member.Group.creatorId ? (
          <Star size={20} weight='fill' className='text-yellow-400' />
        ) : member.isAdmin ? (
          <form
            action={(formData: FormData) => {
              removeAdmin(formData)
              close()
            }}
          >
            <input
              type='hidden'
              name='userAdminRecord'
              id='userAdminRecord'
              value={member.id}
            />
            <input type='hidden' name='groupSlug' id='groupSlug' value={slug} />
            <button type='submit'>
              <Star size={20} weight='fill' />
            </button>
          </form>
        ) : (
          <form
            action={(formData: FormData) => {
              makeAdmin(formData)
              close()
            }}
          >
            <input
              type='hidden'
              name='userAdminRecord'
              id='userAdminRecord'
              value={member.id}
            />
            <input type='hidden' name='groupSlug' id='groupSlug' value={slug} />
            <button type='submit'>
              <Star size={20} />
            </button>
          </form>
        )}
      </>
    )
  } else {
    return (
      <>
        {member.isAdmin && member.User.id === member.Group.creatorId ? (
          <Star size={20} weight='fill' className='text-yellow-400' />
        ) : member.isAdmin ? (
          <Star size={20} weight='fill' />
        ) : (
          <Star size={20} />
        )}
      </>
    )
  }
}

export default StarConfig
