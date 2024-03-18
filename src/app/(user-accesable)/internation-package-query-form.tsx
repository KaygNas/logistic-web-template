'use client'

import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { fetchInternationalPackageShallowByDemoesticPackageCode } from '@/actions'
import { BarcodeInput } from '@/components/barcode-reader'

const formSchema = z.object({
  code: z.string({ required_error: '国内包裹单号不能为空' }),
})

export type InternationalPackageQueryFormValues = z.infer<typeof formSchema>

export default function InternationalPackageQueryForm() {
  const form = useForm<InternationalPackageQueryFormValues>({
    resolver: zodResolver(formSchema),
  })
  const router = useRouter()
  const handleQuery = async (values: InternationalPackageQueryFormValues) => {
    const internationalPackage = await fetchInternationalPackageShallowByDemoesticPackageCode(values.code)
    if (internationalPackage)
      router.push(`/international-package/${internationalPackage.uuid}`)
    else
      form.setError('code', { message: '国内包裹不存在' })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleQuery)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>国内包裹单号</FormLabel>
              <FormControl>
                <BarcodeInput autoComplete="off" placeholder="请输入国内包裹单号" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">查询订单</Button>
      </form>
    </Form>
  )
}
