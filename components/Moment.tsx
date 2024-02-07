import Image from 'next/image'

export default function Moment({ moment }: { moment: any }) {
  const imageDir =
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    '/storage/v1/object/public/moment/moments/'
  const description = moment.description.split(" ").slice(0,4).join(" ")+ "..."
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-x-4 items-center'>
      <Image
        className='rounded-lg'
        src={imageDir + moment.momentImagesList[0]}
        width={75}
        height={75}
        alt='Moment thumbnail'
      />
      <div>
        <h2 className='text-xl font-bold raleway'>{moment.title}</h2>
        <p className='text-gray-400'>{description}</p>
      </div>
      </div>
      <p>{moment.date}</p>
    </div>
  )
}
