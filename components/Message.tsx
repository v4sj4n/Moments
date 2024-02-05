'use client'
export default function Message({
  sender,
  message,
  time,
}: {
  sender: string
  message: string
  time: string
}) {
  return (
    <div className="mb-2">
      <div className='flex justify-between'>
        <h3 className='raleway font-bold'>{sender}</h3>
        <p className='raleway text-gray-300 text-opacity-50'>{time}</p>
      </div>
      <p>{message}</p>
    </div>
  )
}
