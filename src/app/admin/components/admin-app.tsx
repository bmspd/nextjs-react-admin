'use client'
import { Admin, Resource, CustomRoutes, Layout, DataProvider } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import { CategoriesList } from './categories-list'
import { Route } from 'react-router-dom'
import { SubCategoriesList } from './subcategories/sub-list'
import { SubCategoriesEdit } from './subcategories/sub-edit'
import { SubCategoriesCreate } from './subcategories/sub-create'

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

//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com')
const dataProvider = customizedProvider(jsonServerProvider('http://localhost:3000/api/data'))

const AdminApp = () => (
  <Admin dataProvider={dataProvider} layout={({ children }) => <Layout sx={{ marginTop: 0 }}>{children}</Layout>}>
    <Resource name="categories" list={CategoriesList} create={<div>I AM CREATE</div>} edit={<div>I AM EDIT</div>}>
      <Route path=":categoryId/subs" element={<SubCategoriesList />} />
      <Route path=":categoryId/subs/:subId" element={<SubCategoriesEdit />} />
      <Route path=":categoryId/subs/create" element={<SubCategoriesCreate />} />
    </Resource>
    <CustomRoutes>
      <Route path="/settings" element={<div>TEST</div>} />
    </CustomRoutes>
    {/* <Resource name="posts" list={ListGuesser} edit={EditGuesser} recordRepresentation="title" />
    <Resource name="comments" list={ListGuesser} edit={EditGuesser} /> */}
  </Admin>
)

export default AdminApp
