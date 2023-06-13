import { filterValueType } from '../App';
import s from './todoList.module.scss';

type todoItemsListType = {
  id: number;
  content: string;
  isChecked: boolean;
};

type propsType = {
  title: string;
  tasks: Array<todoItemsListType>;
  removeTask: (id: number) => void;
  cheingeFilter: (filterValue: filterValueType) => void;
};

export default function TodoList({ title, tasks, removeTask, cheingeFilter }: propsType) {
  return (
    <div className={s.todoListContainer}>
      <h3>{title}</h3>
      <input />
      <button>+</button>
      <ul>
        {tasks.map((t) => (
          <li>
            <input type="checkbox" checked={t.isChecked} />
            {t.content}
            <button onClick={() => removeTask(t.id)}>x</button>
          </li>
        ))}
      </ul>
      <button onClick={() => cheingeFilter('all')}>Все</button>
      <button onClick={() => cheingeFilter('active')}>Активные</button>
      <button onClick={() => cheingeFilter('complited')}>Выполненные</button>
    </div>
  );
}
