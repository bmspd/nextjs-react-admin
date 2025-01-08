import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge'
import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash'
import { useEffect, useState } from 'react'
import { DatagridBody, DatagridBodyProps, useListContext } from 'react-admin'
import { flushSync } from 'react-dom'
import { DraggableDatagridRow } from './draggable-row'

export const DraggableDatagridBody = (props: DatagridBodyProps) => {
  const { data } = useListContext()
  const [localData, setLocalData] = useState<Record<string, unknown>[]>(data ?? [])
  useEffect(() => {
    setLocalData(data ?? [])
  }, [data])
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

        const indexOfSource = localData.findIndex((ldata) => ldata?.id === sourceData.id)
        const indexOfTarget = localData.findIndex((ldata) => ldata?.id === targetData.id)

        if (indexOfTarget < 0 || indexOfSource < 0) {
          return
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData)

        flushSync(() => {
          setLocalData(
            reorderWithEdge({
              list: localData,
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
  }, [localData])
  return <DatagridBody {...props} data={localData} row={<DraggableDatagridRow />} />
}
