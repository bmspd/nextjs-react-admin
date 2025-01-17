import { Button, useListContext, useNotify } from 'react-admin'
import { useReorderingContext } from './reordering-context'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

export const ReorderingControls = ({ onSave }: { onSave?: (orderingData: { id: number }[]) => Promise<unknown> }) => {
  const { orderingData, setOrderingData, isReordering, setIsReordering } = useReorderingContext()
  const { data, refetch } = useListContext()
  const notify = useNotify()
  if (!isReordering)
    return (
      <Button
        label="Изменить порядок"
        startIcon={<DragIndicatorIcon />}
        onClick={() => {
          setIsReordering(true)
        }}
      />
    )
  return (
    <>
      <Button
        label="Сохранить"
        onClick={() => {
          onSave?.(orderingData).then(async () => {
            await refetch()
            notify('Порядок успешно изменен', { type: 'success' })
          })
          setIsReordering(false)
        }}
      />
      <Button
        label="Отменить"
        onClick={() => {
          setIsReordering(false)
          setOrderingData(data ?? [])
        }}
      />
    </>
  )
}
