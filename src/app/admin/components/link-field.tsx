/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecordContext, WrapperField } from 'react-admin'
import { Link } from 'react-router-dom'
export const LinkField = ({
  label,
  href,
  element,
}: {
  label?: string
  href: (record: Record<string, any>) => string
  element: (record: Record<string, any>) => React.ReactNode
}) => {
  const record = useRecordContext()
  return (
    <WrapperField label={label}>
      <Link to={href(record ?? {})} className="text-blue-500">
        {element(record ?? {})}
      </Link>
    </WrapperField>
  )
}
