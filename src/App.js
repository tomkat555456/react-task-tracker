import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Header from './component/Header'
// import Footer from './component/Footer'
import Tasks from './component/Tasks'
import AddTask from './component/AddTask'
// import About from './component/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/Tasks')
    const data = await res.json()
    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/Tasks/${id}`)
    const data = await res.json()
    return data
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random()*10000 + 1)
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !==id ))
  }

  //Toogle Reminder
  const toogleReminder = async (id) => {
    const taskToToogle = await fetchTask(id);
    const updTask = {...taskToToogle, reminder: !taskToToogle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(updTask)
    })

    const data = await res.json();
    console.log("data", data);
    setTasks(
      tasks.map((task) => 
      task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
      <div className="container">
        <Header 
          title='Task Tracker' 
          onAdd={() => {setShowAddTask(!showAddTask)}} 
          showAdd={showAddTask}
        />
        { showAddTask && <AddTask onAdd={addTask} /> }
        { tasks.length > 0 ? (
          <Tasks tasks={tasks} onDelete={deleteTask} onToogle={toogleReminder} />
        ) : (
          'no task to show'
        )}
      </div>
  );
}

export default App;

// router version still not working
{/* <Router>
      <div className="container">
        <Header 
          title='Task Tracker' 
          onAdd={() => {setShowAddTask(!showAddTask)}} 
          showAdd={showAddTask}
        />
        { showAddTask && <AddTask onAdd={addTask} /> }
        { tasks.length > 0 ? (
          <Tasks tasks={tasks} onDelete={deleteTask} onToogle={toogleReminder} />
        ) : (
          'no task to show'
        )}
        <Routes>
          <Route path='/about' component={About} />
        </Routes>
        <Footer />
      </div>
    </Router> */}
