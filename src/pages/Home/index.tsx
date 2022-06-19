import styles from '../../styles/styleHome.module.css'
import toast, { Toaster } from 'react-hot-toast';

import IlustrationImg from '../../assets/illustration.svg'
import LogoImg from '../../assets/logo.svg'
import { FaGoogle } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';



import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export function Home() {
  const navigate = useNavigate()
  const { user, signInWithGoogle } = useAuth()

  useEffect(() => {
    if ((user)) {
      navigate('/mytasks')
    }

  }, [user, navigate])



  async function handleLoginGoogle() {
    if (!user) {
      await signInWithGoogle()
      toast.success("Voce está conectado!", {
        style: {
          background: "#68D391",
          color: "#FFF"
        },
        iconTheme: {
          primary: "#FFF",
          secondary: "#68D391"
        }
      });
      navigate('/mytasks')
    } 
  }

  return (
    <div className={styles.pageAuth}>
      <aside>
        <img src={IlustrationImg} alt="illustration" />
        <strong>Organize suas tarefas diárias</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <img src={LogoImg} alt="todo-logo" />


          <button className={styles.ButtonLogin} onClick={handleLoginGoogle}  >
            <FaGoogle />
            Entre com o Google
          </button>
        </div>
      </main>
      <Toaster />
    </div>
  )
}