import type { Prisma } from '@prisma/client'
import React from 'react'
import { calcRepackedDomesticPackageTotalPrice, displayCalculation } from '../../utils/price'
import type { RepackedDomesticPackageDisplayActionsProps } from './repacked-domestic-package-display-actions'
import { Separator } from '@/components/ui/separator'

export interface RepackedDomesticPackageDisplayProps {
  data: Prisma.RepackedDomesticPackageGetPayload<null>
  title: string
  renderActions?: (props: RepackedDomesticPackageDisplayActionsProps) => React.ReactNode
  onDeleted?: RepackedDomesticPackageDisplayActionsProps['onDeleted']
  onUpdated?: RepackedDomesticPackageDisplayActionsProps['onUpdated']
}
export default function RepackedDomesticPackageDisplay({
  data,
  title,
  renderActions,
  onDeleted,
  onUpdated,
}: RepackedDomesticPackageDisplayProps) {
  return (
    <div key={data.uuid} className="mb-4">
      <div className="flex items-center justify-between">
        <span className="mr-2">{title}</span>

        {/* 动态渲染打包包裹操作 */}
        {renderActions?.({ data, onDeleted, onUpdated })}

      </div>
      <Separator className="my-2" />
      <div className="text-sm">
        <div>
          体积：
          {displayCalculation({
            unitValue: data.volume,
            unitLabel: 'm³',
            priceValue: data.volumeUnitPrice,
            priceLabel: '元',
          })}
        </div>
        <div>
          重量：
          {displayCalculation({
            unitValue: data.weight,
            unitLabel: 'kg',
            priceValue: data.weightUnitPrice,
            priceLabel: '元',
          })}
        </div>
        <div>
          总价：
          {calcRepackedDomesticPackageTotalPrice(data)}
          元
        </div>
      </div>
    </div>
  )
}
