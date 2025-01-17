import { Card } from '@mui/material'
import { Button, ExportButton, ListBase, ListToolbar, TextField, Title, TopToolbar, useListContext } from 'react-admin'
import { Link, useParams } from 'react-router-dom'
import { DraggableDatagrid } from '../draggable-datagrid'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { ReorderingProvider } from '../reordering-context/reordering-context'
import { SubCategoriesBreadCrumbs } from './sub-breadcrumbs'
import { ReorderingControls } from '../reordering-context/reordering-controls'
import { ActionsField } from '../actions-field'

const DynamicTitle = () => {
  const { meta } = useListContext()
  return <span>{meta?.categoryName}</span>
}

export const SubCategoriesList = () => {
  const { categoryId } = useParams()
  return (
    <ListBase resource={`categories/${categoryId}/items`}>
      <ReorderingProvider>
        <Title title={<DynamicTitle />} />
        <ListToolbar
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
          }
        />
        <Card>
          <DraggableDatagrid bulkActionButtons={false} isRowSelectable={() => false}>
            <TextField source="id" sortable={false} />
            <TextField source="name" sortable={false} />
            <ActionsField resource="subcategories" deleteConfirmProps={{ title: 'Удалить подкатегорию' }} />
          </DraggableDatagrid>
        </Card>
      </ReorderingProvider>
    </ListBase>
  )
}
