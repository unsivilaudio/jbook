import { useState, useEffect } from 'react';

import bundle from 'bundler/index';
import CodeEditor from 'components/code-editor';
import Preview from 'components/preview';
import Resizable from 'components/resizable';

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(input);
            bundle(input)
                .then(output => {
                    console.log(output);
                    if (!output) return;
                    setCode(output as string);
                })
                .catch(err => console.log(err));
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [input]);

    return (
        <Resizable direction='vertical'>
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
