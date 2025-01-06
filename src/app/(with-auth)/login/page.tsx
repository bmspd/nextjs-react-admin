import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default async function Login() {
  return (
    <div className="min-h-screen min-w-screen size-full relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
        <Input placeholder="username" />
        <Input placeholder="password" />
        <Button>Sign in</Button>
      </div>
    </div>
  )
}
