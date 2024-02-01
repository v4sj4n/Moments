import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'
import { User, type NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user) return null

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )
        if (!isPasswordValid) return null
        return {
          id: `${user.id}`,
          name: user.name,
          email: user.email,
          username: user.username,
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
    
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          username: token.username,
          email: token.email,
        },
      }
    },
    jwt({ token, user }) {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          name: u.name,
          username: u.username,
          email: u.email,
        }
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
