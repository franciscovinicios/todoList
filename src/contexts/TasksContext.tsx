import { DataSnapshot, onValue, ref } from "firebase/database";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

type FirebaseTasks = Record<string, {
  id: string,
  content: string;
  isCompleted: boolean;
}>

export interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

type TasksContextType = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>
}

type TasksContextProviderProps = {
  children: ReactNode;
}



export const TasksContext = createContext({} as TasksContextType);

export function TasksAuthContextProvider(props: TasksContextProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const { user } = useAuth() 

  useEffect(() => {
    const db = database
    const starCountRef = ref(db, `users/${user?.id}`);

    async function search() {
      await onValue(starCountRef, (taks: DataSnapshot) => {
        const databaseTask = taks.val();  
        const firabaseTasks: FirebaseTasks  = databaseTask?.tasks ?? {};
        const parsedTasks = Object.entries(firabaseTasks).map(([key, value]) => {
          return {
            id: key, 
            content: value.content,
            isCompleted: value.isCompleted
          }
        })
        setTasks(parsedTasks)
      });
    }
    search()
  }, [user])

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {props.children}

    </TasksContext.Provider>
  )

}


        
       