import { useState } from "react";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { TasksList } from "./components/TasksList";
import styles from './styles/app.module.css'
import './styles/global.css'

export interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Input setTasks={setTasks} tasks={tasks} />
        <TasksList tasks={tasks} setTasks={setTasks} />

      </div>
    </div>
  )
}

