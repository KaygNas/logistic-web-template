'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React from 'react'
import { BarcodeInput } from '../barcode-reader'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  code: z.string().min(1, '单号不能为空'),
  note: z.string().optional(),
})

export type DomesticPackageFormValues = z.infer<typeof formSchema>

export interface DomesticPackageFormProps {
  actions: React.ReactNode
  defaultValues: DomesticPackageFormValues
  onSubmit: (values: DomesticPackageFormValues) => void
}

export default function DomesticPackageForm({
  actions,
  defaultValues,
  onSubmit,
}: DomesticPackageFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>单号</FormLabel>
              <FormControl>
                <BarcodeInput autoComplete="off" placeholder="国内快递单号" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>备注</FormLabel>
              <FormControl>
                <Input placeholder="备注" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {actions}
      </form>
    </Form>
  )
}
