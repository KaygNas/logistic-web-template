import type { Prisma } from '@prisma/client'

export const parseNumber = (value: string | number | undefined | null) => Number(value ?? 0)
export function calcSubTotalPrice(unitValue: number | undefined | null, priceValue: number | undefined | null) {
  unitValue = parseNumber(unitValue)
  priceValue = parseNumber(priceValue)
  return Number((unitValue * priceValue).toFixed(2))
}
export function displayCalculation({
  unitValue,
  unitLabel,
  priceValue,
  priceLabel,
}: {
  unitValue: number | undefined | null
  unitLabel: string
  priceValue: number | undefined | null
  priceLabel: string
}) {
  unitValue = parseNumber(unitValue)
  priceValue = parseNumber(priceValue)
  return `${unitValue}${unitLabel} x ${priceValue}${priceLabel} = ${calcSubTotalPrice(unitValue, priceValue)}${priceLabel}`
}

export function calcRepackedDomesticPackageTotalPrice(p: Partial<Pick<Prisma.RepackedDomesticPackageGetPayload<null>, 'volume' | 'volumeUnitPrice' | 'weight' | 'weightUnitPrice'>>) {
  return Math.max(
    calcSubTotalPrice(p.volume, p.volumeUnitPrice),
    calcSubTotalPrice(p.weight, p.weightUnitPrice),
  )
}
