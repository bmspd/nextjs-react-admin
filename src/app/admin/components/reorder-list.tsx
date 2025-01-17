import { ListBase, ListProps, ListToolbar, ListToolbarProps, Pagination, Title, TitleProps, TopToolbar } from 'react-admin'
import { ReorderingProvider } from './reordering-context/reordering-context'
import { Card } from '@mui/material'

export type ReorderListProps = {
  resource: string
  title?: TitleProps['title']
  filters?: ListToolbarProps['filters']
  actions?: ListToolbarProps['actions']
  pagination?: ListProps['pagination']
  children: React.ReactNode
}

const ReorderPagination = ({ pagination }: { pagination?: ListProps['pagination'] }) => {
  if (pagination === false) return null
  if (pagination === undefined) return <Pagination />
  return pagination
}

export const ReorderList = ({ resource, title, filters, actions, children, pagination }: ReorderListProps) => {
  return (
    <ListBase resource={resource}>
      <ReorderingProvider>
        <Title title={title} />
        <ListToolbar filters={filters ?? <TopToolbar />} actions={actions} />
        <Card>{children}</Card>
        <ReorderPagination pagination={pagination} />
      </ReorderingProvider>
    </ListBase>
  )
}
