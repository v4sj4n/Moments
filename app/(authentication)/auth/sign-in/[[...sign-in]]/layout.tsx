import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in | Moments',
  description: 'Sign in to your account in Moments to access your groups',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
