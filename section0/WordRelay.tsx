import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

const WordRelay = () => {
    const [word, setWord] = useState("제로초");
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = useRef<HTMLInputElement>(null);

    const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = inputEl.current;
        if (word[word.length - 1] === value[0]) {
            setResult("정답입니다~");
            setWord(value);
            setValue('');
            if (input) {
                input.focus();
            }
        } else {
            setResult("끝말잇기가 불가합니다");
            setValue("");
            if (input) {
                input.focus();
            }
        }
    }, [word, value]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }, []);

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    value={value}
                    onChange={onChange} />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    )
};

export default WordRelay;