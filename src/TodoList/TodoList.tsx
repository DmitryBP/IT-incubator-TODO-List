import { filterValueType } from '../App';
import s from './todoList.module.scss';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

export type todoItemsListType = { id: string; content: string; isChecked: boolean };

type propsType = {
  id: string;
  title: string;
  tasks: Array<todoItemsListType>;
  removeTask: (id: string) => void;
  cheingeFilter: (filterValue: filterValueType, todoListId: string ) => void;
  addTask: (inputValue: string) => void;
  changeTaskStatus: (id: string) => void;
  filter: string;
};

export default function TodoList({
  id,
  title,
  tasks,
  removeTask,
  cheingeFilter,
  addTask,
  changeTaskStatus,
  filter,
}: propsType) {
  const [inputValue, setInputValue] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const cleanAddedTask = () => {
    addTask(inputValue);
    setInputValue('');
  };

  const onCheingInput = (e: ChangeEvent<HTMLInputElement>) => {
    const textInInput = e.currentTarget.value;
    setInputValue(textInInput);
  };
  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    setErrorStatus(false);
    if (e.keyCode === 13 && inputValue.trim() !== '') {
      cleanAddedTask();
    } else if (e.keyCode === 13 && inputValue.trim() === '') {
      setErrorStatus(true);
      setInputValue('');
    }
  };
  const onClickAddTask = () => {
    if (inputValue.trim() !== '') {
      cleanAddedTask();
    } else setErrorStatus(true);
    setInputValue('');
  };
  const onFilterAll = () => cheingeFilter('all', id);
  const onFilterActive = () => cheingeFilter('active', id);
  const onFilterComplited = () => cheingeFilter('complited', id);
  return (
    <div className={s.todoListContainer}>
      <h3>{title}</h3>

      <div>
        <input
          value={inputValue}
          onChange={onCheingInput}
          onKeyUp={onKeyUp}
          className={errorStatus === true ? s.error : undefined}
        />
        <button onClick={onClickAddTask}>+</button>
      </div>
      {errorStatus === true ? <div className={s.errorText}>Поле обязательно для заполнения</div> : null}
      <ul>
        {tasks.map((t) => {
          const onRemove = () => removeTask(t.id);
          return (
            <li key={t.id}>
              <div>
                <input type="checkbox" onChange={() => changeTaskStatus(t.id)} checked={t.isChecked} />
                <span className={t.isChecked ? s.doneTask : undefined}>{t.content}</span>
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
