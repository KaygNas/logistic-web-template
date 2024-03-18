import type { Metadata } from 'next'
import Layout from '../components/Layout'
import DomesticPackageStock from './components/DomesticPackageStock'

export const revalidate = 0

const title = '国内包裹入库'
export const metadata: Metadata = {
  title,
}

export default async function Page() {
  return (
    <Layout title={title}>
      <DomesticPackageStock />
    </Layout>
  )
}
