import type { Prisma } from '@prisma/client'
import FormDialog, { FormDialogFooter, useFormDialog } from '../custom/FormDialog'
import type { DomesticPackageFormProps } from './domestic-package-form'
import DomesticPackageForm from './domestic-package-form'
import { createDomesticPackage } from '@/actions'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export interface DomesticPackageCreateButtonProps {
  internationalPackageOrderUuid: Prisma.DomesticPackageGetPayload<null>['internationalPackageOrderUuid']
  userUuid: Prisma.DomesticPackageGetPayload<null>['userUuid']
  onCreated?: (value: Prisma.DomesticPackageGetPayload<null>) => void
}

export default function DomesticPackageCreateButton({
  internationalPackageOrderUuid,
  userUuid,
  onCreated,
}: DomesticPackageCreateButtonProps) {
  const [open, dispatchOpen, defaultProps] = useFormDialog()
  const { toast } = useToast()
  const onSubmit: DomesticPackageFormProps['onSubmit'] = async (values) => {
    const [error, domesticPackage] = await createDomesticPackage({
      internationalPackageOrderUuid,
      userUuid,
      code: values.code,
      note: values.note ?? null,
    })
    if (domesticPackage) {
      onCreated?.(domesticPackage)
      toast({ title: '国内包裹新建成功' })
      dispatchOpen({ type: 'change', payload: false })
    }
    else {
      toast({ title: error.message, variant: 'destructive' })
    }
  }
  return (
    <FormDialog
      {...defaultProps}
      title="添加国内包裹"
      open={open}
      trigger={<Button variant="secondary" className="mb-2">添加国内包裹</Button>}
    >
      <DomesticPackageForm
        defaultValues={{ code: '', note: '' }}
        actions={<FormDialogFooter><Button type="submit">保存</Button></FormDialogFooter>}
        onSubmit={onSubmit}
      />
    </FormDialog>
  )
}
