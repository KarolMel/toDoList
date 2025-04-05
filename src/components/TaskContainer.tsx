import '../index.css'
import { useState } from 'react';
function TaskContainer() {

    const [tasks, setTasks] = useState<string[]>([]);
    const [task, setTask] = useState<string>('');


    function addTask() {
        if (task.trim() !== '') {
            setTasks([...tasks, task]);
            setTask('');
        }
    }

    function deleteTask(index: number) {
        const deleteTask = tasks.filter((_, i) => i !== index);
        setTasks(deleteTask);
        console.log('dziala')
    }


    return(
        <>
            <div className="task-list">
            <div className='task-inputs'>
                    <input 
                    onChange={((e) => setTask(e.target.value))}
                    className='task-input'
                    type='text'
                    placeholder='Add new task...'
                    />
                    <button onClick={addTask} className='add-task-button'>Add</button>
                </div>
                <div className='task-list-inner'>
                    <ul className='task-ul'>
                        {tasks.map((task, index) => (
                            <li className='task-text' key={index}>
                                <input type='checkbox' className='checkbox'></input>
                                {task}
                                <button onClick={() => {deleteTask(index)}} className='delete-task-button'>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TaskContainer;