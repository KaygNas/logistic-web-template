import { useState } from 'react'
import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import FormDialog, { FormDialogFooter, useFormDialog } from '../custom/FormDialog'
import DeleteAlertDialog from '../custom/DeleteAlertDialog'
import DomesticPackageForm from './domestic-package-form'
import type { DomesticPackageFormProps } from './domestic-package-form'
import type { DomesticPackageTableProps } from './domestic-package-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { deleteDomesticPackage, updateDomesticPackage } from '@/actions'

export interface DomesticPackageActionsProps {
  data: DomesticPackageTableProps['data'][number]
  onUpdated: DomesticPackageTableProps['onUpdated']
  onDeleted: DomesticPackageTableProps['onDeleted']
}
export default function DomesticPackageActions({
  data,
  onUpdated,
  onDeleted,
}: DomesticPackageActionsProps) {
  const [open, dispatchOpen, defaultProps] = useFormDialog()
  const { toast } = useToast()
  const onSubmit: DomesticPackageFormProps['onSubmit'] = async (values) => {
    await updateDomesticPackage({ uuid: data.uuid, code: values.code, note: values.note })
    onUpdated?.(data)
    toast({ title: '国内包裹编辑成功' })
    dispatchOpen({ type: 'change', payload: false })
  }
  const defaultValues: DomesticPackageFormProps['defaultValues'] = {
    code: data.code,
    note: data.note ?? '',
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDelete = async () => {
    await deleteDomesticPackage(data.uuid)
    onDeleted?.(data)
    toast({ title: '国内包裹删除成功' })
    setDeleteDialogOpen(false)
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button asChild variant="outline" size="icon">
            <div>
              <DotsVerticalIcon />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => dispatchOpen({ type: 'change', payload: true })}>
            <Pencil2Icon className="mr-2" />
            编辑
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={() => setDeleteDialogOpen(true)}>
            <TrashIcon className="mr-2" />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteAlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onDelete={handleDelete} />
      <FormDialog
        {...defaultProps}
        title="编辑国内包裹"
        open={open}
      >
        <DomesticPackageForm
          defaultValues={defaultValues}
          actions={<FormDialogFooter><Button type="submit">保存</Button></FormDialogFooter>}
          onSubmit={onSubmit}
        />
      </FormDialog>
    </>
  )
}
