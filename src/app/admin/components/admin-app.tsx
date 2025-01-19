'use client'
import { Admin, Resource, CustomRoutes, Layout, DataProvider } from 'react-admin'
import { QueryClient } from '@tanstack/react-query'
import jsonServerProvider from 'ra-data-json-server'
import { CategoriesList } from './categories/categories-list'
import { Route } from 'react-router-dom'
import { SubCategoriesList } from './subcategories/sub-list'
import { SubCategoriesEdit } from './subcategories/sub-edit'
import { SubCategoriesCreate } from './subcategories/sub-create'
import { CategoriesCreate } from './categories/categories-create'
import { CategoriesEdit } from './categories/categories-edit'
import { ItemsList } from './items/items-list'
import { ItemsCreate } from './items/items-create'
import { ItemsEdit } from './items/items-edit'

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

const dataProvider = customizedProvider(jsonServerProvider('http://localhost:3000/api/data'))
const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })
const AdminApp = () => (
  <Admin
    queryClient={queryClient}
    dataProvider={dataProvider}
    layout={({ children }) => <Layout sx={{ marginTop: 0 }}>{children}</Layout>}
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
