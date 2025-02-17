import { Button, TextField, TopToolbar, useListContext } from 'react-admin'
import { Link, useParams } from 'react-router-dom'
import { DraggableDatagrid } from '../draggable-datagrid'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { SubCategoriesBreadCrumbs } from './sub-breadcrumbs'
import { ReorderingControls } from '../reordering-context/reordering-controls'
import { ActionsField } from '../actions-field'
import { ReorderList } from '../reorder-list'
import { LinkField } from '../link-field'
import { ReorderIndicatorField } from '../draggable-datagrid/reorder-indicator-field'

const DynamicTitle = () => {
  const { meta } = useListContext()
  return `${meta?.categoryName ?? ''} (подкатегории)`
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
  </TopToolbar>
)

export const SubCategoriesList = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  return (
    <ReorderList
      resource={`categories/${categoryId}/subs`}
      title={<DynamicTitle />}
      filters={<SubFilters />}
      actions={<SubActions categoryId={categoryId} />}
      pagination={false}
    >
      <DraggableDatagrid bulkActionButtons={false} isRowSelectable={() => false}>
        <TextField source="id" sortable={false} />
        <LinkField href={(record) => `./${record.id}/items`} element={(record) => record.name} label="Название" />
        <ActionsField
          resource="subcategories"
          deleteConfirmProps={{ title: 'Удалить подкатегорию' }}
          source=""
          textAlign="right"
        />
        <ReorderIndicatorField source="" textAlign="right" />
      </DraggableDatagrid>
    </ReorderList>
  )
}
