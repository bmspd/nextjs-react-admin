export const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export const convertUrlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Не удалось загрузить изображение: ${response.statusText}`)
  }
  const blob = await response.blob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export const formatImageToServer = async (file: { rawFile: File; src: string; title: string } | string | null) => {
  if (!file) return null
  if (typeof file === 'string') return undefined
  return convertToBase64(file.rawFile)
}

export const formatImagesToServer = (files: { rawFile: File; src: string; title: string; photo: string }[]) => {
  return files.map((file) => {
    if (!file.rawFile) return convertUrlToBase64(file.src ?? file.photo)
    return convertToBase64(file.rawFile)
  })
}
