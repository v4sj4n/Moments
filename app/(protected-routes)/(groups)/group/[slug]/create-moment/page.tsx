import Navbar from '@/components/Navbar'
import SendMomentForm from '@/components/SendMomentForm'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
  const groupData = await supabase
    .from('Group')
    .select(
      `
  id,
  slug
  `
    )
    .eq('slug', params.slug)

  if (groupData.data === null || groupData.error) {
    redirect('/')
  }

  const groupId = groupData.data[0].id
  return (
    <>
      <Navbar />
      <main className='md:mx-20 mx-4 mt-5'>
        <h1 className='raleway md:text-3xl mb-4 text-2xl font-bold '>
          Create your moment to remember
        </h1>

        <SendMomentForm groupId={groupId} slug={params.slug} />
      </main>
    </>
  )
}
