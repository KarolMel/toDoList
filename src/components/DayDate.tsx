import '../index.css'
import { useEffect, useState } from 'react'

function DayDate() {
    const [day, setDay] = useState<string>('');
    const [dayOfWeek, setDayOfWeek] = useState<number>(0);
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<number>(0);

    const [tasks, setTasks] = useState<string[]>([]);
    const [task, setTask] = useState<string>('');

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    useEffect(() => {
        const date = new Date();
        const dayIndex = date.getDay();
        setDay(days[dayIndex]);

        const monthIndex = date.getMonth();

        setMonth(months[monthIndex]);
        setDayOfWeek(date.getDate());
        setYear(date.getFullYear());
    }, []);


    const nextDay = () => {
        const currentDate = new Date(year, months.indexOf(month), dayOfWeek); // Tworzymy datę na podstawie stanu
        currentDate.setDate(currentDate.getDate() + 1); // Przechodzimy do następnego dnia
    
        // Aktualizujemy stan na podstawie nowej daty
        setDay(days[currentDate.getDay()]);
        setDayOfWeek(currentDate.getDate());
        setMonth(months[currentDate.getMonth()]);
        setYear(currentDate.getFullYear());
    };

    const prevDay = () => {
        const currentDate = new Date(year, months.indexOf(month), dayOfWeek);
        currentDate.setDate(currentDate.getDate() - 1);

        setDay(days[currentDate.getDay()]);
        setDayOfWeek(currentDate.getDate());
        setMonth(months[currentDate.getMonth()]);
        setYear(currentDate.getFullYear());
    }

    const addTask = () => {
        if(task.trim() !== '') {
            setTasks([...tasks, task]);
            setTask(' ');
        }
    }

    const deleteTask = (index: number) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    }

    return(
        <>
            <div className="day-date">

            <img onClick={prevDay} src='/src/icons/left-chevron.png'></img>
            <div className='date-inner'>
                <p className='arrow-left'></p>
                <p className='day-date-text'>{day}</p>
                <p className='month-day-year'>{month} {dayOfWeek}, {year}</p>
            </div>
            <img onClick={nextDay} src='/src/icons/right-chevron.png'></img>
            </div>

            <div className='task-list'>
            <div className='task-inputs'>
                <input onChange={(e) => setTask(e.target.value)} type='text' placeholder='Add new task...' className='task-input'></input>
                <button onClick={addTask} className='add-task-button'>Add</button>
            </div>
                <div className='task-list-inner'>
                    <ul className='task-ul'>
                        {tasks.map((task, index) => (
                            <li className='task-text' key={index}>
                                <input type='checkbox' className='checkbox'></input>
                                {task}
                                <button onClick={() => deleteTask(index)} className='delete-task-button'>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DayDate