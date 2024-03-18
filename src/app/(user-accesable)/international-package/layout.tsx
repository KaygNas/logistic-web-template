import React from 'react'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/toaster'
import { AdminEntry } from '@/components/custom/admin-entry'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Toaster />
    </>
  )
}

function Header() {
  return (
    <header className="bg-white">
      <div className="w-full flex items-center px-4 py-2 text-primary">
        <div className="bg-primary text-white p-2 rounded">
          <PaperPlaneIcon />
        </div>
        <h1 className="font-bold text-lg ml-2">
          你好国际转运
        </h1>
        <div className="ml-auto">
          <AdminEntry />
        </div>
      </div>
      <Separator />
    </header>
  )
}
