import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Started | Moments',
  description: 'Get started by creating or joining a group',
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
