import React, { useState, useEffect } from 'react';
import instance from '../../api/axios'; // Axios 인스턴스 가져오기

const Todo = ({ selectedDate, onTodoChange }) => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const memberId = localStorage.getItem('memberId');

  // selectedDate가 없을 경우 기본값을 오늘로
  const getEffectiveDate = () => {
    if (selectedDate) return selectedDate;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const dateToUse = getEffectiveDate(); // 여기서 안전하게 처리

  // [kth] 250622 : 투두 리스트 조회 API 요청 함수
  const fetchTodoList = async () => {
    // console.log("fetch Todo ID:");

    try {
      const res = await instance.get(`/todos?memberId=${memberId}&date=${dateToUse}`);

      const mapped = res.data.map(todo => ({
        id: todo.id,
        date: todo.date,
        item: todo.contents,      
        status: todo.checked     
      }));

      setTodos(mapped);
    } catch (err) {
      console.error('투두 가져오기 실패:', err);
    }
};


  // [kth] 250622 : 의존성 배열에 selectedDate를 넣어서 날짜 변경시마다 todo 재조회
  useEffect(() => {
      fetchTodoList();
  }, [selectedDate]);

  // [kth] 250622 : 투두 추가 함수(추가 성공 후 조회)
  const handleAdd = async () => {
    console.log("Insert Todo ID:");
    if (!input.trim()) return;

    try {
      await instance.post('/todos', {
        memberId,
        contents: input.trim(),
        date: dateToUse
      });

      setInput('');
      onTodoChange?.();
      fetchTodoList(); // 목록 다시 불러오기

    } catch (err) {
      console.error('할 일 추가 실패:', err);
    }
  };

  const toggleTodo = async (id) => {
    console.log("Toggle Todo ID:", id);
    
    try {
      await instance.put(`/todos/${id}/toggle`);

      onTodoChange?.();
      fetchTodoList(); // 다시 조회하여 최신 상태 반영

    } catch (err) {
      console.error('할 일 체크 토글 실패:', err); // 메시지 수정
    }
  };

  const deleteTodo = async (id) => {
    console.log("Delete Todo ID:", id);
    
    try {
      await instance.delete(`/todos/${id}`);

      onTodoChange?.();
      fetchTodoList(); // 다시 조회하여 최신 상태 반영

    } catch (err) {
      console.error('할 일 체크 토글 실패:', err); // 메시지 수정
    }
    
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div style={{ padding: '20px', fontSize: '14px' }}>
      <h3 style={{ fontSize: '16px'}}>To-do List ({dateToUse})</h3>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: '8px', outline: 'none',
            border: '1px solid #e5e7eb',fontSize: '13px', borderRadius: '0.375rem', marginTop: '10px' }}
        />
        <button
          onClick={handleAdd}
          style={{
            marginLeft: '8px',
            marginTop: '10px',
            backgroundColor: '#7ED321',
            color: 'white',
            padding: '8px 12px',
            
            fontSize: '13px',
            outline: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '0.375rem'
          }}
        >
          추가
        </button>
      </div>
      {todos.length === 0 ? (
        <p style={{ fontSize: '13px' }}>할 일이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {todos.map(todo => (
            <li
              key={todo.id}
              style={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '13px',
                // justifyContent: 'space-between', 
                gap: '8px', 
                display: 'flex',
              }}
            >
              <input
                type="checkbox"
                checked={todo.status}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '8px', transform: 'scale(1.1)'}}
                
              />
              <span
                style={{
                  textDecoration: todo.status ? 'line-through' : 'none',
                  flex: 1,
                  fontSize: '12px',
                 
                }}
              >
                {todo.item}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ 
                  marginLeft: '4px', 
                  color: 'black', 
                  fontSize: '12px' , 
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginLeft: '4px',
                  marginRight: '10px',
                  cursor: 'pointer',
                  outline: 'none', }}
                
                
              >
                <img src="/assets/img/trash-2.png" alt="삭제" style={{ width: '14px', height: '14px' }}
                />
                
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
