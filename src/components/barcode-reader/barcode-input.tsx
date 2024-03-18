import { forwardRef, useState } from 'react'
import { EnterFullScreenIcon } from '@radix-ui/react-icons'
import { Input, type InputProps } from '../ui/input'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import BarcodeReader from './barcode-reader'
import { cn } from '@/lib/utils'

export interface BarcodeIntputProps extends InputProps {}
export const BarcodeInput = forwardRef<HTMLInputElement, BarcodeIntputProps>(({
  ...restProps
}: BarcodeIntputProps, forwardRef) => {
  const [reading, setReading] = useState(false)
  const [barcode, setBarcode] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpenDialog = (open: boolean) => {
    setReading(open)
    setOpen(open)
    setBarcode('')
  }
  const handleConfirmInput = () => {
    restProps.onChange?.({ target: { value: barcode } } as any)
    handleOpenDialog(false)
  }
  return (
    <>
      <div className="relative">
        <Input ref={forwardRef} {...restProps} className={cn('pr-[32px]', restProps.className)} />
        <Button variant="ghost" size="sm" className="absolute top-[50%] right-0 translate-y-[-50%]" onClick={() => handleOpenDialog(true)}>
          <EnterFullScreenIcon />
        </Button>
      </div>
      <Dialog open={open} onOpenChange={handleOpenDialog}>
        <DialogContent>
          <DialogHeader>录入条码</DialogHeader>
          <BarcodeReader
            reading={reading}
            onReadingChange={setReading}
            value={barcode}
            onValueChange={setBarcode}
            actions={<Button disabled={!barcode} className="w-full" onClick={handleConfirmInput}>录入</Button>}
          />
        </DialogContent>
      </Dialog>
    </>
  )
})
