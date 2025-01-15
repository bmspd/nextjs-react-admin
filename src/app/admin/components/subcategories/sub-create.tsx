import { Create, TopToolbar, TransformData } from 'react-admin'
import { Link, useParams } from 'react-router-dom'
import { SubForm } from './sub-form'
import { formatImagesToServer, formatImageToServer } from '../utils'

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
  const transform: TransformData = async (data) => {
    const photo = await formatImageToServer(data.photo)
    let backgroundPhotos
    if (data.background_photos?.length && data.background_photos.every((photo: { photo?: string }) => photo.photo)) {
      backgroundPhotos = undefined
    } else {
      backgroundPhotos = await Promise.all(formatImagesToServer(data.background_photos))
    }
    return {
      name: data.name,
      description: data.description,
      hash_tags: data.hash_tags,
      is_active: data.is_active,
      photo,
      background_photos: backgroundPhotos,
      category: categoryId,
    }
  }
  return (
    <Create
      title="Новая подкатегория"
      resource="subcategories"
      actions={<SubCreateActions />}
      transform={transform}
      redirect="./.."
    >
      <SubForm />
    </Create>
  )
}
