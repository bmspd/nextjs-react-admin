import { Edit, TopToolbar, TransformData } from 'react-admin'
import { Link, useParams } from 'react-router-dom'
import { ItemsForm } from './items-form'
import { formatImageToServer } from '../utils'

const ItemsEditActions = () => {
  return (
    <TopToolbar>
      <div className="w-full">
        <Link className="text-blue-500" to="./..">
          Назад к товарам
        </Link>
      </div>
    </TopToolbar>
  )
}

export const ItemsEdit = () => {
  const { itemId } = useParams<{ itemId: string }>()
  const transform: TransformData = async (data) => {
    const preparedPhoto = data?.photos?.[0]?.photo ?? data?.photos?.[0]
    const photo = await formatImageToServer(preparedPhoto)
    if (photo === undefined) data.photos = undefined
    else if (photo === null) data.photos = []
    else data.photos = [{ photo }]
    return {
      name: data.name,
      description: data.description,
      price: data.price,
      color: data.color,
      shape: data.shape,
      size: data.size,
      data: data.hash_tags,
      photos: data.photos,
      technical_specs: data.technical_specs,
    }
  }
  return (
    <Edit
      resource="items"
      redirect="./.."
      id={itemId}
      title="Изменить товар"
      actions={<ItemsEditActions />}
      mutationMode="pessimistic"
      transform={transform}
    >
      <ItemsForm />
    </Edit>
  )
}
