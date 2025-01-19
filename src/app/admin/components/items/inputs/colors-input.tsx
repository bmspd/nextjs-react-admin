import { ITEM_COLORS } from '@/app/data/colors'
import { SelectInput } from 'react-admin'

export const ColorsInput = ({ source }: { source: string }) => {
  return (
    <SelectInput
      SelectProps={{
        MenuProps: {
          MenuListProps: { sx: { display: 'grid', gridTemplateColumns: { md: '1fr 1fr 1fr', sm: '1fr 1fr', xs: '1fr' } } },
        },
      }}
      source={source}
      label="Цвет"
      emptyText="Без цвета"
      choices={ITEM_COLORS}
      optionValue="value"
      optionText={(choice) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ background: choice.value, width: '20px', height: '20px', borderRadius: '4px' }}></div>
          {choice.label}
        </div>
      )}
    />
  )
}
