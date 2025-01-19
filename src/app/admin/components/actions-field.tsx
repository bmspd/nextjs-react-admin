import { ConfirmProps, useRecordContext, WrapperField } from 'react-admin'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { CustomDeleteButton } from './custom-delete-button'
import { Link } from 'react-router-dom'

export const ActionsField = ({
  resource,
  deleteConfirmProps,
}: {
  resource: string
  deleteConfirmProps: Partial<ConfirmProps>
}) => {
  const record = useRecordContext()
  return (
    <WrapperField>
      <Link to={`./${record?.id}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
      <CustomDeleteButton resource={resource} confirmProps={{ ...deleteConfirmProps }} />
    </WrapperField>
  )
}
