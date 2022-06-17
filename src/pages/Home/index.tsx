import styles from '../../styles/styleHome.module.css'
import toast, { Toaster } from 'react-hot-toast';

import IlustrationImg from '../../assets/illustration.svg'
import LogoImg from '../../assets/logo.svg'
import { FaGoogle } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';



import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { database } from '../../services/firebase';
import { onValue, ref } from 'firebase/database';

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
    } else if (user) {
      navigate('/mytasks')

    }
  }

  return (
    <div className={styles.pageAuth}>
      <aside>
        <img src={IlustrationImg} alt="illustration" />
        <strong>Controle sobre suas tarefas</strong>
        <p>Organize seu dia adicionado tarefas</p>
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