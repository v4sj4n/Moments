import { deleteMoment } from '@/lib/actions'
import { TrashSimple } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export default function Moment({
  moment,
  slug,
}: {
  moment: any
  slug: string
}) {
  const imageDir = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/moment/moments/${slug}/`
  const image = imageDir + moment.momentImagesList[0]
  const description =
    moment.description.split(' ').slice(0, 4).join(' ') + '...'
  return (
    <div className='flex justify-between items-center md:flex-row flex-col'>
      <div className='w-full flex justify-between  items-center'>
        <div className='flex flex-row items-center gap-x-4'>
          <Image
            className='rounded-lg'
            src={image}
            width={150}
            height={150}
            alt='Moment thumbnail'
          />
          <div>
            <h2 className='text-xl font-bold raleway'>{moment.title}</h2>
            <p className='text-gray-400'>{description}</p>
            <p className='sm:block hidden'>{moment.date}</p>
          </div>
        </div>
        <form action={deleteMoment}>
          <input type='hidden' name='momentId' value={moment.id} />
          <input type='hidden' name='slug' value={slug} />
          <button type='submit'>
            <TrashSimple className='text-red-600 mt-2' size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
