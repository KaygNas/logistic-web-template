import type { Prisma } from '@prisma/client'
import { createRepackedDomesticPackage } from '@/actions'
import { Button } from '@/components/ui/button'

export interface RepackedDomesticPackageCreateButtonProps {
  internationalPackageOrderUuid: Prisma.RepackedDomesticPackageGetPayload<null>['internationalPackageOrderUuid']
  onCreated?: (repackedDomesticPackage: Prisma.RepackedDomesticPackageGetPayload<null>) => void
}

export default function RepackedDomesticPackageCreateButton({
  internationalPackageOrderUuid,
  onCreated,
}: RepackedDomesticPackageCreateButtonProps) {
  const onClick = async () => {
    const repackedDomesticPackage = await createRepackedDomesticPackage({ internationalPackageOrderUuid })
    onCreated?.(repackedDomesticPackage)
  }

  return (
    <Button variant="secondary" className="mb-4" onClick={onClick}>添加新打包</Button>
  )
}
