import { Button, NumberField, TopToolbar } from 'react-admin'
import { Link } from 'react-router-dom'
import { LinkField } from '../link-field'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { ActionsField } from '../actions-field'
import { ReorderList } from '../reorder-list'
import { DraggableDatagrid } from '../draggable-datagrid'
import { ReorderingControls } from '../reordering-context/reordering-controls'

const CategoriesActions = () => (
  <TopToolbar>
    <Link to="./create">
      <Button label="Добавить" startIcon={<AddBoxIcon />} />
    </Link>
    <ReorderingControls
      onSave={(orderingData) =>
        fetch('/api/data/categories/update-order/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderingData.map((el) => el.id)),
        })
      }
    />
  </TopToolbar>
)

export const CategoriesList = () => {
  return (
    <ReorderList resource="categories" title="Категории" actions={<CategoriesActions />} pagination={false}>
      <DraggableDatagrid bulkActionButtons={false} rowClick={false}>
        <LinkField href={(record) => `./${record.id}/subs`} element={(record) => record.name} label="Название" />
        <NumberField source="column_number" label="Колонка в меню" sortable={false} />
        <ActionsField resource="categories" deleteConfirmProps={{ title: 'Удалить категорию' }} />
      </DraggableDatagrid>
    </ReorderList>
  )
}
