import TaskContainer from "../components/TaskContainer"
import '../index.css'
function Week() {
    return(
        <>
        <h1 style={{textAlign:'center'}}>Week</h1>
        <TaskContainer name='tasks-week'/>
        </>
    )
}

export default Week