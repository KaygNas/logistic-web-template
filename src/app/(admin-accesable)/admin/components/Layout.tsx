import Header from './Header'
import { Toaster } from '@/components/ui/toaster'

export default function Layout({
  title,
  action,
  children,
}: {
  children: React.ReactNode
  title: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <>
      <Header title={title} action={action} />
      <div>
        {children}
      </div>
      <Toaster />
    </>
  )
}
