'use client'
import { Trash } from '@phosphor-icons/react'

export default function Message({
  sender,
  message,
  time,
}: {
  sender: string
  message: string
  time: string
}) {
  let options: any = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const date = new Intl.DateTimeFormat('gb-En', options).format(new Date(time))

  return (
    <div className='mb-2'>
      <div className='flex justify-between'>
        <h3 className='raleway font-bold'>
          <span className='accent-color'>{sender}</span>:
        </h3>

        <p className='raleway text-gray-300 text-opacity-50'>{date}</p>
      </div>
      <p className='break-words col-span-11'>{message}</p>
    </div>
  )
}
