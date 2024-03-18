'use client'

import type { $Enums, Prisma } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import type { DomesticPackageStatusSelectProps } from './domestic-package-status-select'
import type { DomesticPackageActionsProps } from './domestic-package-actions'
import { DataTable } from '@/components/custom/DataTable'
import { updateDomesticPackageStatus } from '@/actions'

type DomesticPackage = Prisma.DomesticPackageGetPayload<{
  include: { statusHistory: true }
}>

export interface DomesticPackageTableProps {
  data: DomesticPackage[]
  renderStatusSelect?: (props: DomesticPackageStatusSelectProps) => React.ReactNode
  renderActions?: (props: DomesticPackageActionsProps) => React.ReactNode
  onUpdated?: (value: DomesticPackage) => void
  onDeleted?: (value: DomesticPackage) => void
}

export default function DomesticPackageTable({
  data,
  renderStatusSelect,
  renderActions,
  onUpdated,
  onDeleted,
}: DomesticPackageTableProps) {
  const columns: ColumnDef<DomesticPackage>[] = [
    {
      header: '单号',
      cell: (ctx) => {
        const data = ctx.row.original
        const onValueChange = async (value: string | undefined) => {
          if (value) {
            await updateDomesticPackageStatus({
              uuid: data.uuid,
              status: value as $Enums.DomesticPackageStatusEnum,
            })
            onUpdated?.(data)
          }
        }
        return (
          <div className="flex flex-col space-y-1">
            <span className="break-all">{data.code}</span>
            {/* 动态渲染国内包裹状态 */}
            {renderStatusSelect?.({ onStatusChange: onValueChange, currentStatus: data.status })}
          </div>
        )
      },
    },
    {
      header: '更新时间',
      cell: (ctx) => {
        const data = ctx.row.original
        return dayjs(data.updatedAt).format('YY-MM-DD HH:mm:ss')
      },
    },
  ]

  if (renderActions) {
    columns.push({
      header: '操作',
      cell: (ctx) => {
        const data = ctx.row.original
        return renderActions({ data, onUpdated, onDeleted })
      },
    })
  }
  return (
    <DataTable columns={columns} data={data} />
  )
}
