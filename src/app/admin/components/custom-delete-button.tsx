import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Confirm, ConfirmProps, useDeleteWithConfirmController, useRecordContext, useRefresh } from 'react-admin'

export const CustomDeleteButton = ({
  resource,
  confirmProps,
}: {
  resource: string
  confirmProps?: Partial<ConfirmProps>
}) => {
  const record = useRecordContext()
  const refresh = useRefresh()
  const { open, isPending, handleDialogOpen, handleDialogClose, handleDelete } = useDeleteWithConfirmController({
    record,
    resource,
    redirect: false,
    mutationOptions: {
      onSuccess: () => {
        refresh()
      },
    },
  })

  return (
    <>
      <IconButton onClick={handleDialogOpen}>
        <DeleteIcon />
      </IconButton>
      <Confirm
        isOpen={open}
        loading={isPending}
        content="ra.message.delete_content"
        onConfirm={handleDelete}
        onClose={handleDialogClose}
        {...confirmProps}
        title={confirmProps?.title ?? 'Удалить'}
      />
    </>
  )
}
