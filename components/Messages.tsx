'use client'

import { supabase } from '@/lib/supabase'
import Message from './Message'
import { useEffect, useRef, useState } from 'react'
import SendMessageForm from './SendMessageForm'
import { useUser } from '@clerk/nextjs'

type Message = {
  id: string
  message: string
  createdAt: string
  User: {
    id: string
    username: string
  }
  editable: boolean
}

export default function Messages({
  groupId,
  groupSlug,
}: {
  groupId: string
  groupSlug: string
}) {
  const [messagesArr, setMessagesArr] = useState<Message[] | null>([])
  const [loading, setLoading] = useState<boolean>(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const userData = useUser()

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await supabase
        .from('Message')
        .select(
          `id,
          message,
          createdAt,
          User(
            id,
            username
          ),
          Group(
            id
          )
    `
        )
        .filter('groupId', 'eq', groupId)
        .order('createdAt', { ascending: true })
        .limit(200)

      const data: Message[] | any = userData.isLoaded
        ? messages.data!.map((message: any) => {
            if (message.User.id === userData.user?.id) {
              return {
                ...message,
                editable: true,
              }
            } else {
              return {
                ...message,
                editable: false,
              }
            }
          })
        : null
      setMessagesArr(data)
      setLoading(false)
    }
    fetchMessages()
  }, [groupId, userData.isLoaded, userData.user?.id])

  useEffect(() => {
    const userFinder = async (id: string) => {
      const { data, error } = await supabase
        .from('User')
        .select('username')
        .eq('id', id)
      if (error) {
        console.error(error)
      } else {
        return data[0].username
      }
    }

    const channel = supabase
      .channel('Message')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Message',
          filter: `groupId=eq.${groupId}`,
        },
        async (payload: any) => {
          if (payload.eventType === 'INSERT') {
            const obj = payload.new
            const user = await userFinder(obj.userId)

            const objToSend: Message = {
              id: obj.id,
              message: obj.message,
              createdAt: obj.createdAt,
              User: {
                id: obj.userId,
                username: user,
              },
              editable: obj.userId === userData.user?.id,
            }

            setMessagesArr((prevMessagesArr) => {
              return prevMessagesArr
                ? [...prevMessagesArr, objToSend]
                : [objToSend]
            })
          }
          if (payload.eventType === 'DELETE') {
            const messageId = payload.old

            setMessagesArr((prevMessagesArr: any) => {
              return prevMessagesArr?.filter((message: any) => {
                return message.id !== messageId.id
              })
            })
          }

          if (payload.eventType === 'UPDATE') {
            const obj = payload.new
            // map through the previous array and when the id matches the  payload.new.id, replace the message with the new message on obj.message
            setMessagesArr((prevMessagesArr: any) => {
              return prevMessagesArr?.map((message: any) => {
                if (message.id === obj.id) {
                  return {
                    ...message,
                    message: obj.message,
                  }
                } else {
                  return message
                }
              })
            })
            // setMessagesArr()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [groupId, userData.user?.id])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messagesArr])

  return (
    <section className='md:col-span-2 h-[70svh] grid grid-rows-7 bg-gray-100 bg-opacity-10 p-4 rounded-lg border'>
      <div className='row-span-1'>
        <h1 className='pl-2 raleway font-bold text-xl'>Messages</h1>
        <hr className='border-opacity-25 border-zinc-300 mb-2 mt-1' />
      </div>
      <div className='row-span-6 pl-2 flex flex-col justify-start overflow-y-auto'>
        {loading ? (
          <p>Loading...</p>
        ) : messagesArr?.length ? (
          messagesArr.map(({ id, message, User, createdAt, editable }) => (
            <Message
              key={id}
              message={message}
              sender={User.username}
              time={createdAt.toString()}
              myMessage={editable}
              messageId={id}
            />
          ))
        ) : (
          <p className='text-center text-gray-300'>No messages yet</p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <SendMessageForm id={groupId} slug={groupSlug} />
    </section>
  )
}
