import '../index.css'
import { useEffect, useState } from 'react'

function DayDate() {
    const [day, setDay] = useState<string>('');
    const [dayOfWeek, setDayOfWeek] = useState<number>(0);
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<number>(0);

    const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});
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
    };

    const getDateKey = (year: number, month: string, day: number) => {
        const monthIndex = months.indexOf(month) + 1; // Dodajemy 1, ponieważ miesiące w Date są indeksowane od 0
        const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex; // Dodajemy 0 przed miesiącem, jeśli jest jednocyfrowy
        const formattedDay = day < 10 ? `0${day}` : day; // Dodajemy 0 przed dniem, jeśli jest jednocyfrowy
        return `${year}-${formattedMonth}-${formattedDay}`; // Zwracamy sformatowany klucz daty
    };

    const addTask = () => {
        if (task.trim() !== '') {
            const dateKey = getDateKey(year, month, dayOfWeek);
            const updatedTask = { ...tasks };
            if (!updatedTask[dateKey]) {
                updatedTask[dateKey] = [];
            }
            updatedTask[dateKey].push(task);
            setTasks(updatedTask);
            setTask('');
        }
    };

    const deleteTask = (index: number) => {
        const dateKey = getDateKey(year, month, dayOfWeek);
        const updatedTask = { ...tasks };
        updatedTask[dateKey] = updatedTask[dateKey].filter((_, i) => i !== index); // Usuwamy zadanie o danym indeksie
        setTasks(updatedTask);
    };

    const dateKey = getDateKey(year, month, dayOfWeek); // Pobierz klucz daty
    const currentTask = tasks[dateKey] || []; // Pobierz zadania dla bieżącej daty lub pustą tablicę

    return (
        <>
            <div className="day-date">
                <img onClick={prevDay} src='/src/icons/left-chevron.png' alt="Previous Day" />
                <div className='date-inner'>
                    <p className='arrow-left'></p>
                    <p className='day-date-text'>{day}</p>
                    <p className='month-day-year'>{month} {dayOfWeek}, {year}</p>
                </div>
                <img onClick={nextDay} src='/src/icons/right-chevron.png' alt="Next Day" />
            </div>

            <div className='task-list'>
                <div className='task-inputs'>
                    <input
                        onChange={(e) => setTask(e.target.value)}
                        type='text'
                        placeholder='Add new task...'
                        className='task-input'
                        value={task}
                    />
                    <button onClick={addTask} className='add-task-button'>Add</button>
                </div>
                <div className='task-list-inner'>
                    <ul className='task-ul'>
                        {currentTask.map((task, index) => (
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
    );
}

export default DayDate;