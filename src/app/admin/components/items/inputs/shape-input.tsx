import { required, SelectInput } from 'react-admin'
import { useFormContext, useFormState } from 'react-hook-form'

export const ShapeInput = () => {
  const { setValue } = useFormContext()
  const {} = useFormState()
  return (
    <SelectInput
      source="shape"
      label="Форма"
      defaultValue="square"
      onChange={(e) => {
        setValue('size', e?.target?.value === 'square' ? { width: 200, height: 200 } : { width: 200, height: 230 })
      }}
      validate={required()}
      choices={[
        { id: 'hexagon', name: 'Шестиугольник' },
        { id: 'square', name: 'Квадрат' },
      ]}
    />
  )
}
