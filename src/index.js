import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
    constructor(props) {
        /*
          this is constructor is called once even
          when the prop value changes
        */
        super(props);
        this.state = {
            value: null,
        };
        this.value = null;
    }

    render() {
        /*
          Never change the state in render because render depends
          on the state making this an never ending recursive function

          if(this.props.value)
              this.setState({value: this.props.value});
        */
        var value;
        if(this.props.onClick)
            value = this.props.value;
        else
            value = this.state.value;
        this.value = value;
        return (
            <button className="square"
                    onClick={this.onClick.bind(this)}
                    style={{backgroundColor: this.props.color}}>
              {value}
            </button>
        );
    }

    /* set the square state on the click event */
    onClick(event) {
        if(this.props.onClick) {
            /* delegate state change to the upper component in this case Board */
            this.props.onClick(event);
            console.log("Delegate onClick");
        }
        else {
            /* default state change */
            this.setState({value: 'X'});
        }
        console.log('Square Clicked: ' + this.props.ID);
    }
}

class Board extends React.Component {
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

class GameInfo extends React.Component {
    render() {
        return (
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.tokens = [
            { value: "X", color: 'red' },
            { value: "Y", color: 'green' },
            { value: "Z", color: 'blue' }
        ];
        this.players = this.checkMaxPlayers(
            this.props.players || this.tokens.length);
        this.state = {
            player: 0,
            token: this.tokens[0],
        };
    }

    checkMaxPlayers(players) {
        if(players > this.tokens.length)
            throw new Error(
                "the maximum amount of " +
                    "players is the amount of tokens"
            );
        return players;
    }

    nextPlayer(next) {
        /*
          if next > -1 the next player is return else the previous
          The maximum amount of players is limited
          by the amount of tokens
        */
        var move;
        if(typeof next == 'undefined' || next > -1)
            move = 1;
        else
            move = -1;
        return (this.state.player + move) % this.tokens.length;
    }

    nextMove(move) {
        const player = this.nextPlayer(move);
        this.setState({
            player: player,
            token: this.tokens[player],
        });
    }

    getStatus() {
        return 'Player ' + (this.state.player + 1) + "# Turn";
    }

    render() {
        const status = this.getStatus();
        return (
            <div className="game">
              <Board
                token={this.state.token}
                nextMove={(event) => this.nextMove()}
                />
              <div className="status">{status}</div>
              <GameInfo />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
