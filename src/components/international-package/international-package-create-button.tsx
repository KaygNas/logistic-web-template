'use client'
import { useReducer } from 'react'
import type { InternationalPackageFormValues } from './international-package-form'
import InternationalPackageForm from './international-package-form'
import type { InternationalPackageType } from '@/actions'
import { createInternationPackage } from '@/actions'
import type { ButtonProps } from '@/components/ui/button'
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

export interface InternationalPackageCreateButtonProps extends ButtonProps {
  onCreated?: (internationPackage: InternationalPackageType) => void
}
export default function InternationalPackageCreateButton({
  onCreated,
  ...restProps
}: InternationalPackageCreateButtonProps) {
  const [open, dispatchOpen] = useReducer((state: boolean, action: { type: 'change', payload: boolean }) => {
    switch (action.type) {
      case 'change':
        return action.payload
      default:
        return state
    }
  }, false)

  const defaultValues: InternationalPackageFormValues = {
    title: '',
    code: undefined,
    address: undefined,
    recipient: undefined,
    recipientPhone: undefined,
    note: undefined,
  }
  const { toast } = useToast()

  async function onSubmit(values: InternationalPackageFormValues) {
    const [error, internaltionalPackage] = await createInternationPackage({
      title: values.title,
      code: values.code ?? null,
      recipient: values.recipient ?? null,
      recipientPhone: values.recipientPhone ?? null,
      address: values.address ?? null,
      note: values.note ?? null,
    })
    if (internaltionalPackage) {
      onCreated?.(internaltionalPackage)
      dispatchOpen({ type: 'change', payload: false })
      toast({ title: '国际包裹新建成功' })
    }
    else {
      toast({ title: error.message, variant: 'destructive' })
    }
  }

  return (
    <Dialog open={open} onOpenChange={value => dispatchOpen({ type: 'change', payload: value })}>
      <DialogTrigger asChild>
        <Button {...restProps}>新建国际包裹</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新建国际包裹</DialogTitle>
        </DialogHeader>
        <InternationalPackageForm
          defaultValues={defaultValues}
          actions={(
            <DialogFooter>
              <Button type="submit">保存</Button>
            </DialogFooter>
          )}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
