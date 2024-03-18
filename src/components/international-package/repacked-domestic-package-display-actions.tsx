import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import type { Prisma } from '@prisma/client'
import { useReducer, useState } from 'react'
import DeleteAlertDialog from '../custom/DeleteAlertDialog'
import type { RepackedDomesticPackageFormValues } from './repacked-domestic-package-form'
import RepackedDomesticPackageForm from './repacked-domestic-package-form'
import { deleteRepackedDomesticPackage, updateRepackedDemesticPackageInfo } from '@/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

export interface RepackedDomesticPackageDisplayActionsProps {
  data: Prisma.RepackedDomesticPackageGetPayload<null>
  onUpdated?: (data: Prisma.RepackedDomesticPackageGetPayload<null>) => void
  onDeleted?: (data: Prisma.RepackedDomesticPackageGetPayload<null>) => void
}
export default function RepackedDomesticPackageDisplayActions({
  data,
  onDeleted,
  onUpdated,
}: RepackedDomesticPackageDisplayActionsProps) {
  const defaultValues: RepackedDomesticPackageFormValues = {
    volume: data.volume ?? 0,
    volumeUnitPrice: data.volumeUnitPrice ?? 0,
    weight: data.weight ?? 0,
    weightUnitPrice: data.weightUnitPrice ?? 0,
  }

  const [open, dispatchOpen] = useReducer((state: boolean, action: { type: 'change', payload: boolean }) => {
    switch (action.type) {
      case 'change':
        return action.payload
      default:
        return state
    }
  }, false)

  const { toast } = useToast()

  async function onSubmit(values: RepackedDomesticPackageFormValues) {
    const repackedDomesticPackage = await updateRepackedDemesticPackageInfo({ uuid: data.uuid, data: values })
    onUpdated?.(repackedDomesticPackage)
    dispatchOpen({ type: 'change', payload: false })
    toast({ title: `打包包裹编辑成功` })
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const onDelete = async () => {
    await deleteRepackedDomesticPackage(data.uuid)
    onDeleted?.(data)
    toast({ title: `打包包裹删除成功` })
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

      <DeleteAlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onDelete={onDelete} />
      <Dialog open={open} onOpenChange={value => dispatchOpen({ type: 'change', payload: value })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              编辑打包包裹
            </DialogTitle>
          </DialogHeader>
          <RepackedDomesticPackageForm
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
    </>
  )
}
