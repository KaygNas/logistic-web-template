'use server'

import type { Prisma } from '@prisma/client'
import { calcRepackedDomesticPackageTotalPrice } from '../utils/price'
import prisma from '@/lib/prisma'

export async function createRepackedDomesticPackage({ internationalPackageOrderUuid }: Pick<Prisma.RepackedDomesticPackageGetPayload<null>, 'internationalPackageOrderUuid'>) {
  return prisma.repackedDomesticPackage.create({
    data: {
      internationalPackageOrderUuid,
    },
  })
}

export async function updateRepackedDemesticPackageInfo({
  uuid,
  data,
}: { uuid: Prisma.RepackedDomesticPackageGetPayload<null>['uuid'], data: Partial<Pick<Prisma.RepackedDomesticPackageGetPayload<null>, 'volume' | 'volumeUnitPrice' | 'weight' | 'weightUnitPrice'>> }) {
  const totalPrice = calcRepackedDomesticPackageTotalPrice(data)
  return prisma.repackedDomesticPackage.update({
    where: { uuid },
    data: {
      ...data,
      totalPrice,
    },
  })
}

export async function deleteRepackedDomesticPackage(uuid: Prisma.RepackedDomesticPackageGetPayload<null>['uuid']) {
  return prisma.repackedDomesticPackage.delete({
    where: { uuid },
  })
}
