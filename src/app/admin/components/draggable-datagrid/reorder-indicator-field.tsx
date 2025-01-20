import { IconButton } from '@mui/material'
import { useReorderingContext } from '../reordering-context/reordering-context'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { FieldProps } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ReorderIndicatorField = (props: FieldProps) => {
  const { isReordering } = useReorderingContext()
  return isReordering ? (
    <IconButton>
      <DragIndicatorIcon />
    </IconButton>
  ) : null
}
