'use client'

import { useState } from 'react'
import type { DomesticPackageFormProps, DomesticPackageFormValues } from './DomesticPackageForm'
import DomesticPackageForm from './DomesticPackageForm'
import BarcodeReader from '@/components/barcode-reader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { createDomesticPackageByInternationalPackageAndUserUuid } from '@/actions'
import { useToast } from '@/components/ui/use-toast'

export default function DomesticPackageStock() {
  const [barcode, setBarcode] = useState('')
  const [open, setOpen] = useState(false)
  const [submittedData, setSubmittedData] = useState<DomesticPackageFormValues>()
  const [reading, setReading] = useState(false)

  const defaultValues: DomesticPackageFormValues = Object.assign({
    internationalPackageUuid: '',
    userUuid: '',
    code: '',
  }, submittedData || {}, { code: barcode })

  const { toast } = useToast()
  const onSubmit: DomesticPackageFormProps['onSubmit'] = async (values) => {
    setSubmittedData(values)
    const [error, domesticPackage] = await createDomesticPackageByInternationalPackageAndUserUuid({
      internationalPackageUuid: values.internationalPackageUuid,
      userUuid: values.userUuid,
      code: values.code,
      note: values.note ?? null,
    })
    if (domesticPackage) {
      toast({ title: '添加国内包裹成功' })
      setOpen(false)
      setBarcode('')
      setReading(true)
    }
    else {
      toast({ title: error.message, variant: 'destructive' })
    }
  }

  return (
    <div className="p-4">
      <BarcodeReader
        reading={reading}
        onReadingChange={setReading}
        value={barcode}
        onValueChange={setBarcode}
        actions={(
          <Button variant="default" disabled={!barcode} className="w-full mt-2" onClick={() => setOpen(true)}>
            添加国内包裹
          </Button>
        )}
      />

      <Dialog open={open} onOpenChange={value => setOpen(value)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加国内包裹</DialogTitle>
          </DialogHeader>
          <DomesticPackageForm
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
    </div>
  )
}
