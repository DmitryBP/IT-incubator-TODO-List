import React, { useState } from 'react';
import './App.css';
import TodoList, { todoItemsListType } from './TodoList/TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm';

export type filterValueType = 'all' | 'active' | 'complited';
type TodoListType = {
  id: string;
  title: string;
  filter: filterValueType;
};
type tasksStateType = {
  [key: string]: Array<todoItemsListType>;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'Whot to do', filter: 'active' },
    { id: todoListId2, title: 'Whot to BAY', filter: 'active' },
  ]);

  const [tasksObj, setTasks] = useState<tasksStateType>({
    [todoListId1]: [
      { id: v1(), content: 'HTML&CSS', isChecked: false },
      { id: v1(), content: 'JS', isChecked: false },
      { id: v1(), content: 'React', isChecked: false },
    ],
    [todoListId2]: [
      { id: v1(), content: 'BOOK', isChecked: false },
      { id: v1(), content: 'MILK', isChecked: false },
    ],
  });

  const cheingeFilter = (filterValue: filterValueType, todoListId: string) => {
    let todoList = todoLists.find((t) => t.id === todoListId);
    if (todoList) {
      todoList.filter = filterValue;
      setTodoLists([...todoLists]);
    }
  };

  const removeTask = (id: string, todoListId: string) => {
    const tasks = tasksObj[todoListId];
    const removedTaskList = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = removedTaskList;
    setTasks({ ...tasksObj });
  };

  const removeTodoList = (todoListId: string) => {
    const removedTodoList = todoLists.filter((t) => t.id !== todoListId);
    setTodoLists(removedTodoList);
    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  };

  const addTask = (inputValue: string, todoListId: string) => {
    const addObj = { id: v1(), content: inputValue, isChecked: false };
    const newTasks = [addObj, ...tasksObj[todoListId]];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const onChangeHandler2 = (id: string, todoListId: string, taskValue: string) => {
    const targetTask = tasksObj[todoListId].find((t) => t.id === id);
    if (targetTask) {
      console.log(taskValue);
      targetTask.content = taskValue
      setTasks({ ...tasksObj });
    }
  }

  const changeTaskStatus = (id: string, todoListId: string) => {
    const targetTask = tasksObj[todoListId].find((t) => t.id === id);
    if (targetTask) {
      targetTask.isChecked ? (targetTask.isChecked = false) : (targetTask.isChecked = true);
      setTasks({ ...tasksObj });
    }
  };
  const addTodoList = (inputValue: string) => {
    const newTodoList: TodoListType = { id: v1(), title: inputValue, filter: 'active' };
    setTodoLists([newTodoList, ...todoLists]);
    setTasks({ ...tasksObj, [newTodoList.id]: [] });
  };
  return (
    <div className="App">
      <div className="container">
        <div className="todoListsWrapper">
          <div className="header">
            <h3>Cписки дел</h3>
            <AddItemForm addItem={addTodoList} />
          </div>
          <div className="taskLists">
            {todoLists.map((t) => {
              const filtredTasks =
                t.filter === 'active'
                  ? tasksObj[t.id].filter((t) => t.isChecked === false)
                  : t.filter === 'complited'
                  ? tasksObj[t.id].filter((t) => t.isChecked === true)
                  : tasksObj[t.id];
              return (
                <TodoList
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  tasks={filtredTasks}
                  removeTask={removeTask}
                  removeTodoList={removeTodoList}
                  cheingeFilter={cheingeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  filter={t.filter}
                  onChangeHandler2={onChangeHandler2}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
