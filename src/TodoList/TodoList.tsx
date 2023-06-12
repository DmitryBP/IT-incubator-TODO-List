import { useState } from 'react';
import s from './todoList.module.scss';

type todoItemsListType = {
  id: number;
  content: string;
  isChecked: boolean;
};

type propsType = {
  title: string;
  todoItemsList: Array<todoItemsListType>;
};

type filterValue = 'all' | 'active' | 'complited';

export default function TodoList({ title, todoItemsList }: propsType) {
  let [taskList, setTasklist] = useState(todoItemsList);
  let [filter, setFilter] = useState<filterValue>('all');

  const filtredTasks =
    filter === 'active'
      ? taskList.filter((t) => t.isChecked === false)
      : filter === 'complited'
      ? taskList.filter((t) => t.isChecked === true)
      : taskList;

  const removeTask = (id: number) => {
    const removedTaskList = taskList.filter((t) => t.id !== id);
    setTasklist(removedTaskList);
  };

  const filterTasks = (filter: filterValue) => {
    setFilter(filter);
  };

  return (
    <div className={s.todoListContainer}>
      <h3>{title}</h3>
      <input type="text" />
      <button>+</button>
      <ul>
        {filtredTasks.map((task: todoItemsListType) => {
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isChecked}
                onChange={() => console.log('test')}
              />
              <span>{task.content}</span>
              <button
                onClick={() => {
                  removeTask(task.id);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={()=>filterTasks('all')}>Все</button>
      <button onClick={()=>filterTasks('active')}>Активные</button>
      <button onClick={()=>filterTasks('complited')}>Выполненные</button>
    </div>
  );
}
