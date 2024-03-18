'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  userUuid: z.string({ required_error: '用户不能为空' }),
})

export type InternationalPackageOrderFormValues = z.infer<typeof formSchema>

export interface InternationalPackageOrderFormProps {
  actions: React.ReactNode
  defaultValues: InternationalPackageOrderFormValues
  userOptions: { label: string, value: string }[]
  onSubmit: (values: InternationalPackageOrderFormValues) => void
}

export default function InternationalPackageOrderForm({ actions, defaultValues, userOptions, onSubmit }: InternationalPackageOrderFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userUuid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择订单所属用户" />
                  </SelectTrigger>
                  <SelectContent>
                    {userOptions.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
