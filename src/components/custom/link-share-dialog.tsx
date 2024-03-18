import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog'

export interface LinkShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  link: string
  onCopy: (link: string) => void
}
export default function LinkShareDialog({
  open,
  onOpenChange,
  link,
  onCopy,
}: LinkShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <span>分享链接</span>
          </div>
          <div
            className="p-2 border rounded break-all bg-muted text-muted-foreground"
          >
            {link}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onCopy(link)}>复制</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
