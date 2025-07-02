"use client"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import axios from "axios"

export function SignUpForm() {
  const router = useRouter();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

    try {
      console.log("Attempting to login with:", { email, password , firstName, lastName, confirmPassword });
      if (!email || !password || !firstName || !lastName || !confirmPassword) {

        alert("Please enter both email and password");
        return;
      }
      const res = await axios.post(`${API_BASE_URL}/api/SignUp`, {
        firstName: firstName,
        lastName: lastName,
        email,
        password,

      })
      console.log("Login response:", res.data);
      if (res.data.success) {
        localStorage.setItem("userId", res.data.user.UserId)
        window.location.href = "/home"
      } else {
        alert("Email ou mot de passe incorrect")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Email ou mot de passe incorrect")
    }
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label>First name</Label>
                <Input id="First_name" type="text" placeholder="First_name" 
                onChange={(e) => setFirstName(e.target.value)}
                
                />
              </div>

              <div className="grid gap-3">
                <Label>Last name</Label>
                <Input id="Last_name" type="text" placeholder="Last_name" 
                    onChange={(e) => setLastName(e.target.value)}
                />

              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="@gmail.com" 
                    onChange={(e) => setEmail(e.target.value)}
/>
              </div>

              <div className="grid gap-3">
                <Label>Password</Label>
                <Input id="Password" type="password" placeholder="*********" 
                    onChange={(e) => setPassword(e.target.value)}

                />

              </div>

              <div className="grid gap-3">
                <Label>Confirm Your Password</Label>
                <Input id="Confirm_Password" type="password" placeholder="*********" 
                    onChange={(e) => setConfirmPassword(e.target.value)}

                />
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


