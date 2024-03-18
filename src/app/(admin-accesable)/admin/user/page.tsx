import type { Metadata } from 'next'
import Layout from '../components/Layout'
import UserDisplay from './components/UserDisplay'
import { fecthUsers } from '@/actions'

export const revalidate = 0

const title = '用户管理'
export const metadata: Metadata = {
  title,
}

export default async function Page() {
  const users = await fecthUsers()
  return (
    <Layout title={title}>
      <UserDisplay defaultValues={users} />
    </Layout>
  )
}
