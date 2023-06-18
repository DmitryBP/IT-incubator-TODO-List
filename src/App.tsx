import React, { useState } from 'react';

import './App.css';
import TodoList from './TodoList/TodoList';
import { v1 } from 'uuid';

export type filterValueType = 'all' | 'active' | 'complited';
type TodoListType = {
  id: string;
  title: string;
  filter: filterValueType;
};

function App() {
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: v1(), title: 'Whot to do', filter: 'active' },
    { id: v1(), title: 'Whot to lern', filter: 'complited' },
  ]);
  const [tasks, setTaskList] = useState([
    { id: v1(), content: 'HTML&CSS', isChecked: false },
    { id: v1(), content: 'JS', isChecked: false },
    { id: v1(), content: 'React', isChecked: false },
  ]);

  const cheingeFilter = (filterValue: filterValueType, todoListId: string) => {
    let todoList = todoLists.find((t)=>t.id===todoListId)
    if(todoList){
      todoList.filter = filterValue
      setTodoLists([...todoLists])
    }
  };

  const removeTask = (id: string) => {
    const removedTaskList = tasks.filter((t) => t.id !== id);
    setTaskList(removedTaskList);
  };

  const addTask = (inputValue: string) => {
    const addObj = { id: v1(), content: inputValue, isChecked: false };

    const newTasks = [addObj, ...tasks];
    setTaskList(newTasks);
  };

  const changeTaskStatus = (id: string) => {
    const targetTask = tasks.find((t) => t.id === id);
    if (targetTask) {
      targetTask.isChecked ? (targetTask.isChecked = false) : (targetTask.isChecked = true);
      setTaskList([...tasks]);
    }
  };

  return (
    <div className="App">
      {todoLists.map((t) => {
        const filtredTasks =
          t.filter === 'active'
            ? tasks.filter((t) => t.isChecked === false)
            : t.filter === 'complited'
            ? tasks.filter((t) => t.isChecked === true)
            : tasks;

        return (
          <TodoList
            key={t.id}
            id={t.id}
            title={t.title}
            tasks={filtredTasks}
            removeTask={removeTask}
            cheingeFilter={cheingeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={t.filter}
          />
        );
      })}
      ;
    </div>
  );
}

export default App;
