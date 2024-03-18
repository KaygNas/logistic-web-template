import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Option } from '@/types'

export interface BarcodeReaderCameraSelectProps {
  value: string
  onValueChange: (value: string) => void
}
export default function BarcodeReaderCameraSelect({
  value,
  onValueChange,
}: BarcodeReaderCameraSelectProps) {
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    const getDivieces = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      stream.getTracks().forEach(track => track.stop())
      const devices = await navigator.mediaDevices.enumerateDevices()
      return devices
    }
    getDivieces().then((devices) => {
      const options: Option[] = devices.filter(device => device.kind === 'videoinput')
        .map(device => ({ label: device.label, value: device.deviceId }))

      options.unshift({ label: '默认', value: 'default' })

      setOptions(options)
      devices.length && onValueChange(options[0].value)
    })
    return () => { }
  }, [])

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-0 flex-1">
        <SelectValue placeholder="请选择相机" />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
