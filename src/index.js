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
            <button className="square" onClick={this.onClick.bind(this)}>
              {value}
            </button>
        );
    }

    /* set the square state on the click event */
    onClick(event) {
        /* do not change value */
        if(this.value !== null) {
            alert("Cannot change Square value");
            return;
        }
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
        this.side = props.size || 6;
        this.size = this.side * this.side;
        this.players = ["X", "Y", "Z"];
        /* Board saves the state of each Square */
        this.state = {
            squares: Array(this.size).fill(null),
        };
    }

    onSquareClick(squareID) {
        /* copy array to prevent mutability */
        const squares = this.state.squares.slice();
        var player = this.props.player;
        squares[squareID] = this.players[player];
        this.setState({
            squares: squares,
            player: player,
        });
    }

    renderSquare(i) {
        return (
            <Square
              ID={i}
              value={this.state.squares[i]}
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
        this.tockens = [
            {
                value: "X",
                color: 'red',
            },
            {
                value: "Y",
                color: 'green',
            },
            {
                value: "Z",
                color: 'blue',
            }
        ];
        this.players = this.checkMaxPlayers(this.props.players || this.tockens.length);
        this.state = {
            player: 0,
            tocken: this.tockens[9],
        };
    }

    checkMaxPlayers(players) {
        if(players > this.tockens.length) {
            console.log(
                "Warning the maximum amount of" +
                    "players is the same of tockens"
            );
            return this.tockens.length;
        }
        return players;
    }

    nextPlayer() {
        /*
          The maximum amount of players is limited
          by the amount of tockens
        */
        return (this.state.player + 1) % this.tockens.length;
    }

    nextMove() {
        const player = this.nextPlayer();
        console.log("Next Player: " + (player + 1));
        this.setState({player: player});
    }

    render() {
        const status = 'Next player: X';
        return (
            <div className="game" onClick={this.nextMove.bind(this)}>
              <Board
                player={this.state.player}
                token={this.state.tocken}
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
