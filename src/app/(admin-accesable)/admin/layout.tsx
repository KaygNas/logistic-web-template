import { auth, signIn } from '@/auth'
import { isAdmin } from '@/actions'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user?.id && await isAdmin(session.user.id))
    return children
  else
    return signIn()
}
