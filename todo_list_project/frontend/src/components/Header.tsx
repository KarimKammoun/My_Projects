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
                <a href="/" className="hover:underline">Accueil</a>
            </nav>
        </div>






{/*            
            <Dialog>--!>
                <form>
                    <DialogTrigger asChild>
                    <Button >Sign Out</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign Out</DialogTitle>
                        <DialogDescription>
                            are you sure to signe out
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-red-600">Sign Out</Button>
                    </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
*/}
            





    </header>
  );
}