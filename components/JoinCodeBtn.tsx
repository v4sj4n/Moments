'use client'

export default function JoinCodeBtn({ joinCode }: { joinCode: string }) {
  console.log(joinCode)
  const handleClick = () => {
    navigator.clipboard.writeText(joinCode)
  }
  return (
    <p
      className='mt-2 accent-color-bg inline-block px-2 rounded hover:cursor-pointer hover:bg-red-500 active:bg-red-700'
      onClick={handleClick}
    >
      Copy Join Code
    </p>
  )
}
