import { useState } from "react";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { TasksList } from "./components/TasksList";
import { AuthContextProvider } from "./contexts/AuthContex";
import { Home } from "./pages/Home";
import styles from './styles/app.module.css'
import './styles/global.css'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { TasksAuthContextProvider } from "./contexts/TasksContext";
import { MyTasks } from "./pages/MyTasks";

export interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

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

