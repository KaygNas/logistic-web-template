import { LockClosedIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Button } from '../ui/button'

export function AdminEntry() {
  return (
    <Link href="/admin">
      <Button variant="default" size="icon"><LockClosedIcon /></Button>
    </Link>
  )
}
