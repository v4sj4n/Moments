'use client'

import { supabase } from "@/lib/supabase"

export default function Message({
  sender,
  message,
  time,
}: {
  sender: string
  message: string
  time: string
}) {
  const date = time.split(' ').slice(0, 5).join(' ')

  return (
    <div className='mb-2'>
      <div className='flex justify-between'>
        <h3 className='raleway font-bold'>
          <span className='accent-color'>{sender}</span>:
        </h3>

        <p className='raleway text-gray-300 text-opacity-50'>{date}</p>
      </div>
      <p>{message}</p>
    </div>
  )
}
