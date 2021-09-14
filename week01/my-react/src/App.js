import React from "react";
import Hello from './Hello';
import './App.css';

//자바 스크립트 안에서는 무조건 카멜 케이스 아용해야 함!(첫번째 단어 이후 대문자)
//주석은 {/* 주석주석 */} 형태로 사용
//js코드 사용하려면 {} 사용 (변수 넣어줄 때 유용!)
//두개 이상 태그 사용하려면 태그 하나에 대해 넣어줘야 함 (이름 없는 태그로 감싸줘도 됨 <> </>)
function App() {
  const name = 'Soeun';
  /* js 안에 css가 있기 때문에 카멜 케이스로 표기*/
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24,
    padding: '1rem'
  }
  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
      {/* 컴포넌트 안에서 클래스 이름을 지정할 땐 class 대신 className 키워드를 사용해야 함 */}
      <div className="gray-box"></div>
    </>
  );
}

export default App;
