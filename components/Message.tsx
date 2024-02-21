'use client'
import { deleteMessage, editMessage } from '@/lib/actions'
import {
  PaperPlaneRight,
  PencilSimple,
  Prohibit,
  TrashSimple,
} from '@phosphor-icons/react'
import { useState } from 'react'

export default function Message({
  sender,
  message,
  time,
  messageId,
  myMessage,
}: {
  sender: string
  message: string
  time: string
  messageId: string
  myMessage: boolean
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

  const [isToBeEditted, setIsToBeEditted] = useState<boolean>(false)

  return (
    <div className='mb-2'>
      {!isToBeEditted ? (
        <div className='flex justify-between'>
          <div>
            <h3 className='raleway font-bold'>
              <span className='accent-color'>{sender}</span>:
            </h3>
            <p className='break-words col-span-11 line-clamp'>{message}</p>
          </div>

          <div>
            <p className='raleway text-gray-300 text-opacity-50 text-xs'>
              {date}
            </p>
            {myMessage && (
              <div className='flex justify-end'>
                <button
                  className='ml-auto block'
                  title='Edit'
                  onClick={() => setIsToBeEditted(true)}
                >
                  <PencilSimple className='text-gray-400 mt-2' size={20} />
                </button>
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
              </div>
            )}
          </div>
        </div>
      ) : (
        <form
          action={editMessage}
          className='flex justify-between'
          onSubmit={() => setIsToBeEditted(false)}
        >
          <input
            type='hidden'
            name='messageId'
            id='messageId'
            value={messageId}
          />
          <input
            type='text'
            name='message'
            id='message'
            className='bg-transparent border py-1 px-2 rounded-md'
            placeholder={message}
          />

          <div>
            <button title='cancel'>
              <Prohibit className='text-red-600 mt-2' size={20} />
            </button>
            <button type='submit'>
              <PaperPlaneRight className='text-green-600 mt-2' size={20} />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
