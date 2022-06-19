import { Routes, BrowserRouter, Route } from 'react-router-dom'

import { AuthContextProvider } from "./contexts/AuthContex";
import { TasksAuthContextProvider } from "./contexts/TasksContext";

import { Home } from "./pages/Home";
import { MyTasks } from "./pages/MyTasks";
import './styles/global.css'



export function App() {

  return (
      <BrowserRouter>
        <AuthContextProvider>
          <TasksAuthContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mytasks" element={<MyTasks />} />

            </Routes>
          </TasksAuthContextProvider>
        </AuthContextProvider>
      </BrowserRouter> 
  )
}

