import {  useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

export function useTasks() {
  const value = useContext(TasksContext)
  
  return value;
}