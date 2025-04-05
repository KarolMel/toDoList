import '../index.css'
import { useState, useEffect } from 'react';

interface Props {
    name: string;
}

function TaskContainer(props: Props) {

    const [tasks, setTasks] = useState<string[]>([]);
    const [task, setTask] = useState<string>('');
    const storageKey = props.name;

    useEffect(() => {
        const storedTasks = localStorage.getItem(storageKey);
        if (storedTasks) {
            try {
                const parsedTasks = JSON.parse(storedTasks);
                if (Array.isArray(parsedTasks)) {
                    setTasks(parsedTasks); // Ustaw stan tylko, jeśli dane są tablicą
                } else {
                    console.error('Invalid tasks format in localStorage');
                    setTasks([]); // Ustaw pustą tablicę, jeśli dane są nieprawidłowe
                }
            } catch (error) {
                console.error('Error parsing tasks from localStorage:', error);
                setTasks([]); // Ustaw pustą tablicę w przypadku błędu
            }
        }
    }, []);

    function addTask() {
        if (task.trim() !== '') {
            const updatedTasks = [...tasks, task];
            localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
            setTask('');
        }
    }

    function deleteTask(index: number) {
        const updatedTask = tasks.filter((_, i) => i !== index);
        localStorage.setItem(storageKey, JSON.stringify(updatedTask));
        setTasks(updatedTask);
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