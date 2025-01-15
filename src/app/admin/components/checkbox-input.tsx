import { Checkbox, FormControlLabel } from '@mui/material'
import { BooleanInputProps, useInput } from 'react-admin'

export const CheckboxInput = (props: BooleanInputProps) => {
  const { field } = useInput(props)

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={!!field.value} // Приведение значения к Boolean
          onChange={(event) => field.onChange(event.target.checked)}
        />
      }
      label={props.label}
    />
  )
}
