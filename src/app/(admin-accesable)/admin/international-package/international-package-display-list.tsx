'use client'

import { useState } from 'react'
import type { InternationalPackage } from '@prisma/client'
import { useRouter } from 'next/navigation'
import type { InternationalPackageCreateButtonProps } from '@/components/international-package/international-package-create-button'
import InternationalPackageCreateButton from '@/components/international-package/international-package-create-button'
import type { InternationalPackageDisplayProps } from '@/components/international-package/international-package-display'
import InternationalPackageDisplay from '@/components/international-package/international-package-display'
import { InternationalPackageStatusSelect } from '@/components/international-package/international-package-status-select'
import InternationalPackageActions from '@/components/international-package/international-package-actions'

export interface InternationalPackageDisplayListProps {
  defaultValues: InternationalPackageDisplayProps['defaultValues'][]
}
export default function InternationalPackageDisplayList({
  defaultValues,
}: InternationalPackageDisplayListProps) {
  const [data, setData] = useState(defaultValues)
  const onCreated: InternationalPackageCreateButtonProps['onCreated'] = (item) => {
    setData(prev => [item, ...prev])
  }
  const onDeleted: InternationalPackageDisplayProps['onDeleted'] = (item) => {
    setData(prev => prev.filter(i => i.uuid !== item.uuid))
  }
  const router = useRouter()
  const handleClick = (_: any, uuid: InternationalPackage['uuid']) => {
    router.push(`/admin/international-package/${uuid}`)
  }
  return (
    <div className="p-4 space-y-2">
      <InternationalPackageCreateButton className="mb-2" onCreated={onCreated} />
      {data.map(p => (
        <InternationalPackageDisplay
          className="cursor-pointer hover:shadow hover:border-solid active:shadow active:border-solid transition-shadow"
          key={p.uuid}
          renderStatusSelect={fields => <InternationalPackageStatusSelect {...fields} />}
          renderActions={fields => <InternationalPackageActions {...fields} />}
          defaultValues={p}
          onDeleted={onDeleted}
          onClick={e => handleClick(e, p.uuid)}
        />
      ))}
    </div>
  )
}
