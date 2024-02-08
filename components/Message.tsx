'use client'
import { deleteMessage } from '@/lib/actions'
import { Trash, TrashSimple } from '@phosphor-icons/react'

export default function Message({
  sender,
  message,
  time,
  editable,
  messageId,
}: {
  sender: string
  message: string
  time: string
  messageId: string
  editable: boolean
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
        <div>

        <h3 className='raleway font-bold'>
          <span className='accent-color'>{sender}</span>:

        </h3>
      <p className='break-words col-span-11'>{message}</p>

        </div>

        <div>
          <p className='raleway text-gray-300 text-opacity-50 text-xs'>
            {date}
          </p>
          {editable && (
            <form action={deleteMessage}>
              <input
                type='hidden'
                name='messageId'
                value={messageId}
                id='messageId'
              />
              <button className='ml-auto block' title='Delete'>
                <TrashSimple className='text-red-600 mt-2' size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
