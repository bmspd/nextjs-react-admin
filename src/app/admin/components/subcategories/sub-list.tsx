import { Box, IconButton } from '@mui/material'
import {
  Button,
  Confirm,
  ConfirmProps,
  ExportButton,
  List,
  TextField,
  TopToolbar,
  useDeleteWithConfirmController,
  useListContext,
  useRecordContext,
  useRefresh,
  WrapperField,
} from 'react-admin'
import { Link, useParams } from 'react-router-dom'
import { SubCategoriesBreadCrumbs } from './sub-breadcrumbs'
import { DraggableDatagrid } from '../draggable-datagrid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddBoxIcon from '@mui/icons-material/AddBox'

const DynamicTitle = () => {
  const { meta } = useListContext()
  return <span>{meta?.categoryName}</span>
}

export const ActionsField = () => {
  const record = useRecordContext()
  return (
    <WrapperField>
      <Link to={`./${record?.id}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
      <CustomDeleteButton resource="subcategories" confirmProps={{ title: 'Удалить подкатегорию' }} />
    </WrapperField>
  )
}

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

export const SubCategoriesList = () => {
  const { categoryId } = useParams()
  return (
    <Box sx={{ paddingTop: 2 }}>
      <List
        resource={`categories/${categoryId}/`}
        pagination={false}
        title={<DynamicTitle />}
        filters={
          <TopToolbar>
            <SubCategoriesBreadCrumbs />
          </TopToolbar>
        }
        actions={
          <TopToolbar>
            <Link to="./create">
              <Button label="Добавить" startIcon={<AddBoxIcon />} />
            </Link>
            <ExportButton />
          </TopToolbar>
        }
      >
        <DraggableDatagrid bulkActionButtons={false} isRowSelectable={() => false}>
          <TextField source="id" sortable={false} />
          <TextField source="name" sortable={false} />
          <ActionsField />
        </DraggableDatagrid>
      </List>
    </Box>
  )
}
