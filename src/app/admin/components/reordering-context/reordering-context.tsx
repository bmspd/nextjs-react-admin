import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useListContext } from 'react-admin'

export type ReorderingContextValue = {
  isReordering: boolean
  setIsReordering: Dispatch<SetStateAction<boolean>>
  orderingData: { id: number }[]
  setOrderingData: Dispatch<SetStateAction<{ id: number }[]>>
}

export const ReorderingContext = createContext<ReorderingContextValue>({
  isReordering: false,
  setIsReordering: () => {},
  orderingData: [],
  setOrderingData: () => {},
})

export const ReorderingProvider = ({
  children,
  initialValues,
}: {
  children: ReactNode
  initialValues?: Pick<Partial<ReorderingContextValue>, 'isReordering' | 'orderingData'>
}) => {
  const { data } = useListContext()
  const [isReordering, setIsReordering] = useState<boolean>(initialValues?.isReordering ?? false)
  const [orderingData, setOrderingData] = useState<{ id: number }[]>(initialValues?.orderingData ?? [])
  useEffect(() => {
    if (data !== undefined) {
      setOrderingData(data)
    }
  }, [data])
  return (
    <ReorderingContext.Provider value={{ isReordering, orderingData, setIsReordering, setOrderingData }}>
      {children}
    </ReorderingContext.Provider>
  )
}

export const useReorderingContext = () => useContext(ReorderingContext)
