import React, { useState, useEffect } from 'react';
//import './Todo.css'; // 필요시 스타일 분리

const Todo = () => {
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
    <aside className="todo-section">
      <div className="todo-container">
        <h3 className="todo-title">ToDo List</h3>
        <div className="todo-input-group">
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddOrUpdate();
            }}
          />
          <button className="add-btn" onClick={handleAddOrUpdate}>
            {editMode !== null ? '수정' : '추가'}
          </button>
        </div>
        {/* 추가 성공 메시지 */}
        {todos.some((todo) => todo.justAdded) && (
          <div className="alert-success">새 항목이 추가되었습니다!</div>
        )}
        <ul className="todo-list">
          {todos.length === 0 && <li className="todo-item">할 일이 없습니다.</li>}
          {todos.map((todo, index) => (
            <li key={index} className={`todo-item${todo.status ? ' completed' : ''}`}>
              <span
                className="todo-text"
                style={{ textDecoration: todo.status ? 'line-through' : 'none', cursor: 'pointer' }}
                onClick={() => toggleComplete(index)}
              >
                {todo.item}
              </span>
              <div className="todo-actions">
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  수정
                </button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Todo;
