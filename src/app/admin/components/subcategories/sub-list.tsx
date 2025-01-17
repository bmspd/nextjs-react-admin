import { Button, ExportButton, TextField, TopToolbar, useListContext } from 'react-admin'
import { Link, useParams } from 'react-router-dom'
import { DraggableDatagrid } from '../draggable-datagrid'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { SubCategoriesBreadCrumbs } from './sub-breadcrumbs'
import { ReorderingControls } from '../reordering-context/reordering-controls'
import { ActionsField } from '../actions-field'
import { ReorderList } from '../reorder-list'

const DynamicTitle = () => {
  const { meta } = useListContext()
  return <span>{meta?.categoryName}</span>
}

const SubFilters = () => (
  <TopToolbar>
    <SubCategoriesBreadCrumbs />
  </TopToolbar>
)

const SubActions = ({ categoryId }: { categoryId?: string }) => (
  <TopToolbar>
    <Link to="./create">
      <Button label="Добавить" startIcon={<AddBoxIcon />} />
    </Link>
    <ReorderingControls
      onSave={(orderingData) =>
        fetch(`/api/data/categories/${categoryId}/update-subcategories-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderingData.map((el) => el.id)),
        })
      }
    />
    <ExportButton />
  </TopToolbar>
)

export const SubCategoriesList = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  return (
    <ReorderList
      resource={`categories/${categoryId}/items`}
      title={<DynamicTitle />}
      filters={<SubFilters />}
      actions={<SubActions categoryId={categoryId} />}
      pagination={false}
    >
      <DraggableDatagrid bulkActionButtons={false} isRowSelectable={() => false}>
        <TextField source="id" sortable={false} />
        <TextField source="name" sortable={false} />
        <ActionsField resource="subcategories" deleteConfirmProps={{ title: 'Удалить подкатегорию' }} />
      </DraggableDatagrid>
    </ReorderList>
  )
}
