'use client'

import InternationalPackageOrderDisplay from '@/components/international-package/international-package-order-display'
import type { InternationalPackageDisplayProps } from '@/components/international-package/international-package-display'
import InternationalPackageDisplay from '@/components/international-package/international-package-display'
import { InternationalPackageStatusDisplay } from '@/components/international-package/international-package-status-select'
import RepackedDomesticPackageDisplay from '@/components/international-package/repacked-domestic-package-display'
import DomesticPackageTable from '@/components/international-package/domestic-package-table'
import { DomesticPackageStatusDisplay } from '@/components/international-package/domestic-package-status-select'
import { InternationalPackageOrderStatusDisplay } from '@/components/international-package/international-package-order-status-select'

export interface UserInternationalPackageDisplayProps {
  data: InternationalPackageDisplayProps['defaultValues']
}
export default function UserInternationalPackageDisplay({
  data,
}: UserInternationalPackageDisplayProps) {
  return (
    <InternationalPackageDisplay
      defaultValues={data}
      renderStatusSelect={fields => <InternationalPackageStatusDisplay {...fields} />}
      renderOrderDisplayList={fields => (
        fields.data.map(o => (
          <InternationalPackageOrderDisplay
            key={o.uuid}
            defaultValues={o}
            renderStatusSelect={fields => <InternationalPackageOrderStatusDisplay {...fields} />}
            renderRepackDisplayList={fields => (fields.data.map((r, i) => (
              <RepackedDomesticPackageDisplay
                key={r.uuid}
                data={r}
                title={`打包包裹${i + 1}（${r.idx}）`}
                onUpdated={fields.onUpdated}
                onDeleted={fields.onDeleted}
              />
            )))}
            renderDomesticTable={fields => (
              <DomesticPackageTable
                {...fields}
                renderStatusSelect={fields => <DomesticPackageStatusDisplay {...fields} />}
              />
            )}
          />
        ))
      )}
    />
  )
}
