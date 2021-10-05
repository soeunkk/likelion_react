import { useState, useCallback } from 'react';

function useInputs(initialForm) {   //초기값은 매개변수로 받음
    const [form, setForm] = useState(initialForm);

    //change

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setForm(form => ({ ...form, [name]: value }));
    }, [])

    const reset = useCallback(() => setForm(initialForm), [initialForm]);   //초기값으로 바꿔주는 함수
    return [form, onChange, reset];
}

export default useInputs;