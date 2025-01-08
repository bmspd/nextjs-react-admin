import { Breadcrumbs, Typography } from '@mui/material'
import { useListContext } from 'react-admin'
import { Link } from 'react-router-dom'

export const SubCategoriesBreadCrumbs = () => {
  const { meta } = useListContext()
  return (
    <Breadcrumbs>
      <Link to="/categories" className="text-blue-500">
        Категории
      </Link>
      <Typography>{meta?.categoryName}</Typography>
    </Breadcrumbs>
  )
}
