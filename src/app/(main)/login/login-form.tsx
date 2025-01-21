'use client'

import { revalidateData } from '@/components/revalidate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const LoginForm = ({ prevPath }: { prevPath?: string }) => {
  const router = useRouter()
  const [values, setValues] = useState<{ username: string; password: string }>({ username: '', password: '' })
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
      <Input
        value={values.username}
        onChange={(e) => setValues((prev) => ({ ...prev, username: e.target.value }))}
        placeholder="username"
      />
      <Input
        value={values.password}
        onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
        placeholder="password"
        type="password"
      />
      <Button
        onClick={() => {
          signIn('credentials', { ...values, redirect: false }).then(async () => {
            //TODO: это надо на что-то приличное переделать
            await revalidateData('/')
            await revalidateData('/login')
            router.push(prevPath || '/')
          })
        }}
      >
        Sign in
      </Button>
    </div>
  )
}
