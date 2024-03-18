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
  nickname: z.string(),
})

export type UserFormValues = z.infer<typeof formSchema>

export interface UserFormProps {
  actions: React.ReactNode
  defaultValues: UserFormValues
  onSubmit: (values: UserFormValues) => void
}

export default function UserForm({
  actions,
  defaultValues,
  onSubmit,
}: UserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>昵称</FormLabel>
              <FormControl>
                <Input placeholder="昵称" {...field} />
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
