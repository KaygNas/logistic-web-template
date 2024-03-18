'use client'

import type { Prisma } from '@prisma/client'
import { useState } from 'react'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Collapsible, CollapsibleContent } from '../ui/collapsible'
import { Button } from '../ui/button'
import type { RepackedDomesticPackageDisplayProps } from './repacked-domestic-package-display'
import type { RepackedDomesticPackageCreateButtonProps } from './repacked-domestic-package-create-button'
import type { DomesticPackageCreateButtonProps } from './domestic-package-create-button'
import type { DomesticPackageTableProps } from './domestic-package-table'
import type { InternationalPackageOrderActionsProps } from './international-package-order-actions'
import type { InternationalPackageOrderStatusSelectProps } from './international-package-order-status-select'
import { deleteInternationalPackageOrder, fetchInternationPackageOrder, updateInternationalOrderPackageStatus } from '@/actions'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export interface InternationalPackageOrderDisplayProps {
  defaultValues: Prisma.InternationalPackageOrderGetPayload<{
    include: {
      user: true
      statusHistory: true
      repackedDomesticPackages: true
      domesticPackages: {
        include: {
          statusHistory: true
        }
      }
    }
  }>
  renderStatusSelect?: (props: InternationalPackageOrderStatusSelectProps) => React.ReactNode
  renderActions?: (props: InternationalPackageOrderActionsProps) => React.ReactNode
  renderRepackCreateButton?: (props: RepackedDomesticPackageCreateButtonProps) => React.ReactNode
  renderRepackDisplayList?: (props: { data: RepackedDomesticPackageDisplayProps['data'][] } & Omit<RepackedDomesticPackageDisplayProps, 'data' | 'title'>) => React.ReactNode
  renderDomesticCreateButton?: (props: DomesticPackageCreateButtonProps) => React.ReactNode
  renderDomesticTable?: (props: DomesticPackageTableProps) => React.ReactNode
  onDeleted?: (data: Prisma.InternationalPackageOrderGetPayload<null>) => void
}

export default function InternationalPackageOrderDisplay({
  defaultValues,
  renderStatusSelect,
  renderActions,
  renderRepackCreateButton,
  renderRepackDisplayList,
  renderDomesticCreateButton,
  renderDomesticTable,
  onDeleted,
}: InternationalPackageOrderDisplayProps) {
  const [data, setData] = useState(defaultValues)
  const refreshData = async () => {
    const newData = await fetchInternationPackageOrder({ uuid: data.uuid })
    setData(newData)
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { toast } = useToast()
  const handleDelete = async () => {
    await deleteInternationalPackageOrder(data.uuid)
    onDeleted?.(data)
    toast({ title: '删除国际包裹订单成功' })
    setDeleteDialogOpen(false)
  }

  const onStatusChange: InternationalPackageOrderStatusSelectProps['onStatusChange'] = async (value) => {
    await updateInternationalOrderPackageStatus({ uuid: data.uuid, status: value })
    await refreshData()
  }

  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="break-all whitespace-pre-wrap flex items-center justify-between">
          <span className="mr-auto break-all pr-2">{`${data.user.nickname}的订单`}</span>

          {/* 动态渲染状态选择 */}
          {renderStatusSelect?.({ onStatusChange, currentStatus: data.status })}

          {/* 动态渲染操作 */}
          {renderActions?.({ deleteDialogOpen, onDeleteDialogOpenChange: setDeleteDialogOpen, onDelete: handleDelete })}

        </CardTitle>
        <CardDescription>
          <span className="break-all">{`订单ID：${data.idx}`}</span>
        </CardDescription>
        <div className="flex flex-row items-center flex-wrap text-sm">
          <span>{`总费用：${data.totalFee}元`}</span>
          <Separator orientation="vertical" className="mx-2 h-5" />
          <span>{`总包裹数量：${data.repackedDomesticPackages.length}`}</span>
          <Button variant="default" size="sm" className="ml-auto" onClick={() => setCollapsibleOpen(open => !open)}>
            <span className="mb-0.5">{collapsibleOpen ? '收起' : '展开'}</span>
            <CaretSortIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
          <CollapsibleContent>
            <div>

              {/* 动态渲染添加打包包裹按钮 */}
              {renderRepackCreateButton?.({
                internationalPackageOrderUuid: data.uuid,
                onCreated: refreshData,
              })}

              {renderRepackDisplayList?.({
                data: data.repackedDomesticPackages,
                onDeleted: refreshData,
                onUpdated: refreshData,
              })}
            </div>

            {/* 动态渲染添加国内包裹按钮 */}
            {renderDomesticCreateButton?.({
              internationalPackageOrderUuid: data.uuid,
              userUuid: data.userUuid,
              onCreated: refreshData,
            })}

            {/* 动态渲染国内包裹表格 */}
            {renderDomesticTable?.({
              data: data.domesticPackages,
              onUpdated: refreshData,
              onDeleted: refreshData,
            })}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
