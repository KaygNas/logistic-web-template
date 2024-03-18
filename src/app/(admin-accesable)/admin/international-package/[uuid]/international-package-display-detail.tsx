'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import type { InternationalPackageDisplayProps } from '@/components/international-package/international-package-display'
import InternationalPackageDisplay from '@/components/international-package/international-package-display'
import { InternationalPackageStatusSelect } from '@/components/international-package/international-package-status-select'
import InternationalPackageActions from '@/components/international-package/international-package-actions'
import InternationalPackageOrderCreateDialog from '@/components/international-package/international-package-order-create-dialog'
import InternationalPackageOrderDisplay from '@/components/international-package/international-package-order-display'
import InternationalPackageOrderActions from '@/components/international-package/international-package-order-actions'
import RepackedDomesticPackageCreateButton from '@/components/international-package/repacked-domestic-package-create-button'
import RepackedDomesticPackageDisplay from '@/components/international-package/repacked-domestic-package-display'
import RepackedDomesticPackageDisplayActions from '@/components/international-package/repacked-domestic-package-display-actions'
import DomesticPackageCreateButton from '@/components/international-package/domestic-package-create-button'
import DomesticPackageTable from '@/components/international-package/domestic-package-table'
import { DomesticPackageStatusSelect } from '@/components/international-package/domestic-package-status-select'
import DomesticPackageActions from '@/components/international-package/domestic-package-actions'
import { InternationalPackageOrderStatusSelect } from '@/components/international-package/international-package-order-status-select'

export interface InternationalPackageDisplayDetailProps {
  defaultValues: InternationalPackageDisplayProps['defaultValues']
}
export default function InternationalPackageDisplayDetail({
  defaultValues,
}: InternationalPackageDisplayDetailProps) {
  const router = useRouter()
  const onDeleted: InternationalPackageDisplayProps['onDeleted'] = async () => {
    router.replace('/admin/international-package')
    router.refresh()
  }
  return (
    <div className="p-4">
      <InternationalPackageDisplay
        renderStatusSelect={fields => <InternationalPackageStatusSelect {...fields} />}
        renderActions={fields => <InternationalPackageActions {...fields} />}
        renderCreateOrderButton={fields => (
          <InternationalPackageOrderCreateDialog
            trigger={<Button className="w-fit">添加新订单</Button>}
            {...fields}
          />
        )}
        renderOrderDisplayList={fields => (
          fields.data.map(o => (
            <InternationalPackageOrderDisplay
              key={o.uuid}
              defaultValues={o}
              renderStatusSelect={fields => <InternationalPackageOrderStatusSelect {...fields} />}
              renderActions={fields => <InternationalPackageOrderActions {...fields} />}
              renderRepackCreateButton={fields => <RepackedDomesticPackageCreateButton {...fields} />}
              renderRepackDisplayList={fields => (fields.data.map((r, i) => (
                <RepackedDomesticPackageDisplay
                  key={r.uuid}
                  data={r}
                  title={`打包包裹${i + 1}（${r.idx}）`}
                  renderActions={fields => <RepackedDomesticPackageDisplayActions {...fields} />}
                  onUpdated={fields.onUpdated}
                  onDeleted={fields.onDeleted}
                />
              )))}
              renderDomesticCreateButton={fields => <DomesticPackageCreateButton {...fields} />}
              renderDomesticTable={fields => (
                <DomesticPackageTable
                  {...fields}
                  renderStatusSelect={fields => <DomesticPackageStatusSelect {...fields} />}
                  renderActions={fields => <DomesticPackageActions {...fields} />}
                />
              )}
              onDeleted={fields.onDeleted}
            />
          ))
        )}
        defaultValues={defaultValues}
        onDeleted={onDeleted}
      />
    </div>
  )
}
