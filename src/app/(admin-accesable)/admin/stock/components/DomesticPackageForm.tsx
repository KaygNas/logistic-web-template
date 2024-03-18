'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { fecthUsers, fetchInternationalPackagesShallow } from '@/actions'
import type { Option } from '@/types'

const formSchema = z.object({
  internationalPackageUuid: z.string().min(1, '国际包裹不能为空'),
  userUuid: z.string().min(1, '用户不能为空'),
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

  const [internationalPackageOptions, setInternationalPackageOptions] = useState<Option[]>([])
  useEffect(() => {
    fetchInternationalPackagesShallow().then((result) => {
      setInternationalPackageOptions(result.map(item => ({ label: item.title, value: String(item.uuid) })))
    })
  }, [])

  const [userOptions, setUserOptions] = useState<Option[]>([])
  useEffect(() => {
    fecthUsers().then((result) => {
      setUserOptions(result.map(item => ({ label: item.nickname, value: String(item.uuid) })))
    })
  }, [])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="internationalPackageUuid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>国际包裹</FormLabel>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择国际包裹" />
                  </SelectTrigger>
                  <SelectContent>
                    {internationalPackageOptions.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userUuid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户</FormLabel>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择用户" />
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
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>单号</FormLabel>
              <FormControl>
                <Input placeholder="国内快递单号" {...field} />
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
