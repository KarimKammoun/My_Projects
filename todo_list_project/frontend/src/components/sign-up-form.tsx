import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function LoginForm(){
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Creat your account</CardTitle>
          <CardDescription>
            Enter your identitis below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label>First name</Label>
                <Input
                  id="First_name"
                  type="text"
                  placeholder="***"
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <Label>Last name</Label>
                <Input
                  id="Last_name"
                  type="text"
                  placeholder="***"
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label >Password</Label>
                <Input
                  id="Password"
                  type="password"
                  placeholder="*********"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label >Confirm Your Password</Label>
                <Input
                  id="Confirm_Password"
                  type="password"
                  placeholder="*********"
                  required
                />
              </div>



              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <Button variant="outline" className="w-full">
                  Sign Up with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
