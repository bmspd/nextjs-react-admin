import { Button, Datagrid, ExportButton, List, TopToolbar, useRecordContext, WrapperField } from 'react-admin'
import { Link } from 'react-router-dom'
import { LinkField } from './link-field'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { CustomDeleteButton } from './subcategories/sub-list'
import AddBoxIcon from '@mui/icons-material/AddBox'

// TODO: лучше переиспользовать конечно же
const ActionsField = () => {
  const record = useRecordContext()
  return (
    <WrapperField>
      <Link to={`./${record?.id}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
      <CustomDeleteButton resource="categories" confirmProps={{ title: 'Удалить категорию' }} />
    </WrapperField>
  )
}

export const CategoriesList = () => {
  return (
    <List
      resource="categories"
      pagination={false}
      title="Категории"
      actions={
        <TopToolbar>
          <Link to="./create">
            <Button label="Добавить" startIcon={<AddBoxIcon />} />
          </Link>
          <ExportButton />
        </TopToolbar>
      }
    >
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <LinkField href={(record) => `./${record.id}/subs`} element={(record) => record.name} label="Название" />
        <ActionsField />
      </Datagrid>
    </List>
  )
}
