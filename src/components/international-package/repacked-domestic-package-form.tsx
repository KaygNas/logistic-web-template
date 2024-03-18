'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React from 'react'
import { parseNumber } from '../../utils/price'
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
  volume: z.string().or(z.number()).transform(parseNumber),
  volumeUnitPrice: z.string().or(z.number()).transform(parseNumber),
  weight: z.string().or(z.number()).transform(parseNumber),
  weightUnitPrice: z.string().or(z.number()).transform(parseNumber),
})

export type RepackedDomesticPackageFormValues = z.infer<typeof formSchema>

export interface RepackedDomesticPackageFormProps {
  actions: React.ReactNode
  defaultValues: RepackedDomesticPackageFormValues
  onSubmit: (values: RepackedDomesticPackageFormValues) => void
}

export default function RepackedDomesticPackageForm({
  actions,
  defaultValues,
  onSubmit,
}: RepackedDomesticPackageFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="volume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>体积</FormLabel>
              <FormControl>
                <Input
                  placeholder="包裹体积(m³)"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="volumeUnitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>体积单价</FormLabel>
              <FormControl>
                <Input placeholder="体积单价（m³/元)" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>重量</FormLabel>
              <FormControl>
                <Input placeholder="包裹重量（kg）" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weightUnitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>重量单价</FormLabel>
              <FormControl>
                <Input placeholder="包裹重量单价（kg/元）" type="number" {...field} onChange={field.onChange} />
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
