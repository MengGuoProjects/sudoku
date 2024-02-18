import React from 'react';
import SudokuCell from './SudokuCell';

function generateSudoku() {

    // Start with an empty grid
    const grid = Array(9).fill().map(() => Array(9).fill(0));
    // Function to check if a number is valid in a given position
    const isValid = (row, col, num) => {
        // Check if the number already exists in the same row
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num) {
                return false;
            }
        }

        // Check if the number already exists in the same column
        for (let i = 0; i < 9; i++) {
            if (grid[i][col] === num) {
                return false;
            }
        }

        // Check if the number already exists in the same 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (grid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    };

    // Function to solve the sudoku using backtracking
    const solveSudoku = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(row, col, num)) {
                            grid[row][col] = num;
                            if (solveSudoku()) {
                                return true;
                            }
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    // Solve the sudoku
    solveSudoku();

    return grid;
}

class SudokuGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: generateSudoku(),
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