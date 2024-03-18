'use client'

import type { Prisma } from '@prisma/client'
import { useState } from 'react'
import type { UserTableProps } from './UserTable'
import UserTable from './UserTable'
import type { UserFormProps } from './UserForm'
import UserForm from './UserForm'
import FormDialog, { FormDialogFooter, useFormDialog } from '@/components/custom/FormDialog'
import { Button } from '@/components/ui/button'
import { createUser } from '@/actions'
import { useToast } from '@/components/ui/use-toast'

export interface UserDisplayProps {
  defaultValues: Prisma.UserGetPayload<null>[]
}
export default function UserDisplay(
  {
    defaultValues,
  }: UserDisplayProps,
) {
  const [data, setData] = useState(defaultValues)

  const [open, dispatchOpen, defaultProps] = useFormDialog()
  const { toast } = useToast()
  const onSubmit: UserFormProps['onSubmit'] = async (values) => {
    const user = await createUser({ nickname: values.nickname })
    setData([user, ...data])
    dispatchOpen({ type: 'change', payload: false })
    toast({ title: '用户创建成功' })
  }

  const onUpdated: UserTableProps['onUpdated'] = (value) => {
    const index = data.findIndex(user => user.uuid === value.uuid)
    const newData = [...data]
    newData[index] = value
    setData(newData)
  }

  const onDeleted: UserTableProps['onDeleted'] = (value) => {
    const newData = data.filter(user => user.uuid !== value.uuid)
    setData(newData)
  }
  return (
    <div className="p-4">
      <FormDialog
        {...defaultProps}
        title="编辑用户"
        open={open}
      >
        <UserForm
          defaultValues={{ nickname: '' }}
          actions={<FormDialogFooter><Button type="submit">保存</Button></FormDialogFooter>}
          onSubmit={onSubmit}
        />
      </FormDialog>
      <Button className="mb-2" onClick={() => dispatchOpen({ type: 'change', payload: true })}>添加新用户</Button>
      <UserTable data={data} onUpdated={onUpdated} onDeleted={onDeleted} />
    </div>
  )
}
