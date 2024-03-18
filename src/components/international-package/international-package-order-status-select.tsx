'use client'
import { $Enums } from '@prisma/client'
import React from 'react'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnumToText } from '@/utils/enum-to-text'

export interface InternationalPackageOrderStatusSelectProps {
  onStatusChange: (value: $Enums.InternationalPackageOrderStatusEnum) => Promise<void>
  currentStatus: $Enums.InternationalPackageOrderStatusEnum
}

export function InternationalPackageOrderStatusDisplay({
  currentStatus,
}: InternationalPackageOrderStatusSelectProps) {
  return (<Badge>{EnumToText.InternationalPackageOrderStatusEnum(currentStatus)}</Badge>)
}

export function InternationalPackageOrderStatusSelect({
  onStatusChange,
  currentStatus,
}: InternationalPackageOrderStatusSelectProps) {
  const statusOptions = Object.values($Enums.InternationalPackageOrderStatusEnum).map(status => ({
    value: status,
    label: EnumToText.InternationalPackageOrderStatusEnum(status),
  }))
  return (
    <Select onValueChange={onStatusChange} value={currentStatus}>
      <SelectTrigger className="w-24 mr-2">
        <SelectValue placeholder="选择订单状态" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        {statusOptions.map(status => (
          <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
