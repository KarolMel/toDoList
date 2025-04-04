import MainContent from "../src/components/MainContent"
import Day from "./pages/Day"
import Month from "./pages/Month"
import Week from "./pages/Week"
import Year from "./pages/Year"
import { createHashRouter, Link, Outlet, RouterProvider } from "react-router-dom"

function App() {
  const router = createHashRouter([
    {
      children: [
        {element: <Day />, path: '/'},
        {element: <Week />, path: '/Week'},
        {element: <Month />, path: '/Month'},
        {element: <Year />, path: '/Year'}
      ],
      element: (
        <>

          <main>
            <Outlet/>
          </main>
        </>
      )
    }])
  return (
    <>
      <MainContent router={router}/>
    </>
  )
}

export default App
