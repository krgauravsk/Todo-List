import React, { useEffect, useRef } from "react";

const Todo = ({
  datas,
  setDatas,
  pending,
  setPending,
  todoEditing,
  setTodoEditing,
  editText,
  setEditText
}) => {
  const inputE = useRef(null);

  useEffect(() => {
    if (todoEditing !== null) {
      inputE.current.focus();
    }
  }, [todoEditing]);

  const handleDelete = (selected) => {
    const newData = datas.filter((set, index) => index !== selected);
    setDatas(newData);
    if (pending < 1) {
      setPending(0);
    } else if (!newData.completed) {
      setPending(pending - 1);
    }
  };

  const handleComplete = (selected) => {
    const newData = datas.map((data, index) =>
      index === selected ? { ...data, completed: true } : data
    );
    setDatas(newData);
    if (pending < 1) {
      setPending(0);
    } else {
      setPending(pending - 1);
    }
  };

  const handleEdit = (id) => {
    const newData = datas.map((todo, index) => {
      if (index === id) {
        todo.data = editText;
      }
      return todo;
    });
    setDatas(newData);
    setTodoEditing(null);
    setEditText("");
  };

  return (
    <div>
      <h4>Pending Task: {pending}</h4>
      {datas.map(({ data, completed }, index) => (
        <div className="main" key={index}>
          {todoEditing === index ? (
            <input
              ref={inputE}
              className="editbutton"
              type="text"
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
            />
          ) : (
            <h4>{data}</h4>
          )}
          <div>
            {todoEditing === index ? (
              <button
                className="button"
                onClick={() => {
                  handleEdit(index);
                }}
                style={{ marginRight: "5px" }}
              >
                Done
              </button>
            ) : (
              <button
                disabled={completed === true}
                className="button"
                style={{ marginRight: "5px", backgroundColor: "blue" }}
                onClick={() => {
                  setTodoEditing(index);
                  setEditText(data);
                }}
              >
                Edit
              </button>
            )}
            <button
              disabled={completed === true || todoEditing != null}
              className="button"
              onClick={() => {
                handleComplete(index);
              }}
              style={{ marginRight: "10px" }}
            >
              Complete
            </button>
            <button
              disabled={todoEditing != null}
              className="added"
              style={{
                backgroundColor: "firebrick",
                margin: 0,
                marginRight: "1rem",
                padding: "0 15px"
              }}
              onClick={() => {
                handleDelete(index);
              }}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Todo;
