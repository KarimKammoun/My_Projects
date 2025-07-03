<<<<<<< HEAD
import { Button } from "@/components/ui/button"
import Link from "next/link"



export default function Header() {
  return (
    <header className=" w-full flex flex-row justify-between items-center bg-gray-950 text-white pl-10 pr-4 py-6  shadow-md">

        <h1 className=" text-2xl font-bold">📝 To Do List App</h1>

        <div className=" flex justify-between items-center max-w-6xl  gap-4">
        
            <Link href="/sign-up">
                <Button>Sign Up</Button>
            </Link>

            <Link href="/sign-in">
                <Button>Sign In</Button>
            </Link>
            
            <nav className="space-x-4">
                <a href="/home" className="hover:underline">Accueil</a>
            </nav>
        </div>


    </header>
  );
}
=======
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";       
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";

export default function Header() {
    const router = useRouter();


    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
        console.log("Stored User ID:", storedUserId);
        console.log("Current User ID State:", userId);
    }, []);

    const signOut = async () => {
        try {
            localStorage.removeItem("userId");
            setUserId(null);

            router.push("/sign-in");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };



    const deleteAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/deleteAcount`, {
                data: {
                    "data" : { userId : userId }
                },
            });
            localStorage.removeItem("userId");
            setUserId(null);

            console.log("response :",response);
            router.push("/sign-in");

        }
        catch (error) {
            console.error("Delete account error:", error);
        }
    }


    return (
        <div>
        <header className="w-full flex flex-row justify-between items-center bg-gray-950 text-white pl-10 pr-4 py-6 shadow-md">
        {userId && (
            <Link href="/home">
                    <h1 className="text-2xl font-bold">📝 To Do List App</h1>  
            </Link>
        )}
        
        {!userId && (
            <h1 className="text-2xl font-bold">📝 To Do List App</h1>  
        )}


        <div className="flex justify-between items-center max-w-6xl gap-4">
            <Link href="/sign-up">
            <Button>Sign Up</Button>
            </Link>

            <Link href="/sign-in">
            <Button>Sign In</Button>
            </Link>

            {userId && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button>Sign Out</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                        <AlertDialogDescription>
                        You will need to sign in again to access your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button onClick={signOut}>Sign Out</Button>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            
            {userId && (
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. It will permanently delete your account and all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button  onClick={deleteAccount}  >delete</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
        </header>
        </div>
    );
    
}
>>>>>>> master
