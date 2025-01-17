import { Button, Datagrid, ExportButton, List, NumberField, TopToolbar } from 'react-admin'
import { Link } from 'react-router-dom'
import { LinkField } from '../link-field'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { ActionsField } from '../actions-field'

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
        <NumberField source="column_number" label="Колонка в меню" />
        <ActionsField resource="categories" deleteConfirmProps={{ title: 'Удалить категорию' }} />
      </Datagrid>
    </List>
  )
}
