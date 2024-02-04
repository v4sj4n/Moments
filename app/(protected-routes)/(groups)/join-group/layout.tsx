import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join a group | Moments',
  description:
    'Join a group your friends have created to save your favorite moments together',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <body>{children}</body>
}
