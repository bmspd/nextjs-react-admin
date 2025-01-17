import { Edit, TopToolbar, TransformData } from 'react-admin'
import { Link } from 'react-router-dom'
import { formatImageToServer } from '../utils'
import { CategoriesForm } from './categories-form'

const CategoriesEditActions = () => {
  return (
    <TopToolbar>
      <div className="w-full">
        <Link className="text-blue-500" to="./..">
          Назад к категориям
        </Link>
      </div>
    </TopToolbar>
  )
}

export const CategoriesEdit = () => {
  const transform: TransformData = async (data) => {
    const photo = await formatImageToServer(data.photo)
    return {
      name: data.name,
      description: data.description,
      hash_tags: data.hash_tags,
      is_active: data.is_active,
      is_tile: data.is_tile,
      photo,
      column_number: data.column_number,
    }
  }
  return (
    <Edit title="Изменить категорию" actions={<CategoriesEditActions />} mutationMode="pessimistic" transform={transform}>
      <CategoriesForm />
    </Edit>
  )
}
