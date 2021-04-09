import 'components/cell-list-item.css';
import { Cell } from 'store';
import TextEditor from 'components/text-editor';
import CodeCell from 'components/code-cell';
import ActionBar from 'components/action-bar';

interface CellListItemProps {
    cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    let child: JSX.Element;
    if (cell.type === 'code') child = <CodeCell cell={cell} />;
    else child = <TextEditor cell={cell} />;

    return (
        <div className='cell-list-item'>
            <ActionBar id={cell.id} />
            {child}
        </div>
    );
};

export default CellListItem;
