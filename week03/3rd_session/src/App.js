import React, { useRef, useState, useMemo } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser'

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  //리액트는 배열이나 객체에 변화를 줄 때 '불변성'을 지켜주어야 함 (안그러면 컴포넌트를 최적화할 수 없기 때문)
  //방법1) spread 연산자 사용 (...)
  //방법2) concat 함수 사용 -> 배열에 값을 추가하는 것이 아닌, 배열을 새롭게 생성함
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'likelion',
      email: 'likelion@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'smwu',
      email: 'smwu@example.com',
      active: false
    },
    {
      id: 3,
      username: 'react',
      email: 'react@example.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  
  const onCreate = () => {
    //1. 새로운 객체 생성
    const user = {
      id: nextId.current,
      username,
      email
    }

    //2. users에 새로 만든 객체 추가
    setUsers([ ...users, user ]);  //spread 연산자 사용하는 방법
    //setInputs(users.concat(user));  //concat 함수 사용하는 방법

    //3. 입력란 초기화
    setInputs({
      username: '',
      email: ''
    });

    //4. id 다음 값으로 이동
    nextId.current += 1;  
  }

  const onRemove = id => {
    //user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만들기
    setUsers(users.filter(user => user.id !== id));
  }

  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
