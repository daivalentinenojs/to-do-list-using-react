import {useMemo, useState} from 'react'

// custom hooks
import useLocalStorage from './hooks/useLocalStorage'

// custom components
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'
import ToggleSwitch from './components/ToggleSwitch'
import ProgressBar from './components/ProgressBar';

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSortDone, setIsSortDone] = useState(false);

  const calProgress = (t) => {
    const total = parseFloat(t.length);
    const done = parseFloat(t.filter((val) => {
      return val.checked;
    }).length)
    if (done > 0 ){
      return (done/total)*100;
    } else {
      return 0;
    }
  }

  const progressM = useMemo(() => {
    const pr = calProgress(tasks);
    return pr
  }, [tasks]);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  }

  const sortTask = (val) => {
    setIsSortDone(val);
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name }
        : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
        <h3>Add things to do</h3>
        <hr></hr>
      </header>

      <ProgressBar bgcolor="orange" progress={progressM}  height={30} />

      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }
      
      {tasks && (
        <TaskList
          tasks={tasks}
          sortDone={isSortDone}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}

      <hr></hr>
      <ToggleSwitch sortTask={sortTask}/>

      <CustomForm addTask={addTask}/> 
    </div>
  )
}

export default App
