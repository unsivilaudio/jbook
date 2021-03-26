import { useState } from 'react';

import CodeEditor from 'components/code-editor';
import Preview from 'components/preview';
import bundle from 'bundler';

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output as string);
    };

    return (
        <div>
            <CodeEditor
                initialValue='// Write Your Code Here'
                onChange={value => setInput(value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    );
};

export default CodeCell;
