import { Children, isValidElement, useEffect, useRef, useState } from 'react'
import { DatagridCell, DatagridRowProps, FieldProps, useRecordContext, useResourceContext } from 'react-admin'
import invariant from 'tiny-invariant'
import { RowState } from './@types'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box'
import { Checkbox, TableCell, TableRow } from '@mui/material'
import { createPortal } from 'react-dom'
import { useReorderingContext } from '../reordering-context/reordering-context'
import clsx from 'clsx'

export const DraggableDatagridRow = ({ onToggleItem, children, selected, selectable, hasBulkActions }: DatagridRowProps) => {
  const record = useRecordContext()
  const resource = useResourceContext()
  const ref = useRef<HTMLTableRowElement>(null)
  const [state, setState] = useState<RowState>({ type: 'idle' })
  const { isReordering } = useReorderingContext()
  useEffect(() => {
    const element = ref.current
    invariant(element)

    return combine(
      draggable({
        element,
        getInitialData() {
          return { id: record!.id }
        },
        canDrag() {
          return isReordering
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({ x: '16px', y: '8px' }),
            render: ({ container }) => {
              setState({ type: 'preview', container })
            },
          })
        },
        onDragStart: () => {
          setState({ type: 'is-dragging' })
        },
        onDrop: () => {
          setState({ type: 'idle' })
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          if (source.element === element) {
            return false
          }
          return true
        },
        getData({ input }) {
          const data = { id: record!.id }
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          })
        },
        getIsSticky() {
          return true
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data)
          setState({ type: 'is-dragging-over', closestEdge })
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data)

          // что-то от ререндеров
          setState((current) => {
            if (current.type === 'is-dragging-over' && current.closestEdge === closestEdge) {
              return current
            }
            return { type: 'is-dragging-over', closestEdge }
          })
        },
        onDragLeave() {
          setState({ type: 'idle' })
        },
        onDrop() {
          setState({ type: 'idle' })
        },
      })
    )
  }, [record, isReordering])
  return record ? (
    <>
      <TableRow ref={ref} sx={{ cursor: 'pointer', position: 'relative', zIndex: 2 }} data-id={record?.id}>
        {hasBulkActions && (
          <TableCell padding="none">
            <Checkbox
              sx={{ paddingRight: 1, paddingLeft: 2 }}
              checked={selected}
              onClick={(event) => {
                if (onToggleItem) {
                  onToggleItem(record.id, event)
                }
              }}
              disabled={!selectable}
            />
          </TableCell>
        )}
        {Children.map(children, (field, index) =>
          isValidElement<FieldProps>(field) ? (
            // это я просто взял с гитхаба react-admin https://github.com/marmelab/react-admin/blob/874ebac1ee5f82430925288b71649011409cf9cf/packages/ra-ui-materialui/src/list/datagrid/DatagridRow.tsx#L215
            <DatagridCell
              key={`${record.id}-${field.props.source || index}`}
              className={clsx(`column-${field.props.source}`, 'RaDatagrid-rowCell')}
              record={record}
              {...{ field, resource }}
            />
          ) : null
        )}
        {state.type === 'is-dragging-over' && state.closestEdge ? (
          <td>
            <DropIndicator edge={state.closestEdge} />
          </td>
        ) : null}
        {state.type === 'preview' && createPortal(<div className="bg-white">{record?.name}</div>, state.container)}
      </TableRow>
    </>
  ) : null
}
