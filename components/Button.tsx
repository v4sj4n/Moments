'use client'
import { useFormStatus } from 'react-dom'

export default function Button({
  value,
  valueLoading,
}: {
  value: string
  valueLoading: string
}) {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <button
          className='raleway font-bold mt-6 w-full px-4 py-2 bg-red-400 rounded-lg'
          disabled
        >
          {valueLoading}
        </button>
      ) : (
        <button className='raleway font-bold mt-6 w-full px-4 py-2 accent-color-bg  rounded-lg'>
          {value}
        </button>
      )}
    </>
  )
}
