import '../index.css'
import { RouterProvider } from 'react-router-dom'

function MainContent({ router }: { router: any }) {
    return (
        <>
            <div className="content">
                <nav className='navigation'>
                    <ul>
                        <li><a href="#/">Day</a></li>
                        <li><a href="#/week">Week</a></li>
                        <li><a href="#/month">Month</a></li>
                        <li><a href="#/year">Year</a></li>
                    </ul>
                </nav>
                <div className="main-view">
                    <RouterProvider router={router} />
                </div>
            </div>
        </>
    )
}

export default MainContent