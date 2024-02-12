import type { Metadata } from 'next'
import { Poppins, Raleway } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'] })
const raleway = Raleway({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moments',
  description:
    'The place to chat with your friends and save all your favorite memories',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body className={`${raleway.className} ${poppins.className} mx-5 mt-5`}>

          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}
