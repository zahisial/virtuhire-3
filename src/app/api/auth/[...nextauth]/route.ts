// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions, Account, Profile, User, Session } from 'next-auth'
// For NextAuth v4+, JWT is in 'next-auth/jwt'
import type { JWT } from 'next-auth/jwt'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
      return true
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return session
    },
  },
  pages: {
    signIn: '/client/register',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }