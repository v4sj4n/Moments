import Navbar from '@/components/Navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create a group | Moments',
  description:
    'Create a group for you and your friends to save your favorite moments',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
