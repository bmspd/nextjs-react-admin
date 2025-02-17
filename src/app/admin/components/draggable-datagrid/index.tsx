import { Datagrid, DatagridHeader, DatagridProps } from 'react-admin'
import { DraggableDatagridBody } from './draggable-body'

export const DraggableDatagrid = (props: DatagridProps) => (
  <Datagrid {...props} body={<DraggableDatagridBody />} header={<DatagridHeader />} />
)
