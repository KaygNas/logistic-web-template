'use client'

import type { $Enums, Prisma } from '@prisma/client'
import React, { useState } from 'react'
import type { InternationalPackageUpdateDialogProps } from './international-package-update-dialog'
import type { InternationalPackageOrderCreateDialogProps } from './international-package-order-create-dialog'
import type { InternationalPackageStatusSelectProps } from './international-package-status-select'
import type { InternationalPackageActionsProps } from './international-package-actions'
import type { InternationalPackageFormValues } from './international-package-form'
import type { InternationalPackageOrderDisplayProps } from './international-package-order-display'
import { deleteInternationalPackage, fetchInternationalPackage, updateInternationalPackage, updateInternationalPackageStatus } from '@/actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useToast } from '@/components/ui/use-toast'
import { copyToClipboard } from '@/utils/copy'

type Data = Prisma.InternationalPackageGetPayload<{
  include: {
    statusHistory: true
    internationalPackageOrders: {
      include: {
        user: true
        statusHistory: true
        domesticPackages: {
          include: {
            statusHistory: true
          }
        }
        repackedDomesticPackages: true
      }
    }
  }
}>
export interface InternationalPackageDisplayProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  defaultValues: Data
  renderStatusSelect?: (props: InternationalPackageStatusSelectProps) => React.ReactNode
  renderActions?: (props: InternationalPackageActionsProps) => React.ReactNode
  renderCreateOrderButton?: (props: Omit<InternationalPackageOrderCreateDialogProps, 'trigger'>) => React.ReactNode
  renderOrderDisplayList?: (props: { data: Data['internationalPackageOrders'], onDeleted: InternationalPackageOrderDisplayProps['onDeleted'] }) => React.ReactNode
  onDeleted?: (data: Data) => void
}

export default function InternationalPackageDisplay({
  defaultValues,
  renderStatusSelect,
  renderActions,
  renderCreateOrderButton,
  renderOrderDisplayList,
  onDeleted,
  ...restProps
}: InternationalPackageDisplayProps) {
  const [data, setData] = useState(defaultValues)

  const currentStatus = data.status

  const onStatusChange = async (value: string) => {
    await updateInternationalPackageStatus({ uuid: data.uuid, status: value as $Enums.InternationalPackageStatusEnum })
    const internationalPackage = await fetchInternationalPackage(data.uuid)
    setData(data => ({ ...data, status: internationalPackage.status }))
  }

  const { toast } = useToast()

  const handleCreate = async () => {
    const internationalPackage = await fetchInternationalPackage(data.uuid)
    setData(internationalPackage)
    toast({ title: '添加国际包裹成功' })
  }

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const handleUpdate: InternationalPackageUpdateDialogProps['onUpdate'] = async (values) => {
    const internaltionPackage = await updateInternationalPackage({
      uuid: data.uuid,
      data: values,
    })
    setData({
      ...data,
      ...internaltionPackage,
    })
    setUpdateDialogOpen(false)
    toast({ title: '国际包裹更新成功' })
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = async () => {
    await deleteInternationalPackage(data.uuid)
    toast({ title: '国际包裹删除成功' })
    setDeleteDialogOpen(false)
    onDeleted?.(data)
  }

  const onOrderDeleted: InternationalPackageOrderDisplayProps['onDeleted'] = (order) => {
    const newData = {
      ...data,
      internationalPackageOrders: data.internationalPackageOrders.filter(o => o.uuid !== order.uuid),
    }
    setData(newData)
  }
  const linkShared = `${process.env.NEXT_PUBLIC_SHARED_LINK_ORIGIN}/international-package/${data.uuid}`
  const [linkShareDialogOpen, setLinkShareDialogOpen] = useState(false)
  const handleLinkShareCopy = async () => {
    await copyToClipboard(linkShared)
    toast({ title: '链接已复制' })
    setLinkShareDialogOpen(false)
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-white">
        <Card {...restProps} className={['mb-4 border-dashed shadow-none', restProps.className].join(' ')}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-auto break-all pr-2">{data.title}</span>

              {/* 动态渲染状态选择 */}
              {renderStatusSelect?.({ onStatusChange, currentStatus })}

              {/* 动态渲染数据操作 */}
              {renderActions?.({
                linkShareDialogOpen,
                onLinkShareDialogOpenChange: setLinkShareDialogOpen,
                linkShared,
                onLinkShareCopy: handleLinkShareCopy,
                deleteDialogOpen,
                onDeleteDialogOpenChange: setDeleteDialogOpen,
                onDelete: handleDelete,
                updateDialogOpen,
                onUpdateDialogOpenChange: setUpdateDialogOpen,
                internationalPackageFormValues: data as InternationalPackageFormValues,
                onUpdate: handleUpdate,
              })}
            </CardTitle>
            <CardDescription className="flex flex-col mb-4">
              <span className="break-all">{`单号：${data.code}`}</span>
            </CardDescription>
          </CardHeader>

          {/* 动态渲染创建订单按钮 */}
          {renderCreateOrderButton && (
            <CardContent>
              {renderCreateOrderButton({
                internationPackageUuid: data.uuid,
                orderedUsers: data.internationalPackageOrders.map(o => o.userUuid),
                onCreated: handleCreate,
              })}
            </CardContent>
          )}

        </Card>
      </div>

      {/* 动态渲染订单列表 */}
      {renderOrderDisplayList?.({ data: data.internationalPackageOrders, onDeleted: onOrderDeleted })}

    </>
  )
}
