import { useState } from 'react';

import bundle from 'bundler';
import CodeEditor from 'components/code-editor';
import Preview from 'components/preview';
import Resizable from 'components/resizable';

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output as string);
    };

    return (
        <Resizable direction='veritcal'>
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialValue='// Write Your Code Here'
                        onChange={value => setInput(value)}
                    />
                </Resizable>
                <Preview code={code} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
