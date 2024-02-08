import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Suspense } from "react"
import Moment from "./Moment"

export default async function Moments({ slug }: { slug: string}) {
  const moments = await supabase.from("Moment").select(`
  id,
  title,
  description,
  momentImagesList,
  date,
  Group(
    id,
    slug
  )
  `)
  .eq("Group.slug", slug)
  .not("Group", "is", null)


  return (
    <section className='h-[70svh] grid grid-rows-12 bg-gray-100 bg-opacity-10 p-4 rounded-lg border '>
      <div className="row-span-11">
        <h1 className='raleway font-bold text-xl'>Moments</h1>
        <hr className='border-opacity-25 border-zinc-300 mb-2 mt-1' />
        <Suspense fallback={<p>loading moments...</p>}>
          {moments.data === null ? (
            <p>No moments</p>
          ) : (
            <div className="md:h-[60svh] h-[50svh] flex flex-col gap-y-2 overflow-y-auto">
              {moments.data.map((moment: any) => (
                <Moment key={moment.id} moment={moment}  slug={slug}/>
              ))}
            </div>
          )}
        </Suspense>
      </div>
      <Link className="self-end w-full bg-zinc-200 border rounded-md text-zinc-700 px-4 py-2 text-center font-bold" href={`/group/${slug}/create-moment`}>Create a moment</Link>
    </section>
  )
}
