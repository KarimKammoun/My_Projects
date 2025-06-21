import { LoginForm } from "@/components/sign-up-form"
import Header from "@/components/Header";

export default function Page() {
  return (
    <div>
    <Header />
    
    <div className="bg-black flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className=" w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    </div>
  )
}