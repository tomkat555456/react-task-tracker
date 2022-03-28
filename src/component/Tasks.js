import Task from './Task'

const Tasks = ({ tasks, onDelete, onToogle }) => {
    return (
        <>  
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToogle={onToogle}/>
            ))}
        </>
    )
}

export default Tasks
