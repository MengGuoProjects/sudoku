import React from 'react';
import SudokuCell from './SudokuCell';

class SudokuGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
        };
    }

    handleCellChange(row, col, value) {
        // Update this.state.grid with the new value
        const grid = this.state.grid.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? value : cell))
        );
        this.setState({ grid }); // Update the state with the new grid value
    }

    render() {
        return (
            <div className="sudoku-container">
                <div className="sudoku-grid">
                    {this.state.grid.map((row, i) => (
                        <div key={i} className="row">
                            {row.map((cell, j) => (
                                <SudokuCell
                                    key={`${i}-${j}`}
                                    value={cell}
                                    onChange={(e) => this.handleCellChange(i, j, e.target.value)}
                                    columnIndex={i}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SudokuGrid;