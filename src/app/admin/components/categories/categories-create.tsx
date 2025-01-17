import { CategoriesForm } from './categories-form'
import { Create, TopToolbar, TransformData } from 'react-admin'
import { Link } from 'react-router-dom'
import { formatImageToServer } from '../utils'

const CategoriesCreateActions = () => {
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

export const CategoriesCreate = () => {
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
    <Create
      title="Новая категория"
      actions={<CategoriesCreateActions />}
      transform={transform}
      redirect="./.."
      record={{ name: '', description: '', hash_tags: [], is_active: false, is_tile: false, photo: null, column_number: 3 }}
    >
      <CategoriesForm />
    </Create>
  )
}
