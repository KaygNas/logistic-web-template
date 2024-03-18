import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
}
else {
  if (!(globalThis as any).prisma)
    (globalThis as any).prisma = new PrismaClient()

  prisma = (globalThis as any).prisma
}

export default prisma
