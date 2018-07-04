import React from 'react';

import { Board } from './ComponentBoard';


export class GameInfo extends React.Component {
    render() {
        return (
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
        );
    }
}

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.tokens = [
            // { value: "W", color: 'magenta' },
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
        if(typeof next === 'undefined' || next > -1)
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

export default Game;
