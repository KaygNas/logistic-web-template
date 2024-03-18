import type { Metadata } from 'next'
import Layout from '../components/Layout'
import InternationalPackageDisplayList from '@/app/(admin-accesable)/admin/international-package/international-package-display-list'
import { fetchInternationPackages } from '@/actions'

export const revalidate = 0

const title = '国际包裹管理'
export const metadata: Metadata = {
  title,
}

export default async function Page() {
  const packages = await fetchInternationPackages()
  return (
    <Layout title={title}>
      <InternationalPackageDisplayList defaultValues={packages} />
    </Layout>
  )
}
