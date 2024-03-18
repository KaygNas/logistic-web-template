'use client'

import type { Prisma } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import DeleteAlertDialog from '../../../../../components/custom/DeleteAlertDialog'
import type { UserFormProps } from './UserForm'
import UserForm from './UserForm'
import FormDialog, { FormDialogFooter, useFormDialog } from '@/components/custom/FormDialog'
import { DataTable } from '@/components/custom/DataTable'
import { deleteUser, updateUser } from '@/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

type User = Prisma.UserGetPayload<null>

export interface UserTableProps {
  data: User[]
  onUpdated?: (value: User) => void
  onDeleted?: (value: User) => void
}

export default function UserTable({
  data,
  onUpdated,
  onDeleted,
}: UserTableProps) {
  const columns: ColumnDef<User>[] = [
    {
      header: '序号',
      accessorKey: 'idx',
    },
    {
      header: '昵称',
      cell: (ctx) => {
        const data = ctx.row.original
        return (<span className="break-all whitespace-pre-wrap">{data.nickname}</span>)
      },
    },
    {
      header: '操作',
      cell: (ctx) => {
        const data = ctx.row.original
        const [open, dispatchOpen, defaultProps] = useFormDialog()
        const { toast } = useToast()
        const onSubmit: UserFormProps['onSubmit'] = async (values) => {
          const user = await updateUser({ uuid: data.uuid, data: { nickname: values.nickname } })
          onUpdated?.(user)
          toast({ title: '用户编辑成功' })
          dispatchOpen({ type: 'change', payload: false })
        }
        const defaultValues: UserFormProps['defaultValues'] = {
          nickname: data.nickname,
        }

        const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
        const handleDelete = async () => {
          await deleteUser(data.uuid)
          onDeleted?.(data)
          toast({ title: '用户删除成功' })
          setDeleteDialogOpen(false)
        }
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button asChild variant="outline" size="icon">
                  <div>
                    <DotsVerticalIcon />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => dispatchOpen({ type: 'change', payload: true })}>
                  <Pencil2Icon className="mr-2" />
                  编辑
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => setDeleteDialogOpen(true)}>
                  <TrashIcon className="mr-2" />
                  删除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DeleteAlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onDelete={handleDelete} />
            <FormDialog
              {...defaultProps}
              title="编辑用户"
              open={open}
            >
              <UserForm
                defaultValues={defaultValues}
                actions={<FormDialogFooter><Button type="submit">保存</Button></FormDialogFooter>}
                onSubmit={onSubmit}
              />
            </FormDialog>
          </>
        )
      },
    },
  ]
  return (
    <DataTable columns={columns} data={data} />
  )
}
