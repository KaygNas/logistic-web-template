'use client'
import ErrorDisplay from '@/components/custom/error-display'

export default function Error({
  reset,
}: {
  reset: () => void
}) {
  return (
    <ErrorDisplay
      title="未知错误"
      description="请检查链接是否正确，或尝试联系管理员提供帮助。"
      onReset={reset}
    />
  )
}
