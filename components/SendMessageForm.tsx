'use client'
import { sendMessage } from '@/lib/actions'
import { useFormStatus } from 'react-dom'
export default function SendMessageForm({
  id,
  slug,
}: {
  id: string
  slug: string
}) {
  const { pending } = useFormStatus()
  return (
    <form action={sendMessage} className='flex gap-2 col-span-1'>
      <input type='hidden' name='groupId' value={id} />
      <input type='hidden' name='groupSlug' value={slug} />
      <input
        type='text'
        placeholder='Enter a message'
        name='message'
        className='w-full px-4 py-2 bg-transparent border outline-none rounded-md'
      />
      {pending ? (
        <button
          className='bg-zinc-400 border rounded-md text-zinc-700 px-4 font-bold '
          disabled
        >
          Sending...
        </button>
      ) : (
        <button className='bg-zinc-200 border rounded-md text-zinc-700 px-4 font-bold '>
          Send
        </button>
      )}
    </form>
  )
}
