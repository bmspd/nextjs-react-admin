import {
  ArrayInput,
  DeleteButton,
  ImageField,
  ImageInput,
  maxValue,
  minValue,
  NumberInput,
  SaveButton,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
  Toolbar,
} from 'react-admin'
import { CheckboxInput } from '../checkbox-input'

export const CategoriesForm = () => {
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
        <NumberInput
          source="column_number"
          label="Номер колонки в меню"
          validate={[minValue(1, 'Минимальный номер 1'), maxValue(3, 'Максимальный номер 3')]}
        />
        <CheckboxInput source="is_tile" label="Специальный футер для плитки" />
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
      </TabbedForm.Tab>
    </TabbedForm>
  )
}
