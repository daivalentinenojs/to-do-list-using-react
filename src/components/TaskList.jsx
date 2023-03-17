// component import
import TaskItem from './TaskItem';

// styles
import styles from './TaskList.module.css';

const TaskList = ({ tasks, deleteTask, toggleTask, enterEditMode, sortDone }) => {
  return (
    <ul className={styles.tasks}>
      {tasks.sort((a, b) => {
        if (sortDone){
          return a.checked - b.checked
        }
        return b.id - a.id
      }).map(task => {
        return <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            enterEditMode={enterEditMode}
        />
      })
      }
    </ul>
  )
}
export default TaskList