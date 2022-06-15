import { Task } from '../../App'
import { Trash } from "phosphor-react";
import circleImg from '../../assets/circle.svg'
import checkImg from '../../assets/check.svg'


import { EmptyList } from '../EmptyList'
import styles from './style.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface TasksListProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export function TasksList({ tasks, setTasks }: TasksListProps) {
  // const [totalTasksCompleted, setTotalTasksCompleted] = useState(0)

  const TotaltasksCompleted = tasks.reduce((acc, task) => {
    if (task.isCompleted) {
      acc++
    }
    return acc
  }, 0)

  

  function handleRemoveTask(id: string) {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks);
  }



  function handleToggleTaskCompletion(id: string) {
    const newTask = tasks.map(task => task.id === id ? {
      ...task,
      isCompleted: !task.isCompleted
    } : task);


    setTasks(newTask)
  }

  return (
    <div className={styles.tasksStatus}>

      <div className={styles.taskProgress}>
        <div className={styles.tasksCreated}>
          Tarefas Criadas
          <div className={styles.totalTasksCreated}>{tasks.length}</div>
        </div>

        <div className={styles.completedTasks}>
          Concluídas
          <div className={styles.totalTasksCompleted}>{`${TotaltasksCompleted} de ${tasks.length}`}</div>
        </div>
      </div>

      <div className={styles.resumeTasks}>
        {tasks.length !== 0 ? (
          tasks.map((task) => (
            <div className={styles.task} key={task.id}>

              <div className={styles.taskContent} >

                <button onClick={() => handleToggleTaskCompletion(task.id)} className={styles.button}>
                  {!task.isCompleted ?
                    <img className={styles.circle} src={circleImg} alt="" /> :
                    <img className={styles.circle} src={checkImg} alt="" />
                  }
                </button>

                <p className={task.isCompleted ? styles.taskCompleted : ''}>{task.content}</p>

              </div>
              <button className={styles.button}>
                <Trash onClick={() => handleRemoveTask(task.id)} size={20} className={styles.trash} />
              </button>
            </div >
          ))
        ) : (
          <EmptyList />
        )}
      </div>

    </div>
  )
}