'use server'

import { $Enums, type Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

export async function createInternationPackageOrder({
  userUuid,
  internationalPackageUuid,
}: {
  userUuid: Prisma.InternationalPackageOrderGetPayload<null>['userUuid']
  internationalPackageUuid: Prisma.InternationalPackageOrderGetPayload<null>['internationalPackageUuid']
}) {
  return prisma.internationalPackageOrder.create({
    data: {
      totalFee: 0,
      status: $Enums.InternationalPackageOrderStatusEnum.TO_BE_PACKED,
      statusHistory: {
        create: {
          status: $Enums.InternationalPackageOrderStatusEnum.TO_BE_PACKED,
        },
      },
      user: {
        connect: { uuid: userUuid },
      },
      internationalPackage: {
        connect: { uuid: internationalPackageUuid },
      },
    },
  })
}

export async function fetchInternationPackageOrder({
  uuid,
}: {
  uuid: Prisma.InternationalPackageOrderGetPayload<null>['uuid']
}) {
  return prisma.internationalPackageOrder.findUniqueOrThrow({
    where: { uuid },
    include: {
      user: true,
      statusHistory: true,
      repackedDomesticPackages: true,
      domesticPackages: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          statusHistory: true,
        },
      },
    },
  })
}

export async function updateInternationalOrderPackageStatus({
  uuid,
  status,
}: {
  uuid: Prisma.InternationalPackageOrderGetPayload<null>['uuid']
  status: Prisma.InternationalPackageOrderGetPayload<null>['status']
}) {
  return prisma.internationalPackageOrder.update({
    where: { uuid },
    data: { status, statusHistory: { create: { status } } },
  })
}

export async function deleteInternationalPackageOrder(uuid: Prisma.InternationalPackageOrderGetPayload<null>['uuid']) {
  return prisma.internationalPackageOrder.delete({ where: { uuid } })
}
