'use client'

import InternationalPackageForm from './international-package-form'
import type { InternationalPackageFormValues } from './international-package-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export interface InternationalPackageUpdateDialogProps {
  defaultValues: InternationalPackageFormValues
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (values: InternationalPackageFormValues) => void
}

export default function InternationalPackageUpdateDialog({
  defaultValues,
  open,
  onOpenChange,
  onUpdate,
}: InternationalPackageUpdateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            编辑国际包裹
          </DialogTitle>
        </DialogHeader>
        <InternationalPackageForm
          defaultValues={defaultValues}
          actions={(
            <DialogFooter>
              <Button type="submit">保存</Button>
            </DialogFooter>
          )}
          onSubmit={onUpdate}
        />
      </DialogContent>
    </Dialog>
  )
}
