import { CSSProperties, ReactNode, useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ArrayInput, ButtonProps, Labeled, SimpleFormIterator, TextInput } from 'react-admin'
import { Button, Stack } from '@mui/material'
import { ColorsInput } from './inputs/colors-input'
import { useFormContext } from 'react-hook-form'
import { TECHNICAL_SPECS } from '@/app/data/technical_specs'

export const ItemSpecs = () => {
  const { setValue, reset } = useFormContext()
  return (
    <Stack sx={{ width: '100%' }}>
      <Stack direction="row">
        <Button
          onClick={() => {
            setValue('technical_specs.grout', TECHNICAL_SPECS.grout, { shouldDirty: true, shouldTouch: true })
            setValue('technical_specs.main_data', TECHNICAL_SPECS.main_data, { shouldDirty: true, shouldTouch: true })
          }}
        >
          Заполнить тестовыми данными
        </Button>
        <Button
          onClick={() => {
            reset({ technical_specs: { grout: { color: null, desription: '' }, main_data: [] } })
          }}
        >
          Сбросить все
        </Button>
      </Stack>
      <Labeled label="Рекомендуемая затирка">
        <Stack direction="row" gap={2}>
          <ColorsInput source="technical_specs.grout.color" />
          <TextInput source="technical_specs.grout.description" label="Описание" />
        </Stack>
      </Labeled>
      <ArrayInput source="technical_specs.main_data" label="Разделы">
        <SimpleFormIterator getItemLabel={(index) => `Раздел ${index + 1}`}>
          <TextInput source="title" label="Имя раздела" helperText={false} />
          <ArrayInput source="info" label="Информация раздела" helperText={false}>
            <HideableElement>
              <SimpleFormIterator getItemLabel={(index) => `#${index + 1}`}>
                <HideableElement wrapperStyles={{ textAlign: 'right' }} initialState={true}>
                  <TextInput source="name" label="Заголовок описания" helperText={false} />
                  <TextInput source="description" label="Описание" multiline helperText={false} />
                  <TextInput source="extra" label="Информация под сноской" multiline helperText={false} />
                </HideableElement>
              </SimpleFormIterator>
            </HideableElement>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
    </Stack>
  )
}

export const HideableElement = ({
  children,
  buttonProps,
  wrapperStyles,
  initialState,
}: {
  children: ReactNode
  buttonProps?: ButtonProps['sx']
  wrapperStyles?: CSSProperties
  initialState?: boolean
}) => {
  const [show, setShow] = useState<boolean>(initialState ?? true)
  return (
    <>
      <div style={{ ...wrapperStyles }}>
        <Button
          startIcon={show ? <VisibilityOffIcon /> : <VisibilityIcon />}
          sx={{ width: '120px', ...buttonProps }}
          onClick={() => setShow(!show)}
        >
          {show ? 'Скрыть' : 'Показать'}
        </Button>
      </div>

      {show && children}
    </>
  )
}
