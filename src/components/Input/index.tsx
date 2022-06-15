import styles from './style.module.css'
import { PlusCircle } from 'phosphor-react'
import { Task } from '../../App';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface InputProps {
  setTasks: Dispatch<SetStateAction<Task[]>>
  tasks: Task[]

}

export function Input({ tasks, setTasks }: InputProps) {
  const [taskContent, setTaskContent] = useState('') 


  function handleNewTitle(event: ChangeEvent<HTMLInputElement>){
    setTaskContent(event.target.value)
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    if (!taskContent) return;

    setTasks([...tasks, {
      id:uuidv4(),
      content: taskContent,
      isCompleted: false,
    }])
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