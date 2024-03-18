'use server'

import type { Prisma } from '@prisma/client'
import { $Enums } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import prisma from '@/lib/prisma'

export type InternationalPackageType = Prisma.InternationalPackageGetPayload<{
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

export async function fetchInternationalPackage(uuid: Prisma.InternationalPackageGetPayload<null>['uuid']) {
  return prisma.internationalPackage.findUniqueOrThrow({
    where: { uuid },
    include: {
      statusHistory: true,
      internationalPackageOrders: {
        include: {
          user: true,
          statusHistory: true,
          domesticPackages: {
            include: {
              statusHistory: true,
            },
          },
          repackedDomesticPackages: true,
        },
      },
    },
  })
}

export async function createInternationPackage(data: Omit<Prisma.InternationalPackageGetPayload<null>, 'status' | 'createdAt' | 'updatedAt' | 'idx' | 'uuid'>) {
  try {
    const result = await prisma.internationalPackage.create({
      data: {
        ...data,
        status: $Enums.InternationalPackageStatusEnum.TO_BE_SENT,
        statusHistory: {
          create: {
            status: $Enums.InternationalPackageStatusEnum.TO_BE_SENT,
          },
        },
      },
    })
    const newData = await fetchInternationalPackage(result.uuid)
    return [null, newData] as const
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

export async function updateInternationalPackage({
  uuid,
  data,
}: {
  uuid: Prisma.InternationalPackageGetPayload<null>['uuid']
  data: Prisma.InternationalPackageUpdateInput
}) {
  return prisma.internationalPackage.update({
    where: { uuid },
    data,
  })
}

export async function updateInternationalPackageStatus({
  uuid,
  status,
}: {
  uuid: Prisma.InternationalPackageGetPayload<null>['uuid']
  status: $Enums.InternationalPackageStatusEnum
}) {
  return prisma.internationalPackage.update({
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

export async function fetchInternationPackages() {
  return prisma.internationalPackage.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      statusHistory: true,
      internationalPackageOrders: {
        include: {
          user: true,
          statusHistory: true,
          domesticPackages: {
            orderBy: { createdAt: 'desc' },
            include: {
              statusHistory: true,
            },
          },
          repackedDomesticPackages: {
            orderBy: { createdAt: 'desc' },
          },
        },
      },
    },
  })
}

export async function fetchInternationalPackageShallow(uuid: Prisma.InternationalPackageGetPayload<null>['uuid']) {
  return await prisma.internationalPackage.findUnique({ where: { uuid } })
}

export async function fetchInternationalPackageShallowByDemoesticPackageCode(code: Prisma.DomesticPackageGetPayload<null>['code']) {
  return prisma.internationalPackage.findFirst({ where: {
    internationalPackageOrders: {
      some: {
        domesticPackages: {
          some: {
            code,
          },
        },
      },
    },
  } })
}
export async function fetchInternationalPackagesShallow() {
  return await prisma.internationalPackage.findMany()
}

export async function deleteInternationalPackage(uuid: Prisma.InternationalPackageGetPayload<null>['uuid']) {
  return prisma.internationalPackage.delete({
    where: { uuid },
  })
}
