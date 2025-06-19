import React, { useState, useEffect } from 'react';

const Todo = ({ selectedDate: propDate, onTodoChange }) => {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todo-list')) || []);
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(null);

  // ✅ 날짜 우선순위: props → session → 오늘
  const selectedDate = propDate || sessionStorage.getItem('selectedDate') || new Date().toISOString().slice(0, 10);

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todos));
    onTodoChange && onTodoChange(); // ✅ 캘린더 리프레시 트리거
  }, [todos, onTodoChange]);

  useEffect(() => {
    const updated = todos.map((todo) => ({ ...todo, justAdded: false }));
    setTodos(updated);
  }, []);

  const handleAddOrUpdate = () => {
    if (!inputValue.trim()) return;

    if (editMode !== null) {
      const updated = todos.map((todo, idx) =>
        idx === editMode ? { ...todo, item: inputValue } : todo
      );
      setTodos(updated);
      setEditMode(null);
    } else {
      setTodos([
        { item: inputValue, date: selectedDate, status: false, justAdded: true },
        ...todos,
      ]);
    }
    setInputValue('');
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const toggleComplete = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, status: !todo.status } : todo
    );
    setTodos(updated);
  };

  const handleEdit = (index) => {
    setInputValue(todos[index].item);
    setEditMode(index);
  };

  // ✅ 날짜 필터링 + 인덱스 보존
  const filteredTodos = todos
    .map((todo, index) => ({ ...todo, originalIndex: index }))
    .filter((todo) => todo.date === selectedDate);

  return (
    <aside className="todo-section">
      <div className="todo-container">
        <h3 className="todo-title">ToDo List ({selectedDate})</h3>
        <div className="todo-input-group">
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddOrUpdate()}
          />
          <button className="add-btn" onClick={handleAddOrUpdate}>
            {editMode !== null ? '수정' : '추가'}
          </button>
        </div>

        {filteredTodos.length === 0 && <p>할 일이 없습니다.</p>}
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.originalIndex} className={`todo-item${todo.status ? ' completed' : ''}`}>
              <span
                className="todo-text"
                style={{ textDecoration: todo.status ? 'line-through' : 'none', cursor: 'pointer' }}
                onClick={() => toggleComplete(todo.originalIndex)}
              >
                {todo.item}
              </span>
              <div className="todo-actions">
                <button onClick={() => handleEdit(todo.originalIndex)}>수정</button>
                <button onClick={() => handleDelete(todo.originalIndex)}>삭제</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Todo;
