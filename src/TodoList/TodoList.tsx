import { connect } from 'http2';
import { filterValueType } from '../App';
import { AddItemForm } from '../addItemForm';
import EditableSpan from './EditableSpan';
import s from './todoList.module.scss';

export type todoItemsListType = { id: string; content: string; isChecked: boolean };

type propsType = {
  id: string;
  title: string;
  tasks: Array<todoItemsListType>;
  removeTask: (id: string, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  cheingeFilter: (filterValue: filterValueType, todoListId: string) => void;
  addTask: (inputValue: string, todoListId: string) => void;
  changeTaskStatus: (id: string, todoListId: string) => void;
  filter: string;
  onChangeHandler2: (id: string, todoListId: string, taskValue: string) => void;
};

export default function TodoList({
  id,
  title,
  tasks,
  removeTask,
  removeTodoList,
  cheingeFilter,
  addTask,
  changeTaskStatus,
  filter,
  onChangeHandler2,
}: propsType) {
  const onFilterAll = () => cheingeFilter('all', id);
  const onFilterActive = () => cheingeFilter('active', id);
  const onFilterComplited = () => cheingeFilter('complited', id);
  const addTaskWrp = (inputValue: string) => {
    addTask(inputValue, id);
  };

  return (
    <div className={s.todoListContainer}>
      <h3>
        <EditableSpan content={title} isChecked={false} onChangeHandler={(value) => {console.log(value);}} />
        <button onClick={() => removeTodoList(id)} className={s.delBtn} />
      </h3>
      <AddItemForm addItem={addTaskWrp} />
      <ul>
        {tasks.map((t) => {
          const onRemove = () => removeTask(t.id, id);
          const onChangeHandler = (taskValue: string) => {
            onChangeHandler2(t.id, id, taskValue);
          };
          return (
            <li key={t.id}>
              <div>
                <input type="checkbox" onChange={() => changeTaskStatus(t.id, id)} checked={t.isChecked} />
                <EditableSpan content={t.content} isChecked={t.isChecked} onChangeHandler={onChangeHandler} />
              </div>
              <button onClick={onRemove} className={s.delBtn}></button>
            </li>
          );
        })}
      </ul>

      <button onClick={onFilterAll} className={filter === 'all' ? s.activeFilterBtn : undefined}>
        Все
      </button>
      <button onClick={onFilterActive} className={filter === 'active' ? s.activeFilterBtn : undefined}>
        Активные
      </button>
      <button onClick={onFilterComplited} className={filter === 'complited' ? s.activeFilterBtn : undefined}>
        Выполненные
      </button>
    </div>
  );
}
