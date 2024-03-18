'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React from 'react'
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
  title: z.string().min(1, '标题不能为空').max(100, '标题不能超过100个字符'),
  code: z.string().optional(),
  address: z.string().optional(),
  recipient: z.string().optional(),
  recipientPhone: z.string().optional(),
  note: z.string().optional(),
})

export type InternationalPackageFormValues = z.infer<typeof formSchema>

export interface InternationalPackageFormProps {
  actions: React.ReactNode
  defaultValues: InternationalPackageFormValues
  onSubmit: (values: InternationalPackageFormValues) => void
}

export default function InternationalPackageForm({
  actions,
  defaultValues,
  onSubmit,
}: InternationalPackageFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>标题</FormLabel>
              <FormControl>
                <Input placeholder="国际包裹的展示标题" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>单号</FormLabel>
              <FormControl>
                <Input placeholder="国际快递单号" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>收件人</FormLabel>
              <FormControl>
                <Input placeholder="收件人姓名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recipientPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>收件人电话</FormLabel>
              <FormControl>
                <Input placeholder="收件人本地电话" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>收件地址</FormLabel>
              <FormControl>
                <Input placeholder="收件地址" {...field} />
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
