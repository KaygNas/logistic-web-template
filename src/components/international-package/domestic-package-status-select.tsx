import { $Enums } from '@prisma/client'
import type { ComboboxProps } from '../custom/Combobox'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnumToText } from '@/utils/enum-to-text'

export interface DomesticPackageStatusSelectProps {
  onStatusChange: (value: $Enums.DomesticPackageStatusEnum) => Promise<void>
  currentStatus: $Enums.DomesticPackageStatusEnum
}

export function DomesticPackageStatusDisplay({
  currentStatus,
}: DomesticPackageStatusSelectProps) {
  return (<Badge className="w-fit">{EnumToText.domesticPackageStatusEnum(currentStatus)}</Badge>)
}

export function DomesticPackageStatusSelect({
  currentStatus,
  onStatusChange,
}: DomesticPackageStatusSelectProps) {
  const options: ComboboxProps['options'] = Object.values($Enums.DomesticPackageStatusEnum)
    .map(value => ({ label: EnumToText.domesticPackageStatusEnum(value), value }))

  return (
    <Select onValueChange={onStatusChange} value={currentStatus}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder="选择包裹状态" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
