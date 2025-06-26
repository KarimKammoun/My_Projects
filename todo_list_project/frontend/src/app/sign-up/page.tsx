import {SignUpForm} from "@/components/sign-up-form"
import Header from "@/components/Header";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col">
      <Header />
      
      <div className=" flex-1 bg-gray-900 flex w-full items-center justify-center p-6 md:p-10">
        <div className=" w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}