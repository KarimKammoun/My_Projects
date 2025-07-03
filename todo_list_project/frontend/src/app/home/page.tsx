"use client";

import Header from "@/components/Header";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useRouter } from "next/navigation";


import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Trash2, Square, CheckSquare, Undo2 } from "lucide-react";
import axios from "axios";

export default function Home() {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeTodos, setActiveTodos] = useState<{ text: string; color: string; taskId: string }[]>([]);
  const [doneTodos, setDoneTodos] = useState<typeof activeTodos>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openDone, setOpenDone] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  var taskindex=0;

  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.replace("/sign-in"); 
    }
  }, [router]);

  
  useEffect(() => {


    const fetchTasks = async () => {
      try {
            const userId = localStorage.getItem("userId");
            console.log("User ID:", userId);
            if (!userId) return;
              const response = await axios.get(`${API_BASE_URL}/api/tasks/${userId}`);

            if (response.data.success === false) {
              console.error("Failed to fetch tasks:", response.data.message);
              setActiveTodos([]);
              setDoneTodos([]);
            } else {
              console.log("Response data:", response.data);
              const data = response.data.data;
                console.log("Fetched tasks:", data);


              const activeTasks = data
                .filter((currentTask: { isdone: boolean }) => currentTask.isdone === false)
                .map((currentTask: { input: string; difficulty: string; _id: string }) => ({
                  text: currentTask.input,
                  color: currentTask.difficulty,
                  taskId: currentTask._id
                }));

              const doneTasks = data
                .filter((currentTask: { isdone: boolean }) => currentTask.isdone === true)
                .map((currentTask: { input: string; difficulty: string; _id: string }) => ({
                  text: currentTask.input,
                  color: currentTask.difficulty,
                  taskId: currentTask._id
                }));

                setActiveTodos(activeTasks);
                setDoneTodos(doneTasks);

              console.log("Active tasks:", activeTasks);
              console.log("Done tasks:", doneTasks);

      }} catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (isAuthenticated) {
      fetchTasks();
    } else {
      setActiveTodos([]);
      setDoneTodos([]);
      window.location.href = "/login";
    }
  }, []);








  useEffect(() => {
    if (openAdd) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [openAdd]);





  const handleAdd = async () => {
    const text = inputRef.current?.value?.trim();
    if (!text) return alert("Veuillez entrer une tâche.");
    if (!selectedColor) return alert("Veuillez choisir une couleur.");

    const userId = localStorage.getItem("userId");
    const response = await axios.post(`${API_BASE_URL}/api/tasks`, {
      input: text,
      difficulty: selectedColor,
      userId,
      isdone: false,
    });

    console.log("Response from server:", response.data);

    const { _id } = response.data.data;

    setActiveTodos((prev) => [...prev, { text: text, color: selectedColor, taskId: _id }]);
    if (inputRef.current) inputRef.current.value = "";
    setSelectedColor("");
    setOpenAdd(false);
  };




  const handleDelete = async (index: number) => {
    const todoToDelete = activeTodos[index];

    try {

      await axios.delete(`${API_BASE_URL}/api/tasks/deleteTask`, {
        data: {
          taskId: todoToDelete.taskId,
        },
      });
      setActiveTodos((prev) => prev.filter((_, i) => i !== index));

    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression de la tâche.");
    }
  };








  const markAsDone = async (index: number) => {


    const todo = activeTodos[index];

    await axios.put(`${API_BASE_URL}/api/tasks/mark-done`, {
      data: {
        taskId: todo.taskId,
      },
    });

    setActiveTodos((prev) => prev.filter((_, i) => i !== index));
    setDoneTodos((prev) => [...prev, todo]);
  };


  const reactivateTask = async (index: number) => {
    const todo = doneTodos[index];

    await axios.put(`${API_BASE_URL}/api/tasks/reactivate`, {
      data: {
        taskId: todo.taskId,
      },
    });

    setDoneTodos((prev) => prev.filter((_, i) => i !== index));
    setActiveTodos((prev) => [...prev, todo]);
  };



  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      red: "bg-red-500",
    };
    return colorMap[color] || "bg-gray-400";
  };




  const handleEdit = async () => {
    if (editIndex === null) return;
    
    const input =editedText;
    const newActiveTodos = [...activeTodos];
    const newTask = newActiveTodos[editIndex];
    console.log(editIndex);

    

    if (!input) return alert("Veuillez entrer une tâche.");
    if (!selectedColor) return alert("Veuillez choisir une couleur.");

    const response = await axios.put(`${API_BASE_URL}/api/tasks/update`, {
      data: {
        taskId: newTask.taskId,
        text: input,
        color: selectedColor,
      },
    });

    console.log("Response from server:", response.data);

    newActiveTodos[editIndex] = { text: input, color: selectedColor, taskId: newActiveTodos[editIndex].taskId };
    setActiveTodos(newActiveTodos);
    console.log("Updated task:", activeTodos);

    setOpenEdit(false);
    setSelectedColor("");
  };








  return (


    <>
      <Header />


      <main className="bg-gray-900 min-h-screen p-8 flex flex-col gap-4">
        <h1 className=" text-white text-5xl font-bold mb-6 flex justify-center">📝 To Do List</h1>


        <div className=" flex justify-center items-center gap-4" >
          <Dialog open={openDone} onOpenChange={setOpenDone}>
            <DialogTrigger asChild>
              <Button className="m-6 w-40 h-10 bg-gray-500">
                Finished tasks ({doneTodos.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Finished tasks</DialogTitle>
                <DialogDescription>
                  
                </DialogDescription>

                {doneTodos.length === 0 ? (
                  "No tasks completed"
                ) : (
                  <ul className="mt-4 space-y-2 max-h-60 overflow-auto pr-2">
                    {doneTodos.map((todo, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 p-2 border rounded"
                      >
                        <span className={`w-1 h-8 ${getColorClass(todo.color)} rounded`} />
                        <CheckSquare className="w-6 h-6 text-green-600" />
                        <span className="flex-1">{todo.text}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => reactivateTask(i)}
                          aria-label="Restaurer"
                        >
                          <Undo2 className="w-5 h-5 text-blue-500" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </DialogHeader>
            </DialogContent>

          </Dialog>


          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="m-6 w-40 h-10 bg-gray-500">Add a task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a task</DialogTitle>
                <DialogDescription className="flex flex-col gap-4 mt-4">
                  <Input placeholder="New task" ref={inputRef} />
                  <Select onValueChange={setSelectedColor} value={selectedColor}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose the color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Colors</SelectLabel>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setOpenAdd(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add</Button>
              </DialogFooter>

            </DialogContent>
   
          </Dialog>



        </div>






        <ul className=" flex flex-col items-center gap-3">
          {activeTodos.map((todo, index) => (

            <li
              key={index}
              className=" flex items-center justify-between p-3 bg-gray-300 rounded shadow w-full h-18 max-w-xl"
            >
              <div className=" flex items-center gap-3">
                <div className={`w-1 h-10 rounded ${getColorClass(todo.color)}`} />
                <button onClick={() => markAsDone(index)} aria-label="Marquer terminé">
                  <Square className="w-6 h-6 text-gray-400" />
                </button>
                <span className="select-none">{todo.text}</span>
              </div>


              <div className="flex items-center gap-0.5">

                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                  <DialogTrigger asChild>
                    <Button   className="m-6 w-10 h-7 bg-gray-500"
                        onClick={() => {
                          setEditIndex(index); 
                          setSelectedColor(todo.color); 
                          setEditedText(todo.text);
                        }}>
                      
                
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                      <DialogDescription>
                  
                      </DialogDescription>
                      <div className="flex flex-col gap-4 mt-4">
                        <Input placeholder="New task" onChange={(e) => setEditedText(e.target.value)}/>
                        
                        <Select onValueChange={setSelectedColor} value={selectedColor}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choisir la couleur" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Colors</SelectLabel>
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="blue">Blue</SelectItem>
                              <SelectItem value="red">Red</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="secondary" onClick={() => setOpenEdit(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => handleEdit()}>Edit</Button>
                        </div>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>


                <button
                  onClick={() => handleDelete(index)}
                  aria-label="Supprimer tâche"
                >
                  <Trash2 className="w-5 h-5 text-black" />
                </button>

              </div>


            </li>
          ))}
        </ul>


      </main>

    </>

  );
}
