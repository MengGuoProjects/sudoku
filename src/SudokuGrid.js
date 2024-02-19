import React from 'react';
import SudokuCell from './SudokuCell';

function generateSudoku() {
    // Start with an empty grid
    const grid = Array(9).fill().map(() => Array(9).fill(3));

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

    // create random sudoku
    const createSudoku = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                let num = Math.floor(Math.random() * 9) + 1;
                // while (!isValid(row, col, num)) {
                //     num = Math.floor(Math.random() * 9) + 1;
                // }
                grid[row][col] = num;
            }
        }
    }
    createSudoku(); // Call the createSudoku function to generate new random numbers

    return grid;
}

class SudokuGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: generateSudoku(),
            key: Date.now(),
        };
    }

    handleCellChange(row, col, value) {
        // Update this.state.grid with the new value
        const grid = this.state.grid.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? value : cell))
        );
        this.setState({ grid }); // Update the state with the new grid value
    }

    rerenderSudokuGrid = () => {
        this.setState({ key: Date.now() });
    }

    componentDidUpdate(prevProps) {
        // Only regenerate the Sudoku puzzle if the key prop has changed
        if (this.props.key !== prevProps.key) {
            this.setState({ grid: generateSudoku() });
        }
    }

    render() {
        return (
            <div className="sudoku-container">
                <button onClick={this.rerenderSudokuGrid}>Generate New Sudoku Puzzle</button>
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