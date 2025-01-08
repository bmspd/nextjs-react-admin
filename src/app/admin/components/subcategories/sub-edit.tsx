import {
  ArrayInput,
  DeleteButton,
  Edit,
  SaveButton,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
  Toolbar,
  TopToolbar,
  TransformData,
} from 'react-admin'
import { Link, useParams } from 'react-router-dom'

const SubEditActions = () => {
  return (
    <TopToolbar>
      <div className="w-full">
        <Link className="text-blue-500" to="./..">
          Назад к подкатегориям
        </Link>
      </div>
    </TopToolbar>
  )
}

export const SubCategoriesEdit = () => {
  const { subId } = useParams()
  const transform: TransformData = (data) => {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      hash_tags: data.hash_tags,
    }
  }
  return (
    <Edit
      resource="subcategories"
      redirect="./.."
      id={subId}
      actions={<SubEditActions />}
      mutationMode="pessimistic"
      transform={transform}
    >
      <TabbedForm
        syncWithLocation={false}
        toolbar={
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <SaveButton />
            <DeleteButton redirect="./.." />
          </Toolbar>
        }
      >
        <TabbedForm.Tab label="Основные">
          <TextInput source="name" label="Название" />
          <TextInput source="description" label="Описание" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Хэштэги">
          <ArrayInput source="hash_tags">
            <SimpleFormIterator inline>
              <TextInput source="">TEST</TextInput>
            </SimpleFormIterator>
          </ArrayInput>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  )
}
