import { required, SelectInput } from 'react-admin'
import { useWatch } from 'react-hook-form'

const HEX_CHOICES = [{ id: '200x230', name: '200x230' }]
const SQUARE_CHOICES = [
  { id: '100x100', name: '100x100' },
  { id: '200x200', name: '200x200' },
  { id: '300x300', name: '300x300' },
]

export const SizeInput = () => {
  const shape = useWatch({ name: 'shape' })
  return (
    <SelectInput
      source="size"
      label="Размер"
      defaultValue={{ width: 200, height: 200 }}
      validate={[required()]}
      format={(value) => {
        if (!value || typeof value === 'string') return value || ''
        return `${value.width}x${value.height}`
      }}
      parse={(value) => {
        if (!value) return {}
        const sizes = value.split('x')
        return { width: Number(sizes?.[0]), height: Number(sizes?.[1]) }
      }}
      choices={shape === 'square' ? SQUARE_CHOICES : HEX_CHOICES}
    />
  )
}
