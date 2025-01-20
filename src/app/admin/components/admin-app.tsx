'use client'
import { Admin, Resource, CustomRoutes, Layout, DataProvider, Menu, AppBar, TitlePortal } from 'react-admin'
import { QueryClient } from '@tanstack/react-query'
import jsonServerProvider from 'ra-data-json-server'
import { CategoriesList } from './categories/categories-list'
import { Link, Route } from 'react-router-dom'
import { SubCategoriesList } from './subcategories/sub-list'
import { SubCategoriesEdit } from './subcategories/sub-edit'
import { SubCategoriesCreate } from './subcategories/sub-create'
import { CategoriesCreate } from './categories/categories-create'
import { CategoriesEdit } from './categories/categories-edit'
import { ItemsList } from './items/items-list'
import { ItemsCreate } from './items/items-create'
import { ItemsEdit } from './items/items-edit'
import CategoryIcon from '@mui/icons-material/Category'
import LanguageIcon from '@mui/icons-material/Language'
import { Box } from '@mui/material'
import FusionLogo from '/public/images/fusion-home-logo.svg'

// TODO: написать свой кастомный провайдер
const customizedProvider = (baseProvider: DataProvider): DataProvider => ({
  ...baseProvider,
  getList: async (resource, params) => {
    const response = await baseProvider.getList(resource, params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedResponse = response.data as unknown as { data: any[]; meta: Record<string, any> }
    return { data: typedResponse.data, total: response.total, meta: typedResponse.meta }
  },
})

const CustomAppBar = () => {
  return (
    <AppBar color="primary">
      <TitlePortal variant="body1" />
      <Box sx={{ paddingX: 1 }}>
        <Link to={window.location.origin ?? ''} relative="path" reloadDocument={true}>
          <FusionLogo height={48} width="130px" />
        </Link>
      </Box>
    </AppBar>
  )
}

const CustomMenu = () => {
  return (
    <Menu>
      <Menu.Item
        to={window.location.origin ?? ''}
        reloadDocument={true}
        relative="path"
        primaryText="Fusion Home"
        leftIcon={<LanguageIcon />}
      />
      <Menu.Item to="/categories" primaryText="Категории" leftIcon={<CategoryIcon />} />
    </Menu>
  )
}

const dataProvider = customizedProvider(jsonServerProvider('http://localhost:3000/api/data'))
const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })
const AdminApp = () => (
  <Admin
    queryClient={queryClient}
    dataProvider={dataProvider}
    layout={({ children }) => (
      <Layout sx={{ marginTop: 0 }} appBar={CustomAppBar} menu={CustomMenu}>
        {children}
      </Layout>
    )}
    // лучше наверное сохранять это в локал стору
    //store={memoryStore()}
  >
    <Resource name="categories" list={CategoriesList} create={CategoriesCreate} edit={CategoriesEdit}>
      <Route path=":categoryId/subs" element={<SubCategoriesList />} />
      <Route path=":categoryId/subs/:subId" element={<SubCategoriesEdit />} />
      <Route path=":categoryId/subs/create" element={<SubCategoriesCreate />} />
      <Route path=":categoryId/subs/:subId/items" element={<ItemsList />} />
      <Route path=":categoryId/subs/:subId/items/create" element={<ItemsCreate />} />
      <Route path=":categoryId/subs/:subId/items/:itemId" element={<ItemsEdit />} />
    </Resource>
    <CustomRoutes>
      <Route path="/settings" element={<div>TEST</div>} />
    </CustomRoutes>
  </Admin>
)

export default AdminApp
