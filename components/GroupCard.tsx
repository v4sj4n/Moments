import Link from 'next/link'

export default function GroupCard({
  group,
}: {
  group: { title: string; description: string; slug: string }
}) {
  return (
    <div className='border-2 p-4 rounded-xl'>
      <Link href={`/group/${group.slug}`}>
        <h2 className='raleway font-bold group-title text-2xl accent-color-underline-h'>
          {group.title}
        </h2>
      </Link>
      <p className='raleway text-sm text-gray-300 group-description lowercase'>
        {group.description}
      </p>
    </div>
  )
}
