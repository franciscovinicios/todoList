import styles from './style.module.css'
import { PlusCircle } from 'phosphor-react'

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTasks } from '../../hooks/useTasks';
import { push, ref, set } from 'firebase/database';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';





export function Input() {

  const { tasks, setTasks } = useTasks()
  const { user } = useAuth()

  const [taskContent, setTaskContent] = useState('')



  function handleNewTitle(event: ChangeEvent<HTMLInputElement>) {
    setTaskContent(event.target.value)
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    if (!taskContent) return;

    const task = {
      id: uuidv4(),
      content: taskContent,
      isCompleted: false
    }

    const db = ref(database, `users/${user?.id}/tasks`);
    const newTaskRef = push(db, 'task')
    set(newTaskRef, task);


    setTaskContent('')
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.formContainer}>
      <input
        type="text"
        placeholder='Adicione uma nova Tarefa'
        value={taskContent}
        onChange={handleNewTitle}
      />

      <button>
        <span>Criar</span>
        <PlusCircle size={18} />
      </button>

    </form>
  )
}