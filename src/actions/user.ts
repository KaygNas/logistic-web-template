'use server'

import { $Enums, type Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

export async function createAdmin() {
  return prisma.user.create({ data: {
    nickname: '管理员',
    role: $Enums.UserRole.ADMIN,
  } })
}

export async function fetchAdmin() {
  return prisma.user.findFirst({ where: { role: $Enums.UserRole.ADMIN } })
}

export async function createUser(data: Pick<Prisma.UserGetPayload<null>, 'nickname'>) {
  return prisma.user.create({ data: {
    nickname: data.nickname,
  } })
}

export async function isAdmin(uuid: Prisma.UserGetPayload<null>['uuid']) {
  const user = await prisma.user.findUnique({ where: { uuid } })
  return user?.role === $Enums.UserRole.ADMIN
}

export async function updateUser({
  uuid,
  data,
}: {
  uuid: Prisma.UserGetPayload<null>['uuid']
  data: Pick<Prisma.UserGetPayload<null>, 'nickname'>
}) {
  return prisma.user.update({
    where: { uuid },
    data: {
      nickname: data.nickname,
    },
  })
}

export async function fecthUsers() {
  return prisma.user.findMany({ orderBy: {
    createdAt: 'desc',
  } })
}

export async function deleteUser(uuid: Prisma.UserGetPayload<null>['uuid']) {
  return prisma.user.delete({ where: { uuid } })
}
