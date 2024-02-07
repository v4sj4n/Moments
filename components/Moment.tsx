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
  console.log(imageDir+moment.momentImagesList[0])
  const description =
    moment.description.split(' ').slice(0, 4).join(' ') + '...'
  return (
    <div className='flex justify-between items-center md:flex-row flex-col'>
      <div className='flex gap-x-4 items-center'>
        <Image
          className='rounded-lg'
          src={image}
          width={75}
          height={75}
          alt='Moment thumbnail'
        />
        <div>
          <h2 className='text-xl font-bold raleway'>{moment.title}</h2>
          <p className='text-gray-400'>{description}</p>
        </div>
      </div>
      <p className=''>{moment.date}</p>
    </div>
  )
}
