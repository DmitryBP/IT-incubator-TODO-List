import React from 'react';
import { DATA } from './Data/Data';

import './App.css';
import TodoList from './TodoList/TodoList';

function App() {

  return (
    <div className="App">
      {DATA.map((el, i)=> {
      return <TodoList key={i}
        title={el.title}
        todoItemsList={el.todoItemsList}
      />
      })}
    </div>
  );
}

export default App;
