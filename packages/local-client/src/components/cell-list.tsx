import React, { useEffect } from 'react';
import { useTypedSelector } from 'hooks/use-typed-selector';
import CellListItem from 'components/cell-list-item';
import AddCell from 'components/add-cell';
import { useActions } from 'hooks/use-actions';
import './cell-list.css';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) =>
        order.map(id => data[id])
    );

    const { fetchCells } = useActions();

    useEffect(() => {
        fetchCells();
    }, [fetchCells]);

    const renderedCells = cells.map(cell => (
        <React.Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
        </React.Fragment>
    ));

    return (
        <div className='cell-list'>
            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            {renderedCells}
        </div>
    );
};

export default CellList;
