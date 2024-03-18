import { $Enums } from '@prisma/client'

export const EnumToText = {
  internationalPackageStatusEnum(value: unknown) {
    const dict = new Map<unknown, string>([
      [$Enums.InternationalPackageStatusEnum.TO_BE_SENT, '待寄出'],
      [$Enums.InternationalPackageStatusEnum.SENT, '已寄出'],
      [$Enums.InternationalPackageStatusEnum.RECEIVED, '已签收'],
    ])
    return dict.get(value) ?? '未知状态'
  },
  InternationalPackageOrderStatusEnum(value: unknown) {
    const map = new Map<unknown, string>([
      [$Enums.InternationalPackageOrderStatusEnum.TO_BE_PACKED, '待打包'],
      [$Enums.InternationalPackageOrderStatusEnum.PACKED, '已打包'],
      [$Enums.InternationalPackageOrderStatusEnum.CHECKED, '已核对'],
      [$Enums.InternationalPackageOrderStatusEnum.PAID, '已支付'],
      [$Enums.InternationalPackageOrderStatusEnum.COMPLETED, '已完成'],
    ])
    return map.get(value) ?? '未知状态'
  },
  domesticPackageStatusEnum(value: unknown) {
    const map = new Map<unknown, string>([
      [$Enums.DomesticPackageStatusEnum.CREATED, '待审核'],
      [$Enums.DomesticPackageStatusEnum.REVIEWED, '已审核'],
      [$Enums.DomesticPackageStatusEnum.TO_BE_RECEIVED, '待入库'],
      [$Enums.DomesticPackageStatusEnum.RECEIVED, '已入库'],
      [$Enums.DomesticPackageStatusEnum.PACKED, '已打包'],
    ])
    return map.get(value) ?? '未知状态'
  },
}
