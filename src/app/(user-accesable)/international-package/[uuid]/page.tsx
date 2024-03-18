import type { Metadata } from 'next'
import UserInternationalPackageDisplay from './user-international-package-display'
import { fetchInternationalPackage } from '@/actions'

export const metadata: Metadata = {
  title: '国际包裹详情',
}

export default async function Page({
  params,
}: {
  params: {
    uuid: string
  }
}) {
  const data = await fetchInternationalPackage(params.uuid)
  return (
    <main className="p-4">
      <UserInternationalPackageDisplay data={data} />
    </main>
  )
}
