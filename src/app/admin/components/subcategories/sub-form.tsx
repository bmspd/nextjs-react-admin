import {
  ArrayInput,
  DeleteButton,
  ImageField,
  ImageInput,
  SaveButton,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
  Toolbar,
} from 'react-admin'
import { CheckboxInput } from '../checkbox-input'

export const SubForm = () => {
  return (
    <TabbedForm
      syncWithLocation={false}
      toolbar={
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SaveButton />
          <DeleteButton redirect="./.." />
        </Toolbar>
      }
    >
      <TabbedForm.Tab label="Основные">
        <TextInput source="name" label="Название" />
        <TextInput source="description" label="Описание" />
        <CheckboxInput source="is_active" label="Активный раздел" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Хэштэги">
        <ArrayInput source="hash_tags">
          <SimpleFormIterator inline>
            <TextInput source="" placeholder="Введите хэштэг" />
          </SimpleFormIterator>
        </ArrayInput>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Изображения">
        <ImageInput
          source="photo"
          label="Главное изображение"
          format={(value) => {
            if (typeof value === 'string') {
              return { src: value, title: 'Главное изображение' }
            }
            return value
          }}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput
          defaultValue={[]}
          source="background_photos"
          label="Фоновые изображения"
          multiple
          format={(values: unknown[]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return values.map((value: any, index) => {
              if (value.photo) {
                return { src: value.photo, title: index + 1 }
              }
              return value
            })
          }}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </TabbedForm.Tab>
    </TabbedForm>
  )
}
