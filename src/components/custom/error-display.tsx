'use client'

import { Button } from '../ui/button'
import { Separator } from '@/components/ui/separator'

export interface ErrorDisplayProps {
  title: string
  description: string
  onReset: () => void
}
export default function ErrorDisplay({
  title,
  description,
  onReset,
}: ErrorDisplayProps) {
  return (
    <main className="w-screen h-screen flex flex-col items-start justify-center p-8 space-y-4">
      <div className="flex items-end space-x-4">
        <h1 className="text-bold text-4xl">Error</h1>
        <Separator orientation="vertical" />
        <p className="text-muted-foreground">{title}</p>
      </div>
      <p className="text-muted-foreground">{description}</p>
      <Button onClick={onReset}>重试</Button>
    </main>
  )
}
