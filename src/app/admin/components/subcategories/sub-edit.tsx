import { Edit, TopToolbar, TransformData } from 'react-admin'
import { Link, useParams } from 'react-router-dom'
import { formatImagesToServer, formatImageToServer } from '../utils'
import { SubForm } from './sub-form'

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
  const transform: TransformData = async (data) => {
    const photo = await formatImageToServer(data.photo)
    let backgroundPhotos
    // если ни одна из фотографий не поменялась и ничего не добавилось
    if (data.background_photos?.length && data.background_photos.every((photo: { photo?: string }) => photo.photo)) {
      backgroundPhotos = undefined
    } else {
      backgroundPhotos = await Promise.all(formatImagesToServer(data.background_photos))
    }
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      hash_tags: data.hash_tags,
      is_active: data.is_active,
      photo,
      background_photos: backgroundPhotos,
    }
  }
  return (
    <Edit
      resource="subcategories"
      redirect="./.."
      id={subId}
      title="Изменить подкатегорию"
      actions={<SubEditActions />}
      mutationMode="pessimistic"
      transform={transform}
    >
      <SubForm />
    </Edit>
  )
}
