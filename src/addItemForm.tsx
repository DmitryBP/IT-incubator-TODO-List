import { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './TodoList/todoList.module.scss';

type addItemFormType = {
  addItem: (inputValue: string) => void;
};
export function AddItemForm({ addItem }: addItemFormType) {
  
  const [inputValue, setInputValue] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const onCheingInput = (e: ChangeEvent<HTMLInputElement>) => {
    const textInInput = e.currentTarget.value;
    setInputValue(textInInput);
  };
  const cleanAddedTask = () => {
    addItem(inputValue);
    setInputValue('');
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
  return (
    <div>
      <input
        value={inputValue}
        onChange={onCheingInput}
        onKeyUp={onKeyUp}
        className={errorStatus === true ? s.error : s.inputFild}
      />
      <button onClick={onClickAddTask}>+</button>
      {errorStatus === true ? <div className={s.errorText}>Поле обязательно для заполнения</div> : null}
    </div>
  );
}
