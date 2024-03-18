'use client'

import ErrorDisplay from '@/components/custom/error-display'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: boolean }
  reset: () => void
}) {
  return (
    <ErrorDisplay
      title="出错了"
      description={error.message}
      onReset={reset}
    />
  )
}
