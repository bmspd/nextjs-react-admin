import { cookies } from 'next/headers'
import { LoginForm } from './login-form'

export default async function Login() {
  const previousPath = (await cookies()).get('x-previous-path')
  return (
    <div className="size-full">
      <LoginForm prevPath={previousPath?.value} />
    </div>
  )
}
