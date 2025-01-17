import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge'
import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash'
import { useEffect } from 'react'
import { DatagridBody, DatagridBodyProps } from 'react-admin'
import { flushSync } from 'react-dom'
import { DraggableDatagridRow } from './draggable-row'
import { useReorderingContext } from '../reordering-context/reordering-context'

export const DraggableDatagridBody = (props: DatagridBodyProps) => {
  const { orderingData, setOrderingData } = useReorderingContext()
  useEffect(() => {
    return monitorForElements({
      canMonitor: ({}) => {
        return true
      },
      onDrop: ({ location, source }) => {
        const target = location.current.dropTargets[0]
        if (!target) return

        const sourceData = source.data
        const targetData = target.data

        if (!sourceData || !targetData) {
          return
        }

        const indexOfSource = orderingData.findIndex((odata) => odata?.id === sourceData.id)
        const indexOfTarget = orderingData.findIndex((odata) => odata?.id === targetData.id)

        if (indexOfTarget < 0 || indexOfSource < 0) {
          return
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData)

        flushSync(() => {
          setOrderingData(
            reorderWithEdge({
              list: orderingData,
              startIndex: indexOfSource,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: 'vertical',
            })
          )
        })

        const element = document.querySelector(`[data-task-id="${sourceData.taskId}"]`)
        if (element instanceof HTMLElement) {
          triggerPostMoveFlash(element)
        }
      },
    })
  }, [orderingData])
  return <DatagridBody {...props} data={orderingData} row={<DraggableDatagridRow />} />
}
