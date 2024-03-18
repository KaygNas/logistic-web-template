import { DotsVerticalIcon, Pencil2Icon, Share1Icon, TrashIcon } from '@radix-ui/react-icons'
import type { DeleteAlertDialogProps } from '../custom/DeleteAlertDialog'
import DeleteAlertDialog from '../custom/DeleteAlertDialog'
import type { LinkShareDialogProps } from '../custom/link-share-dialog'
import LinkShareDialog from '../custom/link-share-dialog'
import { Button } from '../ui/button'
import type { InternationalPackageUpdateDialogProps } from './international-package-update-dialog'
import InternationalPackageUpdateDialog from './international-package-update-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { stopPropagation } from '@/utils/stop-propagation'

export interface InternationalPackageActionsProps {
  linkShareDialogOpen: LinkShareDialogProps['open']
  onLinkShareDialogOpenChange: LinkShareDialogProps['onOpenChange']
  linkShared: LinkShareDialogProps['link']
  onLinkShareCopy: LinkShareDialogProps['onCopy']
  deleteDialogOpen: DeleteAlertDialogProps['open']
  onDeleteDialogOpenChange: DeleteAlertDialogProps['onOpenChange']
  onDelete: DeleteAlertDialogProps['onDelete']
  updateDialogOpen: InternationalPackageUpdateDialogProps['open']
  onUpdateDialogOpenChange: InternationalPackageUpdateDialogProps['onOpenChange']
  internationalPackageFormValues: InternationalPackageUpdateDialogProps['defaultValues']
  onUpdate: InternationalPackageUpdateDialogProps['onUpdate']
}

export default function InternationalPackageActions({
  linkShareDialogOpen,
  onLinkShareDialogOpenChange,
  linkShared,
  onLinkShareCopy,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDelete,
  updateDialogOpen,
  onUpdateDialogOpenChange,
  internationalPackageFormValues,
  onUpdate,
}: InternationalPackageActionsProps) {
  return (
    <div onClick={stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button asChild variant="outline" size="icon">
            <div>
              <DotsVerticalIcon />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={(() => onLinkShareDialogOpenChange(true))}>
            <Share1Icon className="mr-2" />
            分享
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(() => onUpdateDialogOpenChange(true))}>
            <Pencil2Icon className="mr-2" />
            编辑
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={(() => onDeleteDialogOpenChange?.(true))}>
            <TrashIcon className="mr-2" />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LinkShareDialog
        link={linkShared}
        onCopy={onLinkShareCopy}
        open={linkShareDialogOpen}
        onOpenChange={onLinkShareDialogOpenChange}
      />

      <DeleteAlertDialog open={deleteDialogOpen} onOpenChange={onDeleteDialogOpenChange} onDelete={onDelete} />

      <InternationalPackageUpdateDialog
        open={updateDialogOpen}
        onOpenChange={onUpdateDialogOpenChange}
        defaultValues={internationalPackageFormValues}
        onUpdate={onUpdate}
      />
    </div>
  )
}
