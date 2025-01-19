import { Link, useParams } from 'react-router-dom'
import { ReorderList } from '../reorder-list'
import { Button, ExportButton, TextField, TopToolbar } from 'react-admin'
import { DraggableDatagrid } from '../draggable-datagrid'
import { Breadcrumbs, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { ReorderingControls } from '../reordering-context/reordering-controls'
import { ActionsField } from '../actions-field'
import { ColorField } from './fields/color-field'

const ItemsBreadCrumbs = () => {
  const { categoryId, subId } = useParams<{ categoryId: string; subId: string }>()
  return (
    <Breadcrumbs>
      <Link to="/categories" className="text-blue-500">
        Категории
      </Link>
      <Link to={`/categories/${categoryId}/subs`} className="text-blue-500">
        Категория #{categoryId}
      </Link>
      <Typography>Подкатегория #{subId}</Typography>
    </Breadcrumbs>
  )
}

const ItemsFilters = () => (
  <TopToolbar>
    <ItemsBreadCrumbs />
  </TopToolbar>
)

const ItemsActions = ({ subId }: { subId?: string }) => (
  <TopToolbar>
    <Link to="./create">
      <Button label="Добавить" startIcon={<AddBoxIcon />} />
    </Link>
    <ReorderingControls
      onSave={(orderingData) =>
        fetch(`/api/data/subcategories/${subId}/update-order/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderingData.map((el) => el.id)),
        })
      }
    />
    <ExportButton />
  </TopToolbar>
)

export const ItemsList = () => {
  const { subId } = useParams<{ categoryId: string; subId: string }>()
  return (
    <ReorderList
      resource={`subcategories/${subId}/items`}
      title={`Подкатегория #${subId}`}
      filters={<ItemsFilters />}
      actions={<ItemsActions subId={subId} />}
      pagination={false}
    >
      <DraggableDatagrid bulkActionButtons={false} isRowSelectable={() => false}>
        <TextField source="id" sortable={false} />
        <TextField source="name" sortable={false} label="Название" />
        <TextField source="price" sortable={false} label="Цена" />
        <ColorField source="color" sortable={false} label="Цвет" />
        <ActionsField resource="items" deleteConfirmProps={{ title: 'Удалить подкатегорию' }} />
      </DraggableDatagrid>
    </ReorderList>
  )
}
