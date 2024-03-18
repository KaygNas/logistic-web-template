'use client'

import { useEffect, useReducer, useState } from 'react'
import type { Prisma } from '@prisma/client'
import type { InternationalPackageOrderFormValues } from './international-package-order-form'
import InternationalPackageOrderForm from './international-package-order-form'
import { createInternationPackageOrder, fecthUsers } from '@/actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

export interface InternationalPackageOrderCreateDialogProps {
  internationPackageUuid: Prisma.InternationalPackageOrderGetPayload<null>['internationalPackageUuid']
  orderedUsers: Prisma.UserGetPayload<null>['uuid'][]
  trigger: React.ReactNode
  defaultValues?: InternationalPackageOrderFormValues
  onCreated?: (internationPackageOrder: Prisma.InternationalPackageOrderGetPayload<null>) => void
}

const fallbackDefaultValues = {
} as InternationalPackageOrderFormValues

export default function InternationalPackageOrderCreateDialog({
  internationPackageUuid,
  trigger,
  defaultValues = fallbackDefaultValues,
  orderedUsers,
  onCreated,
}: InternationalPackageOrderCreateDialogProps) {
  const [open, dispatchOpen] = useReducer((state: boolean, action: { type: 'change', payload: boolean }) => {
    switch (action.type) {
      case 'change':
        return action.payload
      default:
        return state
    }
  }, false)

  const { toast } = useToast()

  async function onSubmit(values: InternationalPackageOrderFormValues) {
    const internaltionPackageOrder = await createInternationPackageOrder({
      internationalPackageUuid: internationPackageUuid,
      userUuid: values.userUuid,
    })
    onCreated?.(internaltionPackageOrder)
    dispatchOpen({ type: 'change', payload: false })
    toast({ title: '国际包裹订单新建成功' })
  }

  const [users, setUserOptions] = useState<Awaited<ReturnType<typeof fecthUsers>>>([])
  useEffect(() => {
    fecthUsers().then(setUserOptions)
  }, [])
  const userOptions = users
    .filter(u => !orderedUsers.includes(u.uuid))
    .map(u => ({ label: u.nickname, value: String(u.uuid) }))

  return (
    <Dialog open={open} onOpenChange={value => dispatchOpen({ type: 'change', payload: value })}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>添加新订单</DialogTitle>
        </DialogHeader>
        <InternationalPackageOrderForm
          actions={(
            <DialogFooter>
              <Button type="submit">保存</Button>
            </DialogFooter>
          )}
          defaultValues={defaultValues}
          userOptions={userOptions}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
