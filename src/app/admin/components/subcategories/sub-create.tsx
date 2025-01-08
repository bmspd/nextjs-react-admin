import { Create, SimpleForm, TextInput, TopToolbar, TransformData } from 'react-admin'
import { Link, useParams } from 'react-router-dom'

const SubCreateActions = () => {
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

export const SubCategoriesCreate = () => {
  const { categoryId } = useParams()
  const transform: TransformData = (data) => {
    return { name: data.name, category: categoryId }
  }
  return (
    <Create
      title="Новая подкатегория"
      resource="subcategories"
      actions={<SubCreateActions />}
      transform={transform}
      redirect="./.."
    >
      <SimpleForm>
        <TextInput source="name" label="Название" />
      </SimpleForm>
    </Create>
  )
}
