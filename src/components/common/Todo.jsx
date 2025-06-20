import React, { useState, useEffect } from 'react';

const Todo = ({ selectedDate, onTodoChange }) => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  // 🗓 selectedDate가 없을 경우 기본값을 오늘로
  const getEffectiveDate = () => {
    if (selectedDate) return selectedDate;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const dateToUse = getEffectiveDate(); // ✅ 여기서 안전하게 처리

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todo-list')) || [];
    const filtered = storedTodos.filter(todo => todo.date === dateToUse);
    setTodos(filtered);
  }, [selectedDate]);

  const handleAdd = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      date: dateToUse,
      item: input.trim(),
      status: false,
    };

    const currentTodos = JSON.parse(localStorage.getItem('todo-list')) || [];
    const updatedTodos = [...currentTodos, newTodo];

    localStorage.setItem('todo-list', JSON.stringify(updatedTodos));
    setTodos(updatedTodos.filter(todo => todo.date === dateToUse));
    setInput('');
    onTodoChange?.();
  };

  const toggleTodo = (id) => {
    const currentTodos = JSON.parse(localStorage.getItem('todo-list')) || [];
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );

    localStorage.setItem('todo-list', JSON.stringify(updatedTodos));
    setTodos(updatedTodos.filter(todo => todo.date === dateToUse));
    onTodoChange?.();
  };

  const deleteTodo = (id) => {
    const currentTodos = JSON.parse(localStorage.getItem('todo-list')) || [];
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);

    localStorage.setItem('todo-list', JSON.stringify(updatedTodos));
    setTodos(updatedTodos.filter(todo => todo.date === dateToUse));
    onTodoChange?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div style={{ padding: '20px', fontSize: '14px' }}>
      <h3 style={{ fontSize: '16px' }}>ToDo List ({dateToUse})</h3>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: '8px', fontSize: '13px' }}
        />
        <button
          onClick={handleAdd}
          style={{
            marginLeft: '8px',
            backgroundColor: '#7ED321',
            color: 'white',
            padding: '8px 12px',
            fontSize: '13px',
          }}
        >
          추가
        </button>
      </div>
      {todos.length === 0 ? (
        <p style={{ fontSize: '13px' }}>할 일이 없습니다.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              style={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '13px',
              }}
            >
              <input
                type="checkbox"
                checked={todo.status}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '8px' }}
              />
              <span
                style={{
                  textDecoration: todo.status ? 'line-through' : 'none',
                  flex: 1,
                }}
              >
                {todo.item}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ marginLeft: '8px', color: 'red', fontSize: '12px' }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
