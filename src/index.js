import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './foundation.min.css';
import './fontawesome-free-5.0.13-2/web-fonts-with-css/css/fontawesome-all.css';
import './fontawesome-free-5.0.13-2/web-fonts-with-css/css/fontawesome.min.css';
import { Button } from 'react-bootstrap';


class Square extends React.Component {
    render() {
        return (
            <button className="square"
                    onClick={this.props.value === null ? this.props.onClick: null}>
                {this.props.value}
            </button>
        );
    }
}


class Board extends React.Component {
    renderSquare(i, value) {
        return (
            <Square
                onClick={() => this.props.sendMove(i)}
                value={this.props.currState[i]}
            />
        );
    }

    renderRow(rowNum) {
        let dim = Math.sqrt(this.props.currState.length);
        return Array.apply(null, {length: dim}).map(Number.call, Number).map( (n) => {
            let newSquare = this.renderSquare((rowNum * dim) + n);
            return newSquare;
        });
    }

    renderBoard() {
        return Array.apply(null, {length: Math.sqrt(this.props.currState.length)}).map(Number.call, Number).map((n) => {
            let row = (
                <div className="board-row">
                {
                   this.renderRow(n)
                }
                </div>
            );
            return row
        });
    }

    render() {
        return (
            <div className="row all-squares">
                <div className = "game-board">
                {
                    this.renderBoard()
                }
                </div>
            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.size = 3; //changes board dimension (use odd numbers only)
        this.state = {
            currentState: Array(this.size * this.size).fill(null),
            pastStates: [],
            isXTurn: true,
            isGameFinished: false,
            infoText: "X Goes First"
        }
    }

    checkWin(newState){
        /*
          I chose not to hard-code all win conditions to make the
          Tic-Tac-Toe board scalable to a 5 x 5, 7 x 7, etc.
        */

        let len = this.state.currentState.length;
        let releventSquares = [];
        const allEqual = arr => arr.every( v => v === arr[0] );

        //check diagonals -----------------------------
        for (let i = 0; i < len; i += (this.size + 1)){
            releventSquares.push(newState[i]);
        }
        if (allEqual(releventSquares) && releventSquares[0] !== null) {
            return {isWinner: true, winner: releventSquares[0]};
        }
        releventSquares = [];
        for (let i = this.size-1; i < (len - this.size) + 1; i += (this.size - 1)){
            releventSquares.push(newState[i]);
        }
        if (allEqual(releventSquares) && releventSquares[0] !== null) {
            return {isWinner: true, winner: releventSquares[0]};
        }

        //check columns ------------------------------
        for (let i = 0; i < this.size; i++){
            releventSquares = [];
            for (let j = i; j < len; j += this.size){
                releventSquares.push(newState[j])
            }
            if (allEqual(releventSquares) && releventSquares[0] !== null) {
                console.log("col condition",releventSquares);
                return {isWinner: true, winner: releventSquares[0]};
            }
        }

        //check rows ------------------------------------
        for (let i = 0; i < len; i += this.size){
            releventSquares = [];
            for (let j = i; j < i+this.size; j++){
                releventSquares.push(newState[j]);
            }
            if (allEqual(releventSquares) && releventSquares[0] !== null) {
                console.log("row condition",releventSquares);
                return {isWinner: true, winner: releventSquares[0]};
            }
        }

        return {isWinner: false, winner: null};
    }

    handleMove(divNumber) {
        if (!this.state.isGameFinished){
            const history = this.state.pastStates.slice();
            history.push(this.state.currentState.slice());

            let newState = this.state.currentState.slice();
            newState[divNumber] = this.state.isXTurn ? 'X': 'O';

            const winDict = this.checkWin(newState);
            let newText;
            if ( !winDict.isWinner && newState.every( v => v !== null )) {
                newText = "Draw!"
            } else{
                const currTurn = !this.state.isXTurn ? "X": "O";
                newText = (winDict.isWinner) ? `${winDict.winner} is the Winner!`:
                         `It's ${currTurn}'s turn.`;
            }

            this.setState({pastStates: history, currentState: newState,
                            isXTurn: !this.state.isXTurn,infoText: newText,
                            isGameFinished: winDict.isWinner});
        }
    }

    undo(){
        if (this.state.pastStates.length > 0){
            const prevTurnText = !this.state.isXTurn ? "It's X's Turn": "It's O's Turn";
            let newHistory = this.state.pastStates.slice();
            let newState = newHistory.pop();
            this.setState({pastStates: newHistory, currentState: newState,
                            isGameFinished: false, isXTurn: !this.state.isXTurn,
                            infoText: prevTurnText})
        }
    }

    restart() {
        this.setState({isXTurn: true, infoText:"X Goes First",
        currentState: Array(this.size * this.size).fill(null),
        pastStates: [], isGameFinished: false});
    }

    render() {
        return (
            <div className="large-12 columns">
                <div className="game">
                    <div className="row info-text">{this.state.infoText}</div>
                    <Board sendMove={(divNum) => this.handleMove(divNum)} currState={this.state.currentState}/>
                    <div className="row menu-controls">
                        <Button bsSize="xsmall" className="option fas fa-undo"
                                onClick={() => this.undo()}/>
                        <Button bsSize="xsmall" className="option restart"
                                onClick={() => this.restart()} >
                            New Game
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <div className="main-outer">
                <div className= "main-middle">
                    <div className="main-container">
                        <div className="row content">
                            <Game />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
