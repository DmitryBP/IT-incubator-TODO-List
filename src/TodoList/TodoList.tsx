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
  // deliteListItem: Function;
};

export default function TodoList({ title, todoItemsList }: propsType) {
  let [list, setList] = useState(todoItemsList);

  let deliteListItem = (id: number) => {
    let filtredList = list.filter(el => el.id!==id)
    setList(filtredList)
  }

  return (
    <div className={s.todoListContainer}>
      <h3>{title}</h3>
      <input type="text" />
      <button>+</button>

      <ul>
        {list.map((el: todoItemsListType) => {
          return (
            <li key={el.id}>
              <input type="checkbox" checked={el.isChecked} onChange={() => console.log('test')} />
              <span>{el.content}</span>
              <button onClick={()=> deliteListItem(el.id)}>x</button>
            </li>
          );
        })}
      </ul>
      <button>All</button>
      <button>JS</button>
      <button>React</button>
    </div>
  );
}
