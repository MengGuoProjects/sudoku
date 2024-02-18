import React from 'react';

function SudokuCell({ value, onChange, columnIndex }) {
    const isFirstColumn = columnIndex === 0;
    const isThirdBorder = (columnIndex + 1) % 3 === 0;
    const cellClassName = `${isFirstColumn ? 'SudokuCellFirstVerticalBorder' : (isThirdBorder ? 'SudokuCellOtherVerticalBorder' : 'SudokuCell')}`;

    return (
        <input
            type="number"
            className={cellClassName}
            value={value}
            onChange={onChange}
        />
    );
}

export default SudokuCell;