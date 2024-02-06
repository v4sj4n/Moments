'use client'

import { supabase } from '@/lib/supabase'
import Message from './Message'
import { useEffect, useState } from 'react'
import SendMessageForm from './SendMessageForm'

type Message = {
  id: string
  text: string
  createdAt: string
  User: {
    username: string
  }
}

export default function Messages({
  groupId,
  groupSlug,
}: {
  groupId: string
  groupSlug: string
}) {
  const [messagesArr, setMessagesArr] = useState<Message[] | null>([])

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await supabase
        .from('Message')
        .select(
          `id,
          text,
          createdAt,
          User(
            username
          ),
          Group(
            id
          )
    `
        )
        .filter('groupId', 'eq', groupId)
        .order('createdAt', { ascending: true })

      const data: Message[] | any = messages.data
      console.log(data[0])
      console.log(groupId)
      setMessagesArr(data)
    }
    fetchMessages()
  }, [])

  return (
    <section className='md:col-span-2 h-[60svh] grid grid-rows-7 bg-gray-100 bg-opacity-10 p-4 rounded-lg border'>
      <div className='row-span-1'>
        <h1 className='pl-2 raleway font-bold text-xl'>Messages</h1>
        <hr className='border-opacity-25 border-zinc-300 mb-2 mt-1' />
      </div>
      <div className='row-span-6 pl-2 flex flex-col justify-start overflow-y-auto'>
        {messagesArr ? (
          messagesArr.map(({ id, text, User, createdAt }) => (
            <Message
              key={id}
              message={text}
              sender={User.username}
              time={createdAt.toString()}
            />
          ))
        ) : (
          <p className='text-center text-gray-300'>No messages yet</p>
        )}
      </div>
      <SendMessageForm id={groupId} slug={groupSlug} />
    </section>
  )
}
