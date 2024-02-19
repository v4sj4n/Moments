'use client'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import Moment from './Moment'
import CreateMomentModal from './CreateMomentModal'
import { useAuth } from '@clerk/nextjs'

type Props = {
  slug: string
  groupId: string
}

export default function Moments({ slug, groupId }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const [loading, setLoading] = useState<boolean>(true)

  const closeModal = () => setIsOpen(false)
  const [moments, setMoments] = useState<any[]>([])

  const user = useAuth()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchMoments = async () => {
      const moments = await supabase
        .from('Moment')
        .select(
          `
  id,
  title,
  description,
  momentImagesList,
  date,
  Group(
    id,
    slug
  )
  `
        )
        .eq('Group.slug', slug)
        .order('date', { ascending: true })
        .not('Group', 'is', null)

      setMoments(moments.data!)
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
    fetchMoments()
    fetchIsAdmin()

    setLoading(false)
  }, [isOpen, slug, user.userId])

  return (
    <>
      <CreateMomentModal
        isOpen={isOpen}
        closeModal={closeModal}
        slug={slug}
        groupId={groupId}
      />
      <section
        className='h-[70svh] sm:h-[65svh]  flex flex-col gap-y-2 bg-gray-100 bg-opacity-10 p-4 rounded-lg border'
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          ease: 'linear',
          duration: 0.5,
        }}
      >
        <h1 className='pl-2 raleway tracking-tight font-bold text-2xl'>
          Moments
        </h1>
        {loading ? (
          <div className='h-full flex-1 flex-col overflow-y-auto'>
            <p className='pl-2 text-white opacity-50 text-sm'>Loading...</p>
          </div>
        ) : moments.length === 0 || moments === null ? (
          <div className='h-full flex-1 flex-col overflow-y-auto'>
            <p className='pl-2 text-white opacity-50 text-sm'>No moments...</p>
          </div>
        ) : (
          <div className=' flex flex-1 flex-col gap-y-4 overflow-y-auto'>
            {moments.map((moment: any) => (
              <Moment
                key={moment.id}
                moment={moment}
                slug={slug}
                setMoments={setMoments}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
        <button
          className=' w-full bg-zinc-200 border rounded-md text-zinc-700 px-4 py-2  text-center font-bold'
          onClick={() => setIsOpen(true)}
        >
          Create a moment
        </button>
      </section>
    </>
  )
}
