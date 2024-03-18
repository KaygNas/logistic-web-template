'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { DetectedBarcode } from 'barcode-detector'
import { BarcodeDetector } from 'barcode-detector'

export type { DetectedBarcode } from 'barcode-detector'

function stopStream(stream: MediaStream | null) {
  if (stream)
    stream.getTracks().forEach(track => track.stop())
}

export interface BarcodeReaderDisplayerProps extends React.HTMLAttributes<HTMLVideoElement> {
  deviceId: string
  start: boolean
  reading: boolean
  onRead: (code: DetectedBarcode[]) => void
  onError: (error: unknown) => void
}
const BarcodeReaderDisplayer = forwardRef<HTMLVideoElement | null, BarcodeReaderDisplayerProps>(({
  deviceId,
  start,
  reading,
  onRead,
  onError,
  ...restProps
}, fowardedRef) => {
  const displayerRef = useRef<HTMLVideoElement>(null)
  const animationId = useRef<number | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useImperativeHandle(fowardedRef, () => displayerRef.current!, [displayerRef.current])

  useEffect(() => {
    let ignore = false
    let newStream: MediaStream | null = null

    async function createStream() {
      if (deviceId && deviceId !== 'default')
        newStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId }, audio: false })
      else
        newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })

      if (ignore)
        stopStream(newStream)
      else
        setStream(newStream)
    }

    function clearStream() {
      ignore = true
      stopStream(newStream)
      setStream(null)
    }

    if (start)
      createStream()
    else
      clearStream()

    return clearStream
  }, [start, deviceId])

  useEffect(() => {
    function attachStream() {
      if (displayerRef.current && stream) {
        displayerRef.current.srcObject = stream
        displayerRef.current.play()
      }
      else {
        dettachStream()
      }
    }

    function dettachStream() {
      stopStream(stream)
      if (displayerRef.current) {
        displayerRef.current.pause()
        displayerRef.current.srcObject = null
      }
    }

    attachStream()
    return dettachStream
  }, [stream])

  useEffect(() => {
    let ignore = false

    async function startRead() {
      const formats = await BarcodeDetector.getSupportedFormats()
      const barcodeDetector = new BarcodeDetector({ formats: [...formats] })
      const read = async () => {
        if (!displayerRef.current || !start)
          return

        try {
          const barcodes = await barcodeDetector.detect(displayerRef.current)
          if (!ignore)
            onRead(barcodes)
        }
        catch (error) {
          if (!ignore)
            onError(error)
        }
        finally {
          if (!ignore)
            animationId.current = requestAnimationFrame(read)
        }
      }
      if (!ignore)
        animationId.current = requestAnimationFrame(read)
    }

    function stopRead() {
      ignore = true
      if (animationId.current)
        cancelAnimationFrame(animationId.current)
    }

    if (reading)
      startRead()
    else
      stopRead()

    return stopRead
  }, [reading, start])

  return (
    <video ref={displayerRef} playsInline {...restProps} />
  )
})

export default BarcodeReaderDisplayer
