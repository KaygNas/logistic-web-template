import React from 'react'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import InternationalPackageQueryForm from './internation-package-query-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AdminEntry } from '@/components/custom/admin-entry'

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="absolute right-4 top-2"><AdminEntry /></div>
      <Card className="flex-1 mx-4 sm:max-w-[420px]">
        <CardHeader>
          <div className="flex items-center space-x-3 py-6 text-primary">
            <div className="bg-primary text-white p-3 rounded">
              <PaperPlaneIcon className="w-4 h-4" />
            </div>
            <h1 className="font-bold text-4xl">
              你好国际转运
            </h1>
          </div>
        </CardHeader>
        <CardContent>
          <InternationalPackageQueryForm />
        </CardContent>
      </Card>
    </main>
  )
}
