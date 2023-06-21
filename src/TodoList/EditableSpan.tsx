import { ChangeEvent, useState } from 'react';
import s from './todoList.module.scss';

type EditableSpanType = {
  content: string;
  isChecked: boolean;
  onChangeHandler: (NewTaskValue: string) => void
};

export default function EditableSpan(props: EditableSpanType) {
  const [editMode, setEditMode] = useState(false);
  const [taskValue, setTaskValue] = useState('');
  const activateEditableMode = () => {
    setEditMode(true);
    setTaskValue(props.content);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.onChangeHandler(taskValue)
  };

  const onChangeTaskValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.currentTarget.value)
  };

  return editMode ? (
    <input value={taskValue} onBlur={deactivateEditMode} onChange={onChangeTaskValueHandler} autoFocus />
  ) : (
    <span onDoubleClick={activateEditableMode} className={props.isChecked ? s.doneTask : undefined}>
      {props.content}
    </span>
  );
}
