'use client'

import { supabase } from '@/lib/supabase'
import Message from './Message'
import { useEffect, useRef, useState } from 'react'
import SendMessageForm from './SendMessageForm'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'

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
    }
    fetchMessages()
    setLoading(false)
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
    <motion.section
      className='h-[70svh] sm:h-[65svh] col-span-2 flex flex-col gap-y-3 bg-gray-100 bg-opacity-10 p-4 rounded-lg border'
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      transition={{
        ease: 'linear',
        duration: 0.5,
      }}
    >
      <h1 className='pl-2 raleway tracking-tight font-bold text-2xl'>
        Messages
      </h1>
      <div className='pl-2 flex flex-col justify-start overflow-y-auto flex-grow'>
        {loading ? (
          <div className='flex flex-1'>
            <p>Loading...</p>
          </div>
        ) : messagesArr?.length ? (
          <div className='flex flex-1 flex-col gap-y-4 overflow-y-auto'>
            {messagesArr.map(({ id, message, User, createdAt, editable }) => (
              <Message
                key={id}
                message={message}
                sender={User.username}
                time={createdAt.toString()}
                myMessage={editable}
                messageId={id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className='flex-1 flex-col overflow-y-auto'>
            <p className=' text-white opacity-50 text-sm'>No messages yet...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <SendMessageForm id={groupId} slug={groupSlug} />
    </motion.section>
  )
}
