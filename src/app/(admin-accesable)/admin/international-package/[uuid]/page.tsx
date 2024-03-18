import type { Metadata } from 'next'
import Layout from '../../components/Layout'
import { fetchInternationalPackage } from '@/actions'
import InternationalPackageDisplayDetail from '@/app/(admin-accesable)/admin/international-package/[uuid]/international-package-display-detail'

export const revalidate = 0

const title = '国际包裹详情'
export const metadata: Metadata = {
  title,
}

export default async function Page({ params }: { params: { uuid: string } }) {
  const internationalPackage = await fetchInternationalPackage(params.uuid)
  return (
    <Layout title={title}>
      <InternationalPackageDisplayDetail defaultValues={internationalPackage} />
    </Layout>
  )
}
