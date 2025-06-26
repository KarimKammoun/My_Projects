"use client"

import React, { useRef } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
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

export function SignUpForm() {


    const fName = firstName.current?.value.trim()
    const lName = lastName.current?.value.trim()
    const userEmail = email.current?.value.trim()
    const userPassword = password.current?.value
    const confirmPass = confirmPassword.current?.value

    if (!fName || !lName || !userEmail || !userPassword || !confirmPass) {
      alert("Please fill in all fields")
      return
    }

    if (userPassword !== confirmPass) {
      alert("Passwords do not match")
      return
    }

    try {
      const res = await axios.post("http://localhost:5000/api/SignUp", {
        firstName: fName,
        lastName: lName,
        email: userEmail,
        password: userPassword,
      })

      const data = res.data

      if (data.success) {
        localStorage.setItem("userId", data.user.UserId)
        router.push("/home")
      } else {
        alert(data.message || "An error occurred during sign up")
      }
    } catch (error) {
      console.error("Sign Up error:", error)
      alert("An error occurred during sign up")
    }
  

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your information below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label>First name</Label>
                <Input id="First_name" type="text" placeholder="John" ref={firstName} />
              </div>

              <div className="grid gap-3">
                <Label>Last name</Label>
                <Input id="Last_name" type="text" placeholder="Doe" ref={lastName} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" ref={email} />
              </div>

              <div className="grid gap-3">
                <Label>Password</Label>
                <Input id="Password" type="password" placeholder="*********" ref={password} />
              </div>

              <div className="grid gap-3">
                <Label>Confirm Your Password</Label>
                <Input id="Confirm_Password" type="password" placeholder="*********" ref={confirmPassword} />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  Sign Up with Google
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
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

export default SignUpForm
