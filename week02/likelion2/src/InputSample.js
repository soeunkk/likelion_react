import React, { useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
    const nameInput = useRef();

    const { name, nickname } = inputs;

    const onChange = (e) => {
        const { name, value } = e.target;   //우선 e.target에서 name과 value를 추출
        setInputs({
            ...inputs,  //객체 내용을 모두 펼쳐서 기존 객체 복사 (spread 문법)
            [name]: value   //name 키를 가진 값을 value로 변경
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        });
        nameInput.current.focus();  //reset이 다 진행되면 이름 입력하는 곳에 focus를 잡도록 하는 코드
    };

    return (
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />   {/* 이 돔을 훅을 이용해 가져와 사용함 */}
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />

            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    )
}

export default InputSample;
