import { useEffect } from 'react';

import CodeEditor from 'components/code-editor';
import Preview from 'components/preview';
import Resizable from 'components/resizable';
import { Cell } from 'store';
import { useActions } from 'hooks/use-actions';
import { useTypedSelector } from 'hooks/use-typed-selector';
import { useCumulativeCode } from 'hooks/use-cumulative-code';
import './code-cell.css';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector(state => state.bundles[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cumulativeCode);
            return;
        }

        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line
    }, [createBundle, cell.id, cumulativeCode]);

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
                <div className='progress-wrapper'>
                    {!bundle || bundle.loading ? (
                        <div className='progress-cover'>
                            <progress
                                className='progress is-small is-primary'
                                max='100'>
                                Loading
                            </progress>
                        </div>
                    ) : (
                        <Preview code={bundle.code} err={bundle.err} />
                    )}
                </div>
            </div>
        </Resizable>
    );
};

export default CodeCell;
