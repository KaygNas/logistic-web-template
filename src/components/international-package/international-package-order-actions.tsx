import { DotsVerticalIcon, TrashIcon } from '@radix-ui/react-icons'
import type { DeleteAlertDialogProps } from '../custom/DeleteAlertDialog'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import DeleteAlertDialog from '../custom/DeleteAlertDialog'

export interface InternationalPackageOrderActionsProps {
  deleteDialogOpen: DeleteAlertDialogProps['open']
  onDeleteDialogOpenChange: DeleteAlertDialogProps['onOpenChange']
  onDelete: DeleteAlertDialogProps['onDelete']
}
export default function InternationalPackageOrderActions({
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDelete,
}: InternationalPackageOrderActionsProps,
) {
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
          <DropdownMenuItem className="text-destructive" onClick={() => onDeleteDialogOpenChange?.(true)}>
            <TrashIcon className="mr-2" />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog open={deleteDialogOpen} onOpenChange={onDeleteDialogOpenChange} onDelete={onDelete} />
    </>
  )
}
