import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up | Moments',
  description:
    'Sign up to your account in Moments to join your favorite groups and create ones',
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
