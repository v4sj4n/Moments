'use client'

export default function JoinCodeBtn({ joinCode }: { joinCode: string }) {
  const handleClick = () => {
    navigator.clipboard.writeText(joinCode)
  }
  return (
    <>
      <p
        className='mt-2 bg-red-500 inline-block p-2 rounded hover:cursor-pointer hover:bg-[#F46464] active:bg-red-700'
        onClick={handleClick}
      >
        Copy Join Code
      </p>
      <br />
    </>
  )
}
