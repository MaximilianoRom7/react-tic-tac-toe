import React from 'react';

import { Square } from './ComponentSquare';


export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.side = props.size || 10;
        this.size = this.side * this.side;
        /* Board saves the state of each Square */
        this.state = {
            squares: Array(this.size).fill(null),
        };
    }

    checkSquareOverride(squareID) {
        /* do not change value */
        if(this.state.squares[squareID] && this.state.squares[squareID].value !== null) {
            alert("Cannot change Square value");
            return false;
        }
        return true;
    }

    setSquareToken(squareID) {
        /* copy array to prevent mutability */
        const squares = this.state.squares.slice();
        squares[squareID] = this.props.token;
        this.setState({
            squares: squares,
        });
    }

    onSquareClick(squareID) {
        if(!this.checkSquareOverride(squareID))
            return;
        this.setSquareToken(squareID);
        if(this.props.nextMove)
            this.props.nextMove();
    }

    renderSquare(i) {
        const square = this.state.squares[i];
        return (
            <Square
              ID={i}
              value={square && square.value}
              color={square && square.color}
              onClick={(event) => this.onSquareClick(i)}/>
        );
    }

    boardRow(rowNumber) {
        var row = [];
        var move = rowNumber * this.side;
        for(var i = 0; i < this.side; i++) {
            row.push(this.renderSquare(i + move));
        }
        return row;
    }

    boardDraw() {
        var board = [];
        for(var i = 0; i < this.side; i++) {
            board.push((
                <div className="board-row">
                  {this.boardRow(i)}
                </div>
            ));
        }
        return board;
    }

    render() {
        return (
            <div>
              <div className="game-board">
                {this.boardDraw()}
              </div>
            </div>
        );
    }
}
