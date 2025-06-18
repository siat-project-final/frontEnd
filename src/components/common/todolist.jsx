import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todo-list')) || []);
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const hasJustAdded = todos.some((todo) => todo.justAdded);
    if (hasJustAdded) {
      const updatedTodos = todos.map((todo) => ({ ...todo, justAdded: false }));
      setTodos(updatedTodos);
    }
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (!inputValue.trim()) return;

    if (editMode !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editMode ? { ...todo, item: inputValue } : todo
      );
      setTodos(updatedTodos);
      setEditMode(null);
    } else {
      // 새 항목을 맨 위에 추가
      setTodos([{ item: inputValue, status: false, justAdded: true }, ...todos]);
    }
    setInputValue('');
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, status: !todo.status } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setInputValue(todos[index].item);
    setEditMode(index);
  };

  return (
    <div className="container">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
        * {
          margin: 0;
          padding: 0;
          font-family: "Poppins", sans-serif;
          box-sizing: border-box;
        }
        body {
          background: #ffffff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          background: #ffffff;
          padding: 25px;
          width: 550px;
          border-radius: 10px;
        }
        .todo-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding-left: 5px;
          justify-content: center;
        }
        .todo-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #edeef0;
          border-radius: 30px;
          padding-left: 20px;
          margin-bottom: 25px; /* ✅ 여백 추가 */
        }
        .todo-body input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          padding: 15px 0;
          font-size: 20px;
        }
        .todo-body img {
          cursor: pointer;
          border-radius: 40px;
          height: 55px;
          width: 55px;
          padding: 15px;
          background: limegreen;
        }
        ul li {
          list-style: none;
          font-size: 18px;
          cursor: pointer;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #edeef0;
          margin-bottom: 10px;
          border-radius: 5px;
        }
        li.just-added {
          animation: new-item-animation 0.3s linear forwards;
          opacity: 0;
        }
        li.deleted-item {
          text-decoration: line-through;
        }
        .todo-controls {
          width: 25px;
          height: 25px;
          padding: 3px;
          margin-right: 5px;
        }
        @keyframes new-item-animation {
          from {
            opacity: 0;
            transform: translateY(-400px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="todo-header">
        <h2>ToDo List</h2>
      </div>
      <div className="todo-body">
        <input
          type="text"
          className="todo-input"
          placeholder="Add your items"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <img
          src={editMode !== null ? '/assets/img/plus.png' : '/assets/img/plus.png'}
          alt={editMode !== null ? 'Update' : 'Add'}
          onClick={handleAddOrUpdate}
        />
      </div>
      <ul className="list-items">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`
              ${todo.status ? 'deleted-item' : ''}
              ${todo.justAdded ? 'just-added' : ''}`.trim()}
            onDoubleClick={() => toggleComplete(index)}
          >
            <div>
              <span style={{ textDecoration: todo.status ? 'line-through' : 'none' }}>
                {todo.item}
              </span>
            </div>
            <div>
              <img
                className="edit todo-controls"
                onClick={() => handleEdit(index)}
                src="/assets/img/pencil.png"
                alt="Edit"
              />
              <img
                className="delete todo-controls"
                onClick={() => handleDelete(index)}
                src="/assets/img/trash-2.png"
                alt="Delete"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
