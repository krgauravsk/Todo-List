import React, { useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import "./styles.css";

export default function App() {
  const [task, setTask] = useState({
    data: "",
    completed: false
  });
  const [datas, setDatas] = useState([]);
  const [pending, setPending] = useState(0);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const inputE1 = useRef(null);
  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const temp1 = localStorage.getItem("pending");
    const loadedTodos = JSON.parse(temp);
    const PendingTodos = JSON.parse(temp1);
    if (loadedTodos) {
      setDatas(loadedTodos);
      setPending(PendingTodos);
    }
  }, []);

  useEffect(() => {
    inputE1.current.focus();
    const temp = JSON.stringify(datas);
    localStorage.setItem("todos", temp);
    const temp1 = JSON.stringify(pending);
    localStorage.setItem("pending", temp1);
  }, [datas, pending]);

  const handleChange = () => {
    if (task.data === "") {
      setDatas(datas);
    } else {
      setDatas([...datas, task]);
      setPending(pending + 1);
    }
    setTask({ data: "" });
  };

  const handleClear = () => {
    setDatas([]);
    setPending(0);
    setEditText([]);
    setTodoEditing(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        placeholder="add a new Task"
        type="text"
        ref={inputE1}
        value={task.data}
        onChange={(e) =>
          setTask({
            data: e.target.value,
            completed: false
          })
        }
      />
      <button
        disabled={task.data === ""}
        className="added"
        type="button"
        onClick={handleChange}
      >
        Add
      </button>
      <Todo
        pending={pending}
        setPending={setPending}
        datas={datas}
        setDatas={setDatas}
        todoEditing={todoEditing}
        setTodoEditing={setTodoEditing}
        editText={editText}
        setEditText={setEditText}
      />
      <button
        disabled={datas.length === 0}
        className="added"
        onClick={() => handleClear()}
      >
        Clear List
      </button>
    </div>
  );
}
