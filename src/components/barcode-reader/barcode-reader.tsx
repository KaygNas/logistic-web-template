'use client'
import { useState } from 'react'
import { ResetIcon } from '@radix-ui/react-icons'
import BarcodeReaderCameraSelect from './barcode-reader-camera-select'
import type { BarcodeReaderDisplayerProps } from './barcode-reader-displayer'
import BarcodeReaderDisplayer from './barcode-reader-displayer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface BarcodeReaderProps {
  reading: BarcodeReaderDisplayerProps['reading']
  onReadingChange: (reading: BarcodeReaderDisplayerProps['reading']) => void

  value?: string
  onValueChange?: (qrcode: string) => void
  actions?: React.ReactNode
}
export default function BarcodeReader({
  value,
  onValueChange,
  actions,
  reading,
  onReadingChange,
}: BarcodeReaderProps) {
  const [deviceId, setDeviceId] = useState('')
  const [start, setStart] = useState(false)

  const readerClassName = start
    ? value ? 'border-lime-400' : 'border-slate-100'
    : 'border-none'

  const handleStart = () => {
    setStart(true)
    onReadingChange(true)
  }
  const handleStop = () => {
    setStart(false)
    onReadingChange(false)
    onValueChange?.('')
  }

  const handleRead: BarcodeReaderDisplayerProps['onRead'] = (codes) => {
    if (codes.length > 0) {
      onReadingChange(false)
      onValueChange?.(codes[0].rawValue)
    }
  }
  const handleError: BarcodeReaderDisplayerProps['onError'] = (error) => {
    console.error(error)
  }

  const handleReread = () => {
    onValueChange?.('')
    onReadingChange(true)
  }

  return (
    <div>
      <div className="w-full flex items-center space-x-2 mb-2">
        <BarcodeReaderCameraSelect value={deviceId} onValueChange={setDeviceId} />
        {start
          ? <Button variant="destructive" onClick={handleStop}>停止扫描</Button>
          : <Button variant="default" onClick={handleStart}>开始扫描</Button>}
      </div>
      <Card className="shadow-none border-dashed">
        <CardContent className="h-[200px] w-full p-6 relative">
          <div className={`relative flex items-center overflow-hidden h-full w-full rounded-md border-8 border-solid ${readerClassName}`}>
            <BarcodeReaderDisplayer
              deviceId={deviceId}
              start={start}
              reading={reading}
              onRead={handleRead}
              onError={handleError}
              className="w-full"
            />
            {(start && value) && (
              <div className="backdrop-blur-md absolute left-0 right-0 top-0 bottom-0 flex">
                <h3 className="text-2xl text-lime-300 font-bold whitespace-nowrap m-auto">扫描成功</h3>
              </div>
            )}
          </div>
          {!start && <h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl text-slate-200 font-bold whitespace-nowrap">选择相机并开启扫描</h3>}
        </CardContent>
      </Card>
      {start && (
        <Card className="shadow-none border-dashed mt-2">
          <CardContent className="p-6">
            <span className="text-sm text-muted-foreground">单号</span>
            <div className="flex items-center justify-between">
              <h3 className="whitespace-pre-wrap break-all">{value || '无扫描结果'}</h3>
              <Button variant="ghost" size="icon" onClick={handleReread}>
                <ResetIcon />
              </Button>
            </div>

            {actions}

          </CardContent>
        </Card>
      )}
    </div>
  )
}
