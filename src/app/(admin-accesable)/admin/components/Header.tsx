'use client'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HomeEntry } from '@/components/custom/home-entry'

export default function Header({
  title,
  action,
}: {
  title: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="bg-white">
      <div className="flex items-center p-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <HamburgerMenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>导航菜单</SheetTitle>
              <SheetItem href="/admin/international-package" title="国际包裹管理" />
              <SheetItem href="/admin/stock" title="国内包裹入库" />
              <SheetItem href="/admin/user" title="用户管理" />
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {title}
        <div className="ml-auto space-x-2">
          {action}
          <HomeEntry className="mr-2" />
        </div>
      </div>
      <Separator />
    </div>
  )
}

interface SheetItemProps {
  href: string
  title: string
}
function SheetItem({
  href,
  title,
}: SheetItemProps) {
  const pathname = usePathname()
  return (
    <Link href={href}>
      <Button variant="ghost" className={`w-full justify-start text-base ${href === pathname ? 'bg-primary text-white' : ''}`}>{title}</Button>
    </Link>
  )
}
