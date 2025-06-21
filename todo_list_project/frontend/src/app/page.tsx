"use client";

import Header from "@/components/Header";
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
} from "@/components/ui/dialog";
import { Trash2, Square, CheckSquare, Undo2 } from "lucide-react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeTodos, setActiveTodos] = useState<{ text: string; color: string }[]>([]);
  const [doneTodos, setDoneTodos] = useState<typeof activeTodos>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openDone, setOpenDone] = useState(false);

  useEffect(() => {
    if (openAdd) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [openAdd]);

  const handleAdd = () => {
    const text = inputRef.current?.value?.trim();
    if (!text) return alert("Veuillez entrer une tâche.");
    if (!selectedColor) return alert("Veuillez choisir une couleur.");

    setActiveTodos((prev) => [...prev, { text, color: selectedColor }]);
    if (inputRef.current) inputRef.current.value = "";
    setSelectedColor("");
    setOpenAdd(false);
  };

  const handleDelete = (index: number) => {
    setActiveTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const markAsDone = (index: number) => {
    const todo = activeTodos[index];
    setActiveTodos((prev) => prev.filter((_, i) => i !== index));
    setDoneTodos((prev) => [...prev, todo]);
  };

  const restoreTask = (index: number) => {
    const todo = doneTodos[index];
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

  return (
    <div>
      <Header />

      <main className="bg-gray-900 min-h-screen p-8 flex flex-col gap-4">
        <h1 className=" text-white text-5xl font-bold mb-6 flex justify-center">📝 To Do List</h1>


        <div className=" flex justify-center items-center gap-4" >
          <Dialog open={openDone} onOpenChange={setOpenDone}>
            <DialogTrigger asChild>
              <Button className="m-6 w-40 h-10 bg-gray-500">
                Tâches terminées ({doneTodos.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tâches terminées</DialogTitle>
                <DialogDescription>
                  {doneTodos.length === 0 ? (
                    <p>Aucune tâche terminée.</p>
                  ) : (
                    <ul className=" mt-4 space-y-2 max-h-60 overflow-auto pr-2">
                      {doneTodos.map((todo, i) => (
                        <li
                          key={i}
                          className=" flex items-center gap-3 p-2 border rounded"
                        >
                          <div className={`w-1 h-8 ${getColorClass(todo.color)} rounded`} />
                          <CheckSquare className="w-6 h-6 text-green-600" />
                          <span className="flex-1">{todo.text}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => restoreTask(i)}
                            aria-label="Restaurer"
                          >
                            <Undo2 className="w-5 h-5 text-blue-500" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>


          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="m-6 w-40 h-10 bg-gray-500">Ajouter une tâche</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une tâche</DialogTitle>
                <DialogDescription className="flex flex-col gap-4 mt-4">
                  <Input placeholder="Nouvelle tâche" ref={inputRef} />
                  <Select onValueChange={setSelectedColor} value={selectedColor}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choisir la couleur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Couleurs</SelectLabel>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setOpenAdd(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAdd}>Ajouter</Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>



        </div>






        <ul className=" flex flex-col items-center gap-3">
          {activeTodos.map((todo, index) => (

            <li
              key={index}
              className=" flex items-center justify-between p-3 bg-gray-300 rounded shadow w-full max-w-xl"
            >
              <div className=" flex items-center gap-3">
                <div className={`w-1 h-10 rounded ${getColorClass(todo.color)}`} />
                <button onClick={() => markAsDone(index)} aria-label="Marquer terminé">
                  <Square className="w-6 h-6 text-gray-400" />
                </button>
                <span className="select-none">{todo.text}</span>
              </div>

              <button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(index)}
                aria-label="Supprimer tâche"
              >
                <Trash2 className="w-5 h-5 text-black" />
              </button>
            </li>
          ))}
        </ul>


      </main>

    </div>

  );
}
