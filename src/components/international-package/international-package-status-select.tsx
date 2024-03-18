'use client'
import { $Enums } from '@prisma/client'
import React from 'react'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnumToText } from '@/utils/enum-to-text'

export interface InternationalPackageStatusSelectProps {
  onStatusChange: (value: $Enums.InternationalPackageStatusEnum) => Promise<void>
  currentStatus: $Enums.InternationalPackageStatusEnum
}

export function InternationalPackageStatusDisplay({
  currentStatus,
}: InternationalPackageStatusSelectProps) {
  return (<Badge>{EnumToText.internationalPackageStatusEnum(currentStatus)}</Badge>)
}

export function InternationalPackageStatusSelect({
  onStatusChange,
  currentStatus,
}: InternationalPackageStatusSelectProps) {
  const statusOptions = Object.values($Enums.InternationalPackageStatusEnum).map(status => ({
    value: status,
    label: EnumToText.internationalPackageStatusEnum(status),
  }))
  return (
    <Select onValueChange={onStatusChange} value={currentStatus}>
      <SelectTrigger className="w-24 mr-2">
        <SelectValue placeholder="选择包裹状态" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        {statusOptions.map(status => (
          <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
