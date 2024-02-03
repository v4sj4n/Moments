import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className='h-screen grid place-items-center'>
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 'accent-color-bg',
          },
        }}
      />
    </main>
  )
}
