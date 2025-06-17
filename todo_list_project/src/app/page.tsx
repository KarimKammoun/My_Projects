"use client";

import { useRef, useState } from "react";
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

import { Trash2, Square, CheckSquare, Undo2 } from "lucide-react"; // Undo2 = icône pour restaurer

export default function Home() {
  const input = useRef();
  const [activeTodos, setActiveTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openDone, setOpenDone] = useState(false);

  const handleAdd = () => {
    const text = input.current?.value;
    if (!text || !selectedColor) return;
    setActiveTodos((prev) => [
      ...prev,
      { text, color: selectedColor },
    ]);
    input.current.value = "";
    setSelectedColor("");
    setOpenAdd(false);
  };

  // Marquer comme terminée
  const markAsDone = (index) => {
    const todo = activeTodos[index];
    setActiveTodos((prev) => prev.filter((_, i) => i !== index));
    setDoneTodos((prev) => [...prev, todo]);
  };

  // Restaurer tâche depuis les terminées
  const restoreTask = (index) => {
    const todo = doneTodos[index];
    setDoneTodos((prev) => prev.filter((_, i) => i !== index));
    setActiveTodos((prev) => [...prev, todo]);
  };

  const handleDelete = (index) => {
    setActiveTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const colorClass = (color) => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "blue":
        return "bg-blue-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold mb-6">To Do List</h1>

      {/* Bouton ouvrir popup tâches terminées */}
      <Dialog open={openDone} onOpenChange={setOpenDone}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-6">
            Tâches terminées ({doneTodos.length})
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tâches terminées</DialogTitle>
            <DialogDescription>
              {doneTodos.length === 0 && <p>Aucune tâche terminée.</p>}
              <ul className="mt-4 space-y-2 max-h-60 overflow-auto">
                {doneTodos.map((todo, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-2 border rounded"
                  >
                    <div
                      className={`w-1 h-8 ${colorClass(todo.color)} rounded`}
                    ></div>
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Liste des tâches actives */}
      <ul className="space-y-3 max-w-md">
        {activeTodos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 bg-white rounded shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`w-1 h-10 rounded ${colorClass(todo.color)}`}></div>
              <button onClick={() => markAsDone(index)} aria-label="Marquer terminé">
                <Square className="w-6 h-6 text-gray-400" />
              </button>
              <span className="select-none">{todo.text}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(index)}
              aria-label="Supprimer tâche"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </Button>
          </li>
        ))}
      </ul>

      {/* Popup ajouter tâche */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogTrigger asChild>
          <Button className="mt-8">Ajouter une tâche</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une tâche</DialogTitle>
            <DialogDescription className="flex flex-col gap-4 mt-4">
              <Input placeholder="Nouvelle tâche" ref={input} />
              <Select onValueChange={setSelectedColor}>
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
  );
}
