import React, { useState, useEffect } from 'react';
import instance from '../../api/axios'; // Axios 인스턴스 가져오기

const Todo = ({ selectedDate, onTodoChange }) => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  // [ys] 250628: 수정 모드를 위한 상태 추가: 어떤 투두가 수정 중인지, 어떤 값을 가지는지
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const memberId = localStorage.getItem('memberId');

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

  // [kth] 250622 : 투두 리스트 조회 API 요청 함수
  const fetchTodoList = async () => {
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
  }, [selectedDate, memberId]); // memberId도 의존성에 추가하는 것이 안전합니다.

  // [kth] 250622 : 투두 추가 함수(추가 성공 후 조회)
  const handleAdd = async () => {
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

  // [ys] 250628: 투두 체크박스 토글 함수
  const toggleTodo = async (id, currentStatus) => {
    try {
      // API 호출로 투두 상태 업데이트
      await instance.patch(`/todos/${id}`, {
        checked: !currentStatus // 현재 상태의 반대로 보냄
      });

      // UI 업데이트
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
        )
      );
      onTodoChange?.();
    } catch (err) {
      console.error('할 일 상태 업데이트 실패:', err);
    }
  };

  // [ys] 250628: 투두 삭제 함수
  const deleteTodo = async (id) => {
    try {
      // API 호출로 투두 삭제
      await instance.delete(`/todos/${id}`);

      // UI 업데이트 (삭제된 항목 제외)
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      onTodoChange?.();
    } catch (err) {
      console.error('할 일 삭제 실패:', err);
    }
  };

  // [ys] 250628: 수정 모드 시작 핸들러
  const handleDoubleClick = (todo) => {
    console.log("더블클릭 발생:", todo.id); // 이 줄 추가
    setEditingId(todo.id);
    setEditingText(todo.item);
  };

  // [ys] 250628: 수정 완료 핸들러
  const handleEditComplete = async (id) => {
    if (!editingText.trim()) { // 수정 내용이 비어있으면 저장하지 않고 모드 종료
      setEditingId(null);
      setEditingText('');
      return;
    }

    try {
      await instance.patch(`/todos/${id}`, {
        contents: editingText.trim()
      });

      // UI 업데이트: 수정된 내용 반영
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, item: editingText.trim() } : todo
        )
      );
      setEditingId(null); // 수정 모드 종료
      setEditingText(''); // 수정 텍스트 초기화
      onTodoChange?.();
    } catch (err) {
      console.error('할 일 수정 실패:', err);
    }
  };

  // [ys] 250628: 수정 중 Enter 키 입력 처리
  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleEditComplete(id);
    }
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
                onChange={() => toggleTodo(todo.id, todo.status)} // 현재 상태 전달
                style={{ marginRight: '8px' }}
              />
              {/* [ys] 250628: 수정 모드일 때와 아닐 때 렌더링 분기 */}
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => handleEditComplete(todo.id)} // 포커스 잃으면 수정 완료
                  onKeyDown={(e) => handleEditKeyDown(e, todo.id)} // Enter 키 입력 시 수정 완료
                  autoFocus // 수정 모드 진입 시 자동으로 포커스
                  style={{
                    flex: 1,
                    padding: '4px',
                    fontSize: '13px',
                    border: '1px solid #ccc',
                  }}
                />
              ) : (
                <span
                  onDoubleClick={() => handleDoubleClick(todo)} // 더블 클릭 시 수정 모드 시작
                  style={{
                    textDecoration: todo.status ? 'line-through' : 'none',
                    flex: 1,
                    cursor: 'pointer', // 더블클릭 가능함을 시각적으로 알림
                  }}
                >
                  {todo.item}
                </span>
              )}
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