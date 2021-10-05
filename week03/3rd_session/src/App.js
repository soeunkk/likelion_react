import React, { useReducer, useMemo } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser'
import produce from 'immer';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

//useReducer의 초기값
const initialState = {
  inputs: { //inputs와 관련된 초기값
    username: '',
    email: ''
  },

  users: [  //users와 관련된 초기값
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
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      //users: state.users.concat(action.user) 대신 immer 사용
      return produce(state, draft => {
        draft.users.push(action.user);
      });

    case 'TOGGLE_USER':
      //users: state.users.map(user =>
      //user.id === action.id ? { ...user, active: !user.active } : user  //action.id의 active를 반대로 바꿈 (user 내용 복사한채 active 내용만 바꿈)
      //)
      //대신 immer 사용
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
      
    case 'REMOVE_USER':
      //users: state.users.filter(user => user.id !== action.id)
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });

    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);  //UserDispatch라는 이름으로 내보내준다.

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //const { username, email } = state.inputs; //state 안에 input 객체 안에 username, email 필드를 쓰겠다!
  //위에 코드 대신 아래의 커스텀 훅을 사용
  //const [{ username, email}, onChange, onReset] = useInputs({
  //  //초기값을 매개변수로 줌
  //  username: '',
  //  email: ''
  //});

  //const [state, dispatch] = useReducer(reducer, initialState);

  //const nextId = useRef(4); //static 느낌 정도..? 변화가 일어나도 새로고침되지 않고 값이 유지됨

  const { users } = state;  //state 안에 users 객체를 쓰겠다! (안에 있는 id, email, active는 하나하나씩 안쓸거임)
  
  // const onCreate = useCallback(() => {
  //   dispatch({
  //     type: 'CREATE_USER',
  //     user: {
  //       id: nextId.current,
  //       username,
  //       email
  //     }
  //   });

  //   onReset();

  //   nextId.current += 1;  
  // }, [username, email, onReset]);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users}/>
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
