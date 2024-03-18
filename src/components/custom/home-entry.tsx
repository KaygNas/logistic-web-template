import { HomeIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export interface HomeEntryProps extends Omit<React.ComponentProps<typeof Link>, 'href'> {}
export function HomeEntry(props: HomeEntryProps) {
  return (
    <Link {...props} href="/">
      <Button variant="default" size="icon"><HomeIcon /></Button>
    </Link>
  )
}
