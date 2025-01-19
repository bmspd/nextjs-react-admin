import {
  ArrayInput,
  DeleteButton,
  ImageField,
  ImageInput,
  NumberInput,
  required,
  SaveButton,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
  Toolbar,
} from 'react-admin'
import { ColorsInput } from './inputs/colors-input'
import { SizeInput } from './inputs/size-input'
import { ShapeInput } from './inputs/shape-input'
import { ItemSpecs } from './item-specs'

export const ItemsForm = () => {
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
        <TextInput source="name" label="Название" validate={[required()]} />
        <TextInput source="description" label="Описание" multiline />
        <NumberInput source="price" label="Цена" validate={[required()]} />
        <ColorsInput source="color" />
        <ShapeInput />
        <SizeInput />
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
          source="photos[0]"
          multiple={false}
          label="Главное изображение"
          format={(value: { photo?: string }) => {
            if (value?.photo) {
              return { src: value.photo, title: 'Главное изображение' }
            }
            return value
          }}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Тех.информация">
        <ItemSpecs />
      </TabbedForm.Tab>
    </TabbedForm>
  )
}
