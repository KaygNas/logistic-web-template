'use server'

import { $Enums, type Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { createInternationPackageOrder } from './international-package-order'
import prisma from '@/lib/prisma'

export async function createDomesticPackage({
  internationalPackageOrderUuid,
  userUuid,
  code,
  note,
}: {
  internationalPackageOrderUuid: Prisma.DomesticPackageGetPayload<null>['internationalPackageOrderUuid']
  userUuid: Prisma.DomesticPackageGetPayload<null>['userUuid']
  code: Prisma.DomesticPackageGetPayload<null>['code']
  note: Prisma.DomesticPackageGetPayload<null>['note']
}) {
  try {
    const data = await prisma.domesticPackage.create({
      data: {
        internationalPackageOrderUuid,
        userUuid,
        code,
        note,
        createdByUuid: userUuid,
        status: $Enums.DomesticPackageStatusEnum.TO_BE_RECEIVED,
        statusHistory: {
          create: {
            status: $Enums.DomesticPackageStatusEnum.TO_BE_RECEIVED,
          },
        },
      },
    })
    return [null, data] as const
  }
  catch (e) {
    let error: { message: string }
    if (e instanceof PrismaClientKnownRequestError && (e.meta?.target as any)?.[0] === 'code')
      error = { message: '单号已存在' }
    else
      error = { message: '出现未知错误' }
    return [error, null] as const
  }
}

export async function fetchDomesticPackage({
  uuid,
}: {
  uuid: Prisma.DomesticPackageGetPayload<null>['uuid']
}) {
  return prisma.domesticPackage.findUniqueOrThrow({
    where: { uuid },
    include: {
      statusHistory: true,
      user: true,
      createdBy: true,
      internationalPackageOrder: true,
    },
  })
}

export async function updateDomesticPackage({
  uuid,
  code,
  note,
}: {
  uuid: Prisma.DomesticPackageGetPayload<null>['uuid']
  code: Prisma.DomesticPackageGetPayload<null>['code']
  note?: Prisma.DomesticPackageGetPayload<null>['note']
}) {
  return prisma.domesticPackage.update({
    where: { uuid },
    data: { code, note },
  })
}

export async function updateDomesticPackageStatus({
  uuid,
  status,
}: {
  uuid: Prisma.DomesticPackageGetPayload<null>['uuid']
  status: $Enums.DomesticPackageStatusEnum
}) {
  return prisma.domesticPackage.update({
    where: { uuid },
    data: {
      status,
      statusHistory: {
        create: {
          status,
        },
      },
    },
  })
}

export async function createDomesticPackageByInternationalPackageAndUserUuid({
  internationalPackageUuid,
  userUuid,
  code,
  note,
}: {
  internationalPackageUuid: Prisma.InternationalPackageGetPayload<null>['uuid']
  userUuid: Prisma.DomesticPackageGetPayload<null>['userUuid']
  code: Prisma.DomesticPackageGetPayload<null>['code']
  note: Prisma.DomesticPackageGetPayload<null>['note']
}) {
  const internationalPackage = await prisma.internationalPackage.findUniqueOrThrow({ where: { uuid: internationalPackageUuid }, include: { internationalPackageOrders: true } })

  let internationalPackageOrder = internationalPackage.internationalPackageOrders.find(o => o.userUuid === userUuid)

  if (!internationalPackageOrder)
    internationalPackageOrder = await createInternationPackageOrder({ userUuid, internationalPackageUuid })

  return createDomesticPackage({ userUuid, code, note, internationalPackageOrderUuid: internationalPackageOrder.uuid })
}

export async function deleteDomesticPackage(uuid: Prisma.DomesticPackageGetPayload<null>['uuid']) {
  return prisma.domesticPackage.delete({ where: { uuid } })
}
