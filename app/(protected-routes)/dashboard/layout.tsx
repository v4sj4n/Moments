import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Moments',
  description:
    'Dashboard where you can see your joined groups or join a new one',
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
