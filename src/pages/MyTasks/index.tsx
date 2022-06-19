import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { TasksList } from "../../components/TasksList";
import { useAuth } from "../../hooks/useAuth";
import { useTasks } from "../../hooks/useTasks";
import styles from '../../styles/styleMytasks.module.css'


export function MyTasks() {
  const { tasks, setTasks } = useTasks()
  const { SignOut, user } = useAuth()
  const navigate = useNavigate()


  async function handleLogout() {
    if (user) {
      await SignOut()
      toast.success("Voce foi desconectado!", {
        style: {
          background: "#68D391",
          color: "#FFF"
        },
        iconTheme: {
          primary: "#FFF",
          secondary: "#68D391"
        }
      });
      navigate('/')
    }
  }


  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Input />

        <span
          onClick={handleLogout} 
          className={styles.desconect}
        >Desconectar
        </span>

        <TasksList
          tasks={tasks}
          setTasks={setTasks}
        />
        <Toaster />

      </div>
    </>
  )
}