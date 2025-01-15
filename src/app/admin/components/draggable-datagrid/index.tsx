import { Datagrid, DatagridProps } from 'react-admin'
import { DraggableDatagridBody } from './draggable-body'

export const DraggableDatagrid = ({ isReordering, ...props }: DatagridProps & { isReordering: boolean }) => (
  <Datagrid {...props} body={<DraggableDatagridBody isReordering={isReordering} />} />
)
