import clipBoard from '../../assets/clipboard.svg'
import styles from './style.module.css'

export function EmptyList() {
  return (
    <div className={styles.emptyContentList}>
      <img src={clipBoard} alt="Clip Board" />
      <p>Você ainda não tem tarefas cadastradas</p>
      <p >Crie tarefas e organize seus itens a fazer </p>
    </div>
  )
}