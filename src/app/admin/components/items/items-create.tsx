import { Create, TopToolbar, TransformData } from 'react-admin'
import { Link, useParams } from 'react-router-dom'
import { ItemsForm } from './items-form'
import { formatImageToServer } from '../utils'

const ItemsCreateActions = () => {
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

export const ItemsCreate = () => {
  const { subId } = useParams<{ subId: string }>()
  const transform: TransformData = async (data) => {
    const preparedPhoto = data?.photos?.[0]?.photo ?? data?.photos?.[0]
    const photo = await formatImageToServer(preparedPhoto)
    if (photo === undefined) data.photos = undefined
    else if (photo === null) data.photos = []
    else data.photos = [{ photo }]
    return {
      subcategory: subId,
      name: data.name,
      description: data.description,
      price: data.price,
      color: data.color,
      shape: data.shape,
      size: data.size,
      hash_tags: data.hash_tags,
      photos: data.photos,
      technical_specs: data.technical_specs,
    }
  }
  return (
    <Create title="Новый товар" resource="items" actions={<ItemsCreateActions />} redirect="./.." transform={transform}>
      <ItemsForm />
    </Create>
  )
}
