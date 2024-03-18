import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { createAdmin, fetchAdmin } from './actions'

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  theme: { brandColor: '#2563EB', colorScheme: 'light', logo: '/signin_logo.png' },
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        username: { label: '帐号', placeholder: '请输入管理员帐号' },
        password: { label: '密码', type: 'password', placeholder: '请输入管理员密码' },
      },
      authorize: async (credentials) => {
        if (credentials.username && credentials.username === process.env.AUTH_ADMIN_USERNAME
          && credentials.password && credentials.password === process.env.AUTH_ADMIN_PASSWORD) {
          let admin = await fetchAdmin()
          if (!admin)
            admin = await createAdmin()
          return {
            id: admin.uuid,
            name: admin.nickname,
            role: admin.role,
          }
        }
        else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (trigger === 'signIn')
        token.user = user
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user as any
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
  trustHost: true,
  basePath: '/auth',
})
