import { Trash } from "phosphor-react";
import circleImg from '../../assets/circle.svg'
import checkImg from '../../assets/check.svg'


import { EmptyList } from '../EmptyList'
import styles from './style.module.css'
import { Dispatch, SetStateAction } from 'react';
import { Task } from "../../App";
import { ref, remove, update } from "firebase/database";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

interface TasksListProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export function TasksList({ tasks, setTasks }: TasksListProps) {
  const { user } = useAuth()


  const TotaltasksCompleted = tasks.reduce((acc, task) => {
    if (task.isCompleted) {
      acc++
    }
    return acc
  }, 0)


  async function handleDeleteTask(taskId: string) {

    if (window.confirm('Tem certeza que voce deseja excluir esta task?')) {
      const db = await ref(database, `users/${user?.id}/tasks/${taskId}`);
      remove(db)
    }
  }


  async function handleTaskCompleted(taskId: string, ) {
    if (taskId) {
      const db = await ref(database, `users/${user?.id}/tasks/${taskId}`);
      update(db,{ isCompleted : true})
    } 
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

                <button onClick={() => handleTaskCompleted(task.id)} className={styles.button}>
                  {!task.isCompleted ?
                    <img className={styles.circle} src={circleImg} alt="" /> :
                    <img className={styles.circle} src={checkImg} alt="" />
                  }
                </button>

                <p className={task.isCompleted ? styles.taskCompleted : ''}>{task.content}</p>

              </div>
              <button onClick={() => handleDeleteTask(task.id,)} className={styles.button}>
                <Trash  size={20} className={styles.trash} />
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