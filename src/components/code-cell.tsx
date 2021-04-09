import { useState, useEffect } from 'react';

import bundle from 'bundler/index';
import CodeEditor from 'components/code-editor';
import Preview from 'components/preview';
import Resizable from 'components/resizable';
import { Cell } from 'store';
import { useActions } from 'hooks/use-actions';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const { updateCell } = useActions();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [cell.content]);

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
                        initialValue={cell.content}
                        onChange={value => updateCell(cell.id, value)}
                    />
                </Resizable>
                <Preview code={code} err={err} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
