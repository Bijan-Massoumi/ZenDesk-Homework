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
        this.size = 3;
        this.state = {
            currentState: Array(this.size * this.size).fill(null),
            pastStates: [],
            isXTurn: true,
            isGameFinished: false,
            infoText: "X Goes First"
        }
    }

    handleMove(divNumber) {
        const history = this.state.pastStates.slice()
        let newState = this.state.currentState.slice();

        history.push(newState);
        newState[divNumber] = this.state.isXTurn ? 'X': 'O';

        this.setState({pastStates: history, currentState: newState, isXTurn: !this.state.isXTurn})
    }

    render() {
        return (
            <div className="large-12 columns">
                <div className="game">
                    <div className="row info-text">{this.state.infoText}</div>
                    <Board sendMove={(divNum) => this.handleMove(divNum)} currState={this.state.currentState}/>
                    <div className="row menu-controls">
                        <Button bsSize="xsmall" className="option fas fa-undo"/>
                        <Button bsSize="xsmall" className="option restart">
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
