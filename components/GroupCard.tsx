import Link from 'next/link'

export default function GroupCard({
  group,
}: {
  group: { title: string; description: string; slug: string }
}) {
  return (
    <div className='border-2 px-4 py-2 rounded-md w-1/6'>
      <Link href={`/group/${group.slug}`}>
        <h2 className='raleway font-bold group-title text-2xl accent-color-underline-h'>
          {group.title}
        </h2>
      </Link>
      <p className='raleway text-md text-gray-300 group-description lowercase'>
        {group.description}
      </p>
    </div>
  )
}
