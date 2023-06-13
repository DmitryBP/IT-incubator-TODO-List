import React, { useState } from 'react';

import './App.css';
import TodoList from './TodoList/TodoList';

const initialTasks = [
  { id: 1, content: 'HTML&CSS', isChecked: false },
  { id: 2, content: 'JS', isChecked: true },
  { id: 3, content: 'React', isChecked: false },
];

export type filterValueType = 'all' | 'active' | 'complited';

function App() {
  const [tasks, setTaskList] = useState(initialTasks);
  const [filter, setFilter] = useState<filterValueType>('all');

  const filtredTasks =
    filter === 'active'
      ? tasks.filter((t) => t.isChecked === false)
      : filter === 'complited'
      ? tasks.filter((t) => t.isChecked === true)
      : tasks;

  const cheingeFilter = (filterValue: filterValueType) => {
    setFilter(filterValue);
  };

  const removeTask = (id: number) => {
    const removedTaskList = tasks.filter((t) => t.id !== id);
    setTaskList(removedTaskList);
  };

  return (
    <div className="App">
      <TodoList
        title="What to do"
        tasks={filtredTasks}
        removeTask={removeTask}
        cheingeFilter={cheingeFilter}
      />
      ;
    </div>
  );
}

export default App;
