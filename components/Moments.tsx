'use client'
import { supabase } from '@/lib/supabase'
import { Suspense, useEffect, useState } from 'react'
import Moment from './Moment'
import ModalOpener from './ModalOpener'
import CreateMomentModal from './CreateMomentModal'

type Props = {
  slug: string
  groupId: string
}

export default function Moments({ slug, groupId }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)
  const [moments, setMoments] = useState<any[]>([])
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
    fetchMoments()
  }, [slug, isOpen])

  return (
    <>
      <CreateMomentModal
        isOpen={isOpen}
        closeModal={closeModal}
        slug={slug}
        groupId={groupId}
      />
      <section className='h-[70svh] grid grid-rows-12 bg-gray-100 bg-opacity-10 p-4 rounded-lg border  '>
        <div className='row-span-11'>
          <h1 className='raleway font-bold text-xl'>Moments</h1>
          <hr className='border-opacity-25 border-zinc-300 mb-2 mt-1' />
          <Suspense fallback={<p>loading moments...</p>}>
            {moments === null ? (
              <p>No moments</p>
            ) : (
              <div className='md:h-[60svh] h-[50svh] flex flex-col gap-y-4 overflow-y-auto'>
                {moments.map((moment: any) => (
                  <Moment key={moment.id} moment={moment} slug={slug} />
                ))}
              </div>
            )}
          </Suspense>
        </div>
        <button
          className='self-end w-full bg-zinc-200 border rounded-md text-zinc-700 px-4 py-2 text-center font-bold'
          onClick={() => setIsOpen(true)}
        >
          Create a moment
        </button>
      </section>
    </>
  )
}
