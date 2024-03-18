'use client'

import React, { useReducer } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export { DialogFooter as FormDialogFooter } from '@/components/ui/dialog'

export function useFormDialog() {
  const [open, dispatchOpen] = useReducer((state: boolean, action: { type: 'change', payload: boolean }) => {
    switch (action.type) {
      case 'change':
        return action.payload
      default:
        return state
    }
  }, false)

  const defaultProps = {
    onOpenChange: (value: boolean) => dispatchOpen({ type: 'change', payload: value }),
  }

  return [open, dispatchOpen, defaultProps] as const
}

export interface FormDialogProps {
  title: string
  open: boolean
  trigger?: React.ReactNode
  children?: React.ReactNode
  onOpenChange: (value: boolean) => void
}

export default function FormDialog({
  title,
  trigger,
  children,

  open,
  onOpenChange,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
