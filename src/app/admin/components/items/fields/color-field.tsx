import { FieldProps, useFieldValue } from 'react-admin'

export const ColorField = (props: FieldProps) => {
  const value = useFieldValue(props)
  return value ? <div style={{ width: '20px', height: '20px', background: value, borderRadius: 4 }} /> : null
}
